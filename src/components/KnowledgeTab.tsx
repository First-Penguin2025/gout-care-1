import { useState } from "react";
import { 
  BookOpen, 
  Droplet, 
  Beer, 
  Utensils, 
  Activity, 
  Pill, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function KnowledgeTab() {
  const [openSection, setOpenSection] = useState<string | null>("water");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const articles = [
    {
      id: "water",
      icon: <Droplet className="w-5 h-5 text-sky-500" />,
      title: "1. 水分は毎日どれくらい、何を飲めばいいですか？（水分の原則）",
      summary: "1日「2リットル以上」の尿量を保ち、尿酸を効率よく洗い流すための大原則です。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            尿酸は尿に溶けて体外に排出されます。しかし、尿酸は水に溶けにくいため、体が脱水状態（水分不足）になると尿の中での尿酸濃度が高まり、関節内で結晶化（針状の痛風結晶）しやすくなります。これが痛風発作の原因です。
          </p>
          <div className="bg-sky-50/50 p-4 rounded-md border border-sky-100 space-y-2">
            <h5 className="font-bold text-sky-950 text-xs mb-1">💡 水分摂取の具体的なポイント：</h5>
            <ul className="list-disc list-inside space-y-1 text-sky-900">
              <li><strong>目標は1日2L以上の尿量：</strong>そのためには、食事以外に「水や麦茶、ほうじ茶」などの水分を毎日2L以上、のどが渇く前にこまめに飲むのが目安です。</li>
              <li><strong>ジュースや炭酸飲料はNG：</strong>果糖（フルクトース）は体内で尿酸の合成を促すため、甘い清涼飲料水やエナジードリンクは尿酸値を急上昇させます。</li>
              <li><strong>お茶・コーヒー：</strong>緑茶や砂糖なしのブラックコーヒーは、疫学的に尿酸値を下げるのを助ける報告があります。ただしカフェインの利尿作用があるため、同等量の水も一緒に補給することが大切です。</li>
            </ul>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">✓ 水、炭酸水、麦茶がベスト</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">✓ ブラックコーヒーは低下を助ける</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">✓ 甘い清涼飲料水はNG</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "alcohol",
      icon: <Beer className="w-5 h-5 text-amber-500" />,
      title: "2. お酒を飲む時、何を選べば安全？ ビール以外なら大丈夫？",
      summary: "アルコール自体が尿酸値を上げる強力なメカニズムと、正しいお付き合いの仕方。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            「ビールはプリン体が多いからNG、ハイボールや本格焼酎ならプリン体がほぼゼロだからいくら飲んでもOK」という説を耳にしたことがあるかもしれません。これは大きな誤解です。
          </p>
          <p className="font-semibold text-slate-800">
            実は、アルコールそのものに以下の2つの強力な悪影響があります：
          </p>
          <ol className="list-decimal list-inside space-y-1.5 pl-2">
            <li>
              <strong>尿酸の合成を促す：</strong>アルコールが体内で分解（代謝）される際、細胞内のエネルギー物質（ATP）が急激に消費され、尿酸が大量に作られます。
            </li>
            <li>
              <strong>尿酸の排出を止める：</strong>アルコールの代謝によって乳酸が作られます。乳酸は腎臓で尿酸よりも優先的に排出されるため、尿酸の排出がストップしてしまい、血液中の尿酸濃度が跳ね上がります。
            </li>
          </ol>
          <div className="bg-amber-50/50 p-4 rounded-md border border-amber-100 space-y-2">
            <h5 className="font-bold text-amber-950 text-xs mb-1">⚠️ 飲酒時のゴールドルール：</h5>
            <ul className="list-disc list-inside space-y-1 text-amber-900">
              <li><strong>ビールは最優先で避ける：</strong>ビールはアルコールによる作用に加え、お酒自体にも多くのプリン体が含まれるダブルパンチ飲料です。飲む場合はプリン体ゼロ発泡酒が比較的安全です。</li>
              <li><strong>和らぎ水（お水）を飲む：</strong>お酒を飲むときは、必ずチェイサー（お水）を用意し、お酒と同量以上の水を交互に飲んで脱水を防ぎます。</li>
              <li><strong>適量を守り、週2日以上の休肝日：</strong>焼酎やハイボールなら1日コップ2杯程度に薄めて楽しむのが現実的です。連日の飲酒を避けましょう。</li>
            </ul>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">✓ 焼酎・ウイスキーはプリン体ゼロ</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">✓ ビール、発泡酒は避ける</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">✓ 同量の水を並行して飲む</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "diet",
      icon: <Utensils className="w-5 h-5 text-emerald-500" />,
      title: "3. プリン体食事制限のコツ：本当に避けるべきNG食材とは？",
      summary: "極端な制限は長続きしません。危険な高プリン体食材を覚え、賢く置き換えましょう。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            食べ物から摂取するプリン体は、体全体の尿酸量の約20%〜30%と言われています（残りの70%〜80%は体内で自然に合成されます）。しかし、プリン体の極めて多い食べ物をドカ食いすると、急激に血中濃度が高まり、発作を誘発します。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="bg-rose-50/50 p-3.5 rounded-md border border-rose-100">
              <span className="font-bold text-rose-800 block text-xs mb-1.5">❌ 避けるべき「超高プリン体」食材</span>
              <ul className="list-disc list-inside space-y-1 text-rose-700">
                <li>鶏レバー・豚レバー・牛レバー</li>
                <li>カツオ、マイワシなどの干物（開き・めざし）</li>
                <li>魚の内臓・生殖巣（タラ白子、あん肝、煮干し）</li>
                <li>ビール、クラフトビール</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50/50 p-3.5 rounded-md border border-emerald-100">
              <span className="font-bold text-emerald-800 block text-xs mb-1.5">✅ 積極的に摂りたい安全・優秀食材</span>
              <ul className="list-disc list-inside space-y-1 text-emerald-700">
                <li>乳製品（牛乳、ヨーグルト、チーズ）：尿酸排出を促す</li>
                <li>豆腐・大豆製品（適量）：プリン体が低く、良質なタンパク源</li>
                <li>野菜・海藻・きのこ類：体をアルカリ性に傾け尿酸を溶かす</li>
                <li>卵（鶏卵、うずら）：細胞を持たないためプリン体がほぼゼロ</li>
              </ul>
            </div>
          </div>

          <div className="bg-emerald-50/30 p-3 rounded border border-emerald-150/50 flex flex-wrap gap-1 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">✓ レバー・魚の干物・白子はNG</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">✓ 卵・チーズ・豆腐は極めて安全</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">✓ 魚卵（タラコ等）は塩分に注意</span>
          </div>
        </div>
      ),
    },
    {
      id: "alkali",
      icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
      title: "4. 『尿をアルカリ性にする』とはどういう意味ですか？（食事改善）",
      summary: "尿の酸性度を下げて、尿酸が尿にしっかりと溶けて体外に排出されやすい環境を作ります。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            尿酸は「酸性の液体」には溶けにくく、「アルカリ性の液体」に溶けやすいという非常に顕著な性質を持っています。痛風や高尿酸血症の人は、体質や肉主体の食事、お酒の影響などで尿が強い酸性に傾きがちで、これが尿酸の排出を妨げ、腎臓で結石（尿路結石）を作る原因にもなります。
          </p>
          <div className="bg-indigo-50/50 p-4 rounded-md border border-indigo-100 space-y-2">
            <h5 className="font-bold text-indigo-950 text-xs mb-1">🥦 尿のアルカリ化を助ける食品：</h5>
            <p className="text-indigo-900 mb-1">
              アルカリ化を促す食材を、毎日の食事にたっぷり取り入れるのが極めて効果的です。
            </p>
            <ul className="list-disc list-inside space-y-1 text-indigo-800">
              <li><strong>海藻類：</strong>わかめ、ひじき、こんぶ、もずく（非常に強力）</li>
              <li><strong>野菜：</strong>キャベツ、ほうれん草、トマト、なす、きゅうり</li>
              <li><strong>果物：</strong>バナナ、メロン（※果糖の過剰摂取は避けるため1日1個程度）</li>
            </ul>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">✓ 尿酸はアルカリ性尿に溶けて排出されやすい</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">✓ 海藻類・野菜を毎食たっぷり摂る</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">✓ 尿路結石の予防にもなる</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "exercise",
      icon: <Activity className="w-5 h-5 text-blue-500" />,
      title: "5. 痛風患者の運動法：『激しい筋トレ』は逆効果！？",
      summary: "知っておきたい運動の落とし穴。激しい無酸素運動は、運動直後に尿酸値を急上昇させます。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            生活習慣を改善しようと、いきなり「ジムで激しいベンチプレス」「全力疾走のスプリント」を行うのは非常に危険です。
          </p>
          <p>
            <strong>激しい無酸素運動（筋トレ、ダッシュ等）は、体内のエネルギーを急激に消費して大量のプリン体を発生させます。</strong>さらに、運動中の発汗による脱水や、筋肉に乳酸が溜まることで尿酸の排出が低下し、運動直後に尿酸値が劇的に急上昇（スパイク）して痛風発作を自ら引き起こしてしまいます。
          </p>
          <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100">
            <h5 className="font-bold text-blue-950 text-xs mb-1">🏃 推奨される運動：</h5>
            <p className="text-blue-900 mb-1.5">
              心拍数が少し上がる程度の「軽い有酸素運動」を1日30分程度行うのがベストです。
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>ウォーキング、散歩</li>
              <li>軽めのサイクリング</li>
              <li>水中ウォーキング（関節への負担が少ない）</li>
              <li>※ 運動中、およびその前後に必ずコップ1〜2杯の十分な水分補給を行いましょう。</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "attack",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: "6. 急な痛風発作（激痛）が起きてしまった時の応急処置は？",
      summary: "足指の激痛に襲われたら。冷やす・高く上げる・安静にするのが鉄則です。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            痛風発作（関節の猛烈な炎症）による激痛が突然起きたときは、パニックにならず速やかに以下の3ステップをとってください。適切な初期対応が痛みの期間を短縮します。
          </p>
          <div className="bg-rose-50 p-4 rounded-md border border-rose-100 space-y-2">
            <h5 className="font-bold text-rose-950 text-xs mb-1">🚨 緊急時の応急処置3ステップ：</h5>
            <ol className="list-decimal list-inside space-y-1.5 text-rose-900">
              <li><strong>【患部を徹底して冷やす】：</strong>冷湿布や氷嚢（ひょうのう）などで炎症部をしっかり冷却します。お風呂に入って温める、またはマッサージをするのは絶対にNGです（血管が広がり、炎症が劇的に悪化します）。</li>
              <li><strong>【患部を高く保つ】：</strong>横になり、足の下にクッションや枕を置いて、患部を心臓より高い位置に保ちます。これで血流とうっ血による痛みが和らぎます。</li>
              <li><strong>【安静＆たっぷり水分補給】：</strong>歩行や活動を極力避け、お水や麦茶をたくさん飲んで尿酸の排出を促します。</li>
            </ol>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              ※市販の鎮痛剤を飲む場合、<strong>アスピリン（バイアスピリンや一部の頭痛薬）は尿酸値に影響を及ぼし痛みを強めるため厳禁です。</strong>ロキソプロフェンやイブプロフェン、または医師に処方された専用の薬（コルヒチン等）を服用し、速やかに整形外科や専門クリニックを受診しましょう。
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">✓ 冷やす・高く上げる・安静が鉄則</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">✓ 絶対に揉んだり温めたりしない</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">✓ アスピリン系の鎮痛薬は避ける</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "meds",
      icon: <Pill className="w-5 h-5 text-red-500" />,
      title: "7. 処方薬は絶対に自己判断でやめてはいけない！",
      summary: "痛みが消えたからと服薬を中止すると、よりひどい発作が再発します。",
      content: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            痛風発作（足指の激痛）は通常、1週間〜10日ほどで自然と治まります。しかし、「痛みが消えた＝治った」わけではありません。関節の中には数年かけて蓄積した尿酸の結晶がまだびっしりと残っており、生活習慣がそのままなら必ず再発します。
          </p>
          <p>
            医師から処方される「尿酸生成抑制薬（アロプリノールやフェブキソスタット等）」や「尿酸排泄促進薬」は、数ヶ月から数年かけて結晶をゆっくり溶かし、血中濃度を一定に保つためのものです。
          </p>
          <div className="bg-red-50 p-4 rounded-md border border-red-100 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-red-950 text-xs mb-1">⚠️ なぜ勝手な中断が危険なのか：</h5>
              <p className="text-red-900 leading-relaxed">
                尿酸降下薬を急にやめたり、逆に飲み忘れたあとに慌てて大量に飲むなどして血中尿酸濃度が「急激に変動」すると、関節に張り付いている結晶がポロポロと剥がれ落ちます。
                白血球がこの剥がれ落ちた結晶を異物とみなして一斉に攻撃を開始するため、<strong>痛みがない状態から、急に最も激しい痛風発作が誘発（再発）されます。</strong>
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs font-sans">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-sm border border-blue-100">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">痛風生活改善読本</h3>
          <p className="text-xs text-slate-400 mt-0.5">専門医・管理栄養士の知見に基づいた、食事・生活習慣改善の統合知識データベース</p>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map((article) => {
          const isOpen = openSection === article.id;
          return (
            <div
              key={article.id}
              className={`border rounded-md transition-all duration-150 overflow-hidden ${
                isOpen ? "bg-slate-50/40 border-slate-300 shadow-2xs" : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => toggleSection(article.id)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0">{article.icon}</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm">{article.title}</h4>
                    {!isOpen && (
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed font-normal">{article.summary}</p>
                    )}
                  </div>
                </div>
                <div>{isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}</div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="px-5 pb-6 pt-1 border-t border-slate-200 bg-white">
                      {article.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
