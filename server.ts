import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization of Gemini API to prevent crash at boot time and provide descriptive errors
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in the Settings > Secrets panel of your AI Studio workspace.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Config endpoint to verify API key presence
app.get("/api/config", (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  res.json({
    hasApiKey: !!(key && key.trim().length > 0)
  });
});

// 1. AI Gout Lifestyle Advisor endpoint (conversational)
app.post("/api/advisor", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const ai = getGeminiClient();
    // Convert messages to Gemini format, ensuring they strictly alternate between user and model, and start with user.
    const formattedContents: any[] = [];
    let lastRole: string | null = null;

    for (const m of messages) {
      if (!m.content || !m.content.trim()) continue;
      
      const role = m.role === "assistant" ? "model" : "user";
      
      // First message must be "user"
      if (formattedContents.length === 0 && role !== "user") {
        continue;
      }

      if (role !== lastRole) {
        formattedContents.push({
          role,
          parts: [{ text: m.content }],
        });
        lastRole = role;
      } else {
        // Merge consecutive messages of the same role
        if (formattedContents.length > 0) {
          formattedContents[formattedContents.length - 1].parts[0].text += "\n\n" + m.content;
        }
      }
    }

    // Fallback if formatting resulted in empty contents
    if (formattedContents.length === 0) {
      formattedContents.push({
        role: "user",
        parts: [{ text: "こんにちは" }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: `あなたは痛風（高尿酸血症）の生活習慣改善を専門とする、優しく丁寧な医師兼管理栄養士です。
ユーザー（痛風と診断された患者）からの疑問や相談に、医学的エビデンスに基づいて親身に応えてください。
回答には以下のガイドラインを含めてください：
1. プリン体の多い食事の制限（肉類・魚介類の過剰摂取を避け、低精製穀物や野菜を取り入れる）
2. 水分補給の重要性（1日2L以上の水を飲み、尿酸を排泄する）
3. アルコール（特にビール、またアルコール自体の脱水作用や尿酸合成促進）の控え方
4. 適度な有酸素運動（激しい無酸素運動は逆に尿酸値を上げるため避ける）
5. 薬物療法の継続（自己判断での中断は発作を誘発すること）

回答は簡潔で読みやすく、マークダウン形式で提示してください。痛みを和らげ、前向きに改善に取り組めるよう励ましてください。`,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in advisor API:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// 2. Structured Purine Food Checker endpoint
app.post("/api/purine-check", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "query is required" });
    }

    const ai = getGeminiClient();
    const prompt = `「${query}」に含まれるプリン体について詳細に解析してください。
痛風・高尿酸血症の患者が摂取する際のリスク度（低・中・高）、100gあたりの目安プリン体量（mg）、解説と具体的なアドバイス、より低プリン体で安全な代替食品を教えてください。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            food: {
              type: Type.STRING,
              description: "解析した食品・料理名（日本語）",
            },
            purineLevel: {
              type: Type.STRING,
              description: "プリン体レベル（'LOW' / 'MEDIUM' / 'HIGH' のいずれか。100gあたり50mg未満はLOW、50〜150mgはMEDIUM、150mg以上はHIGH）",
            },
            purineMg: {
              type: Type.NUMBER,
              description: "100gあたりの概算プリン体含有量 (mg)。不明な場合は目安値を推測してください。",
            },
            advice: {
              type: Type.STRING,
              description: "痛風患者向けのアドバイス。食べる際の注意点、調理法の工夫（茹でるとプリン体が減るなど）、1回あたりの適量など（日本語）",
            },
            alternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "より安全で健康的な、プリン体が少なめの代替食品やおすすめのトッピングなど（日本語）",
            },
          },
          required: ["food", "purineLevel", "purineMg", "advice", "alternatives"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Error in purine-check API:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Vite middleware for development or Static server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
