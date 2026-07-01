import { DailyRecord, UricAcidLog, UserProfile } from "./types";

// Helper to format dates relative to today
const getRelativeDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split("T")[0];
};

export const defaultProfile: UserProfile = {
  name: "あなた",
  diagnosedDate: "2026-06-12", // 病院を受診した日（2026-06-12）に合わせる
  targetWater: 2000, // 2 Liters target
  hasPrescribedMeds: true,
  height: 0,
  weight: 0,
  uricAcid: 0,
  notes: "右足中指の関節が赤く腫れて激痛。お医者さんから『水分を2L以上飲み、ビールを控えて、毎日薬をしっかり飲むように』と言われました。",
  alarms: [
    { id: "alarm-1", time: "08:00", label: "朝の服薬・水分補給", enabled: true, soundEnabled: true, notificationEnabled: true },
  ]
};

export const initialUricAcidLogs: UricAcidLog[] = [
  { id: "1", date: "2026-02-15", value: 8.6, note: "健康診断で高尿酸血症と指摘" },
  { id: "2", date: "2026-04-10", value: 8.2, note: "水分補給を意識し始めた頃" },
  { id: "3", date: "2026-06-12", value: 7.9, note: "右足中指に痛風発作が起き、病院を受診した日" },
  { id: "4", date: "2026-06-25", value: 7.1, note: "薬物治療と食生活改善2週間後の検診" },
];

export const initialDailyRecords: DailyRecord[] = [
  {
    date: getRelativeDate(6),
    waterIntake: 1200,
    alcoholCups: 2,
    alcoholType: "ビール (中ジョッキ)",
    medicationTaken: true,
    painLevel: 6,
    weight: 74.5,
    notes: "足の中指がジンジンと痛む。まだ腫れが引かない。ビールを飲んでしまい後悔。",
    meals: [
      { id: "m1", name: "豚骨ラーメン、餃子", purineLevel: "HIGH", purineMg: 180 },
      { id: "m2", name: "冷奴、わかめスープ", purineLevel: "LOW", purineMg: 25 },
    ],
  },
  {
    date: getRelativeDate(5),
    waterIntake: 1800,
    alcoholCups: 0,
    alcoholType: "なし",
    medicationTaken: true,
    painLevel: 5,
    weight: 74.2,
    notes: "今日は禁酒に成功。水も1.8L飲んだ。痛みは少し和らいだ気がする。",
    meals: [
      { id: "m3", name: "焼き魚（鮭）、ご飯、味噌汁", purineLevel: "MEDIUM", purineMg: 75 },
      { id: "m4", name: "トマトサラダ、納豆", purineLevel: "LOW", purineMg: 35 },
    ],
  },
  {
    date: getRelativeDate(4),
    waterIntake: 2200,
    alcoholCups: 1,
    alcoholType: "ハイボール",
    medicationTaken: true,
    painLevel: 4,
    weight: 74.0,
    notes: "目標の2L水分を達成！お酒はハイボール1杯だけ。プリン体が非常に少ないとのこと。",
    meals: [
      { id: "m5", name: "野菜炒め、玄米、わかめ味噌汁", purineLevel: "LOW", purineMg: 30 },
      { id: "m6", name: "ローストチキン（皮なし）", purineLevel: "MEDIUM", purineMg: 60 },
    ],
  },
  {
    date: getRelativeDate(3),
    waterIntake: 2000,
    alcoholCups: 0,
    alcoholType: "なし",
    medicationTaken: true,
    painLevel: 2,
    weight: 73.8,
    notes: "痛みはほぼ無くなり、靴を履いて普通に歩けるようになった。薬の効果を実感。",
    meals: [
      { id: "m7", name: "お刺身（マグロ）、冷奴、ほうれん草おひたし", purineLevel: "MEDIUM", purineMg: 85 },
      { id: "m8", name: "うどん、半熟卵", purineLevel: "LOW", purineMg: 15 },
    ],
  },
  {
    date: getRelativeDate(2),
    waterIntake: 2500,
    alcoholCups: 0,
    alcoholType: "なし",
    medicationTaken: true,
    painLevel: 1,
    weight: 73.5,
    notes: "水を2.5L飲んで尿量がしっかり確保されている。体がすっきりしてきた。",
    meals: [
      { id: "m9", name: "豆腐ステーキ、オクラサラダ、筑前煮", purineLevel: "LOW", purineMg: 28 },
      { id: "m10", name: "白身魚のホイル焼き、白米", purineLevel: "LOW", purineMg: 40 },
    ],
  },
  {
    date: getRelativeDate(1),
    waterIntake: 2100,
    alcoholCups: 0,
    alcoholType: "なし",
    medicationTaken: true,
    painLevel: 0,
    weight: 73.3,
    notes: "痛みはゼロ！中指の赤みも完全に引いた。このまま生活習慣を続けたい。",
    meals: [
      { id: "m11", name: "豚しゃぶサラダ、きのことワカメのスープ", purineLevel: "LOW", purineMg: 45 },
      { id: "m12", name: "蕎麦（ねぎ、わさび、とろろ）", purineLevel: "LOW", purineMg: 20 },
    ],
  },
];
