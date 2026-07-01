import React, { useState, useEffect } from "react";
import { DailyRecord, UricAcidLog, UserProfile, MealLog, AlarmSetting } from "./types";
import { 
  defaultProfile, 
  initialDailyRecords, 
  initialUricAcidLogs 
} from "./initialData";

import DashboardTab from "./components/DashboardTab";
import AdvisorTab from "./components/AdvisorTab";
import HistoryTab from "./components/HistoryTab";
import KnowledgeTab from "./components/KnowledgeTab";
import AppLogo from "./components/AppLogo";
import { getTodayDateString } from "./utils/date";

import { 
  Heart, 
  User, 
  Sparkles, 
  Droplet, 
  Pill, 
  Beer, 
  Activity, 
  ClipboardList, 
  BookOpen, 
  Settings2,
  CalendarDays,
  X,
  Check,
  Bell,
  Volume2,
  Utensils
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// 綺麗な2音（ピピッ、ピピッ）のアラーム音を生成して再生する
const playAlarmSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (time: number, freq: number, duration: number) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.2, time + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(time);
      osc.stop(time + duration);
    };

    const now = audioCtx.currentTime;
    playTone(now, 880, 0.15);
    playTone(now + 0.2, 880, 0.15);
    playTone(now + 0.4, 1200, 0.3);
  } catch (e) {
    console.warn("AudioContext is not supported or allowed yet", e);
  }
};

const sendNotification = (title: string, body: string) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  try {
    const notification = new Notification(title, {
      body: body,
      tag: "gout-alarm",
      requireInteraction: true,
    });
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (e) {
    console.error("Failed to send notification", e);
  }
};

export default function App() {
  // Load states from LocalStorage or fallback to defaults
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem("gout_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name === "こうじ" || !parsed.name || parsed.name.trim() === "" || parsed.name === "未登録") {
          parsed.name = "あなた";
        }
        if (parsed.height === 172 || Number(parsed.height) === 172) {
          parsed.height = 0;
        }
        if (parsed.weight === 73.5 || Number(parsed.weight) === 73.5) {
          parsed.weight = 0;
        }
        if (parsed.uricAcid === 7.1 || Number(parsed.uricAcid) === 7.1) {
          parsed.uricAcid = 0;
        }
        return {
          ...defaultProfile,
          ...parsed,
          alarms: Array.isArray(parsed.alarms) ? parsed.alarms : defaultProfile.alarms,
        };
      }
      return defaultProfile;
    } catch (e) {
      console.warn("LocalStorage profile read failed/blocked:", e);
      return defaultProfile;
    }
  });

  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>(() => {
    try {
      const stored = localStorage.getItem("gout_daily_records");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map((record: any) => ({
            date: record.date || getTodayDateString(),
            waterIntake: typeof record.waterIntake === "number" && !isNaN(record.waterIntake) ? record.waterIntake : 0,
            alcoholCups: typeof record.alcoholCups === "number" && !isNaN(record.alcoholCups) ? record.alcoholCups : 0,
            alcoholType: record.alcoholType || "なし",
            medicationTaken: !!record.medicationTaken,
            medicationMorning: !!record.medicationMorning,
            medicationAfternoon: !!record.medicationAfternoon,
            medicationEvening: !!record.medicationEvening,
            medicationNight: !!record.medicationNight,
            painLevel: typeof record.painLevel === "number" && !isNaN(record.painLevel) ? record.painLevel : 0,
            meals: Array.isArray(record.meals) ? record.meals : [],
            weight: record.weight,
            uricAcid: record.uricAcid,
            clinicResult: record.clinicResult,
            notes: record.notes,
          }));
        }
      }
      return initialDailyRecords;
    } catch (e) {
      console.warn("LocalStorage dailyRecords read failed/blocked:", e);
      return initialDailyRecords;
    }
  });

  const [uricAcidLogs, setUricAcidLogs] = useState<UricAcidLog[]>(() => {
    try {
      const stored = localStorage.getItem("gout_uric_acid_logs");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map((log: any) => ({
            id: log.id || Date.now().toString(),
            date: log.date || getTodayDateString(),
            value: typeof log.value === "number" && !isNaN(log.value) ? log.value : 7.0,
            note: log.note || "",
          }));
        }
      }
      return initialUricAcidLogs;
    } catch (e) {
      console.warn("LocalStorage uricAcidLogs read failed/blocked:", e);
      return initialUricAcidLogs;
    }
  });

  // Active dates and tab switching states
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return getTodayDateString();
  });
  const [activeTab, setActiveTab] = useState<"dashboard" | "advisor" | "history" | "knowledge" >("dashboard");

  // Profile edit modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editMeds, setEditMeds] = useState(profile.hasPrescribedMeds);
  const [editWater, setEditWater] = useState(profile.targetWater.toString());
  const [editNotes, setEditNotes] = useState(profile.notes || "");
  const [editHeight, setEditHeight] = useState(profile.height !== undefined && profile.height !== null ? profile.height.toString() : "");
  const [editWeight, setEditWeight] = useState(profile.weight !== undefined && profile.weight !== null ? profile.weight.toString() : "");
  const [editUricAcid, setEditUricAcid] = useState(profile.uricAcid !== undefined && profile.uricAcid !== null ? profile.uricAcid.toString() : "");
  const [editClinicResult, setEditClinicResult] = useState("");
  const [editDiagnosedDate, setEditDiagnosedDate] = useState(profile.diagnosedDate);

  const openProfileModal = () => {
    const current = getCurrentRecord();
    setEditName(profile.name);
    setEditMeds(profile.hasPrescribedMeds);
    setEditWater(profile.targetWater.toString());
    setEditNotes(profile.notes || "");
    setEditHeight(profile.height !== undefined && profile.height !== null ? profile.height.toString() : "");
    const currentWeight = current.weight !== undefined && current.weight !== null ? current.weight : profile.weight;
    setEditWeight(currentWeight !== undefined && currentWeight !== null ? currentWeight.toString() : "");
    const currentUric = current.uricAcid !== undefined && current.uricAcid !== null ? current.uricAcid : profile.uricAcid;
    setEditUricAcid(currentUric !== undefined && currentUric !== null ? currentUric.toString() : "");
    setEditClinicResult(current.clinicResult || "");
    setEditDiagnosedDate(profile.diagnosedDate);
    setIsProfileModalOpen(true);
  };

  // Alarm states
  const [activeAlarm, setActiveAlarm] = useState<AlarmSetting | null>(null);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);

  // Sync to LocalStorage safely
  useEffect(() => {
    try {
      localStorage.setItem("gout_profile", JSON.stringify(profile));
    } catch (e) {
      console.warn("LocalStorage profile write failed/blocked:", e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem("gout_daily_records", JSON.stringify(dailyRecords));
    } catch (e) {
      console.warn("LocalStorage dailyRecords write failed/blocked:", e);
    }
  }, [dailyRecords]);

  useEffect(() => {
    try {
      localStorage.setItem("gout_uric_acid_logs", JSON.stringify(uricAcidLogs));
    } catch (e) {
      console.warn("LocalStorage uricAcidLogs write failed/blocked:", e);
    }
  }, [uricAcidLogs]);

  // Check Alarms every 30 seconds
  useEffect(() => {
    try {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    } catch (e) {
      console.warn("Notification request permission blocked or failed:", e);
    }

    let lastCheckedMinute = "";

    const checkAlarms = () => {
      try {
        const now = new Date();
        const currentHourMin = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        
        if (currentHourMin === lastCheckedMinute) return;
        
        const alarmsList = profile.alarms || [];
        const triggeredAlarm = alarmsList.find(al => al.enabled && al.time === currentHourMin);

        if (triggeredAlarm) {
          lastCheckedMinute = currentHourMin;
          setActiveAlarm(triggeredAlarm);
          setIsAlarmModalOpen(true);

          if (triggeredAlarm.soundEnabled) {
            playAlarmSound();
            setTimeout(playAlarmSound, 1000);
            setTimeout(playAlarmSound, 2000);
          }

          if (triggeredAlarm.notificationEnabled) {
            sendNotification(
              "⏰ Gout Care",
              `${triggeredAlarm.label}の時間です！服薬チェックと水分補給をして尿酸値を管理しましょう。`
            );
          }
        }
      } catch (err) {
        console.error("Alarm check interval error:", err);
      }
    };

    const interval = setInterval(checkAlarms, 20000);
    checkAlarms();

    return () => clearInterval(interval);
  }, [profile.alarms]);

  // Find or create a record for the currently selected date
  const getCurrentRecord = (): DailyRecord => {
    const record = dailyRecords.find((r) => r.date === selectedDate);
    const defaultRecord: DailyRecord = {
      date: selectedDate,
      waterIntake: 0,
      alcoholCups: 0,
      alcoholType: "なし",
      medicationTaken: false,
      medicationMorning: false,
      medicationAfternoon: false,
      medicationEvening: false,
      medicationNight: false,
      painLevel: 0,
      meals: [],
    };

    if (record) {
      return {
        ...defaultRecord,
        ...record,
        waterIntake: typeof record.waterIntake === "number" && !isNaN(record.waterIntake) ? record.waterIntake : 0,
        alcoholCups: typeof record.alcoholCups === "number" && !isNaN(record.alcoholCups) ? record.alcoholCups : 0,
        painLevel: typeof record.painLevel === "number" && !isNaN(record.painLevel) ? record.painLevel : 0,
        meals: Array.isArray(record.meals) ? record.meals : [],
      };
    }
    return defaultRecord;
  };

  const handleUpdateRecord = (updatedFields: Partial<DailyRecord>) => {
    setDailyRecords((prev) => {
      const existingIdx = prev.findIndex((r) => r.date === selectedDate);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...updatedFields };
        return updated;
      } else {
        // Create new record
        const newRecord: DailyRecord = {
          date: selectedDate,
          waterIntake: 0,
          alcoholCups: 0,
          alcoholType: "なし",
          medicationTaken: false,
          medicationMorning: false,
          medicationAfternoon: false,
          medicationEvening: false,
          medicationNight: false,
          painLevel: 0,
          meals: [],
          ...updatedFields,
        };
        return [...prev, newRecord];
      }
    });
  };

  // Uric Acid state modifiers
  const handleAddUricAcidLog = (newLog: Omit<UricAcidLog, "id">) => {
    const log: UricAcidLog = {
      id: Date.now().toString(),
      ...newLog,
    };
    setUricAcidLogs((prev) => [...prev, log]);
  };

  const handleDeleteUricAcidLog = (id: string) => {
    setUricAcidLogs((prev) => prev.filter((l) => l.id !== id));
  };

  // Callback to add analyzed meal directly to today's log from the AI Advisor panel
  const handleAddMealToToday = (meal: MealLog) => {
    const current = getCurrentRecord();
    handleUpdateRecord({
      meals: [...current.meals, meal],
    });
  };

  // Save profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHeight = editHeight !== "" && !isNaN(parseFloat(editHeight)) ? parseFloat(editHeight) : undefined;
    const parsedWeight = editWeight !== "" && !isNaN(parseFloat(editWeight)) ? parseFloat(editWeight) : undefined;
    const parsedUricAcid = editUricAcid !== "" && !isNaN(parseFloat(editUricAcid)) ? parseFloat(editUricAcid) : undefined;

    setProfile({
      name: editName.trim() || "匿名ユーザー",
      diagnosedDate: editDiagnosedDate, // use edited value
      targetWater: parseInt(editWater) || 2000,
      hasPrescribedMeds: editMeds,
      height: parsedHeight,
      weight: parsedWeight,
      uricAcid: parsedUricAcid,
      notes: editNotes.trim() || undefined,
    });

    handleUpdateRecord({
      weight: parsedWeight,
      uricAcid: parsedUricAcid,
      clinicResult: editClinicResult.trim() || undefined,
    });

    if (parsedUricAcid !== undefined && parsedUricAcid !== null) {
      const sortedLogs = [...uricAcidLogs].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const lastLog = sortedLogs[sortedLogs.length - 1];
      if (!lastLog || lastLog.value !== parsedUricAcid || lastLog.date !== selectedDate) {
        handleAddUricAcidLog({
          date: selectedDate,
          value: parsedUricAcid,
          note: editClinicResult.trim() || "診察・プロフィール更新による自動記録",
        });
      }
    }

    setIsProfileModalOpen(false);
  };

  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const currentRecord = getCurrentRecord();

  // Highlight stats for top header
  const checkedMedsCount = [
    currentRecord.medicationMorning,
    currentRecord.medicationAfternoon,
    currentRecord.medicationEvening,
    currentRecord.medicationNight
  ].filter(Boolean).length;

  const completedMeds = checkedMedsCount === 4;
  const waterProgress = Math.min(100, Math.round((currentRecord.waterIntake / profile.targetWater) * 100));
  const latestUricAcid = currentRecord.uricAcid !== undefined && currentRecord.uricAcid !== null
    ? currentRecord.uricAcid
    : (profile.uricAcid !== undefined && profile.uricAcid !== null
      ? profile.uricAcid
      : ([...uricAcidLogs].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).pop()?.value ?? 0));

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans pb-16 relative">
      
      {/* Upper Brand Info and Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <AppLogo />
              <div>
                <h1 className="font-semibold text-base tracking-tight text-slate-900 font-sans flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
                  <span className="font-bold">Gout Care</span>
                  <span className="text-[11px] sm:text-sm text-slate-500 font-normal sm:font-semibold">ー痛風改善サポートー</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">尿酸値と生活習慣の統合管理</p>
              </div>
            </div>

            {/* Profile Brief Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditName(profile.name);
                  setEditMeds(profile.hasPrescribedMeds);
                  setEditWater(profile.targetWater.toString());
                  setEditNotes(profile.notes || "");
                  setIsProfileModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs text-slate-600 font-medium cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>あなたの設定</span>
                <Settings2 className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col">
        
        {/* Profile Card & Top Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 order-2 md:order-none">
          
          {/* Diagnostic status block */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-blue-400 font-mono text-[9px] block uppercase tracking-wider font-semibold">Gout Profile & Status</span>
                  <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">{profile.name} さん</h2>
                </div>
                <button
                  onClick={openProfileModal}
                  className="px-2 py-1 text-[10px] font-bold bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all cursor-pointer flex items-center gap-1 border border-blue-500"
                >
                  <Settings2 className="w-3 h-3" />
                  入力・変更
                </button>
              </div>

              {/* Compact Grid of Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-800/40 p-2 rounded-md border border-slate-800/80 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 block">身長</span>
                  <span className="text-[11px] sm:text-xs font-bold font-mono text-slate-200">
                    {typeof profile.height === "number" && profile.height > 0 ? `${profile.height} cm` : "未登録"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">現在の体重</span>
                  <span className="text-[11px] sm:text-xs font-bold font-mono text-slate-200">
                    {typeof (currentRecord.weight ?? profile.weight) === "number" && (currentRecord.weight ?? profile.weight) > 0 ? `${currentRecord.weight ?? profile.weight} kg` : "未登録"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">最新尿酸値</span>
                  <span className="text-[11px] sm:text-xs font-bold font-mono text-blue-400">
                    {typeof latestUricAcid === "number" && latestUricAcid > 0 ? `${latestUricAcid.toFixed(1)} mg/dL` : "未登録"}
                  </span>
                </div>
              </div>

              {/* Today's clinic diagnosis result */}
              <div className="bg-slate-800/30 p-2 rounded-md border border-slate-800/50">
                <span className="text-[9px] text-slate-400 block font-semibold mb-0.5 uppercase tracking-wider">本日のクリニック診断結果</span>
                <p className="text-[11px] text-slate-200 leading-normal font-medium italic truncate">
                  {currentRecord.clinicResult ? `「${currentRecord.clinicResult}」` : "診察結果未登録（上のボタンから入力）"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 relative z-10 border-t border-slate-800/80 pt-2.5 text-[9px]">
              <div>
                <span className="text-slate-500 block">診断日</span>
                <span className="font-mono font-bold text-slate-300">{profile.diagnosedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">服薬スケジュール</span>
                <span className="font-bold text-blue-400">{profile.hasPrescribedMeds ? "毎日服用指示あり" : "なし"}</span>
              </div>
            </div>
          </div>

          {/* Today's Stats Ribbon (7 columns, side-by-side even on mobile) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-2 sm:gap-4 bg-white rounded-lg p-3 sm:p-5 border border-slate-200 shadow-xs">
            {/* Stat: Water */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Droplet className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider truncate">水分補給</span>
                <span className="font-mono text-xs sm:text-base font-bold text-slate-700 block mt-0.5">
                  {waterProgress}%
                </span>
                <span className="text-[9px] text-slate-400 block truncate">{currentRecord.waterIntake} ml</span>
              </div>
            </div>

            {/* Stat: Meds */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Pill className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider truncate">今日の服薬</span>
                <span className={`text-[10px] sm:text-xs font-bold block mt-1 px-1.5 sm:px-2.5 py-0.5 rounded-sm w-max mx-auto sm:mx-0 border ${
                  completedMeds ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : checkedMedsCount > 0 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  {completedMeds ? "完了" : `${checkedMedsCount}/4`}
                </span>
              </div>
            </div>

            {/* Stat: Uric Acid */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Activity className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider truncate">最新尿酸値</span>
                <span className={`font-mono text-xs sm:text-base font-bold block mt-0.5 leading-none ${latestUricAcid >= 7.0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {latestUricAcid ? `${latestUricAcid.toFixed(1)}` : "未記録"}
                </span>
                <span className="text-[9px] text-slate-400 block truncate">基準: 7.0未満</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tab Selection Bar */}
        <div className="border-b border-slate-200 mb-6 bg-white p-1 rounded-lg border flex order-none md:order-none">
          <nav className="flex gap-1 w-full" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              今日の日記・記録
            </button>

            <button
              onClick={() => setActiveTab("advisor")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "advisor"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Utensils className="w-4 h-4" />
              プリン体検索図鑑
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "history"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              尿酸値の記録・推移
            </button>

            <button
              onClick={() => setActiveTab("knowledge")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "knowledge"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              痛風生活改善読本
            </button>
          </nav>
        </div>

        {/* Tab Panels with animations */}
        <div className="order-1 md:order-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
            >
              {activeTab === "dashboard" && (
                <DashboardTab
                  currentRecord={currentRecord}
                  onUpdateRecord={handleUpdateRecord}
                  selectedDate={selectedDate}
                  onChangeDate={setSelectedDate}
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === "advisor" && (
                <AdvisorTab onAddMealToToday={handleAddMealToToday} />
              )}

              {activeTab === "history" && (
                <HistoryTab
                  logs={uricAcidLogs}
                  onAddLog={handleAddUricAcidLog}
                  onDeleteLog={handleDeleteUricAcidLog}
                />
              )}

              {activeTab === "knowledge" && <KnowledgeTab />}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* FOOTER credit */}
      <footer className="mt-20 border-t border-slate-200 py-6 text-center text-[11px] text-slate-400 bg-white">
        <p>© 2026 GoutCare. 専門医の指導に従って生活管理を行ってください。</p>
      </footer>

      {/* USER PROFILE CONFIGURATION MODAL (Portal Simulated via absolute React container) */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-md overflow-hidden border border-slate-200 shadow-xl flex flex-col"
            >
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4.5 h-4.5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">カルテ＆基本プロフィール入力</h3>
                </div>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="p-5 space-y-3.5">
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-1">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">お名前</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      maxLength={15}
                      placeholder="例: あなた"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-semibold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">目標水分 (ml)</label>
                    <input
                      type="number"
                      value={editWater}
                      onChange={(e) => setEditWater(e.target.value)}
                      required
                      min={1000}
                      max={5000}
                      placeholder="例: 2000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">診断日</label>
                    <input
                      type="date"
                      value={editDiagnosedDate}
                      onChange={(e) => setEditDiagnosedDate(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">身長 (cm)</label>
                    <input
                      type="number"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      min={0}
                      max={250}
                      step="0.1"
                      placeholder="例: 172.0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">現在の体重 (kg)</label>
                    <input
                      type="number"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      min={0}
                      max={200}
                      step="0.1"
                      placeholder="例: 73.5"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">最新尿酸値 (mg/dL)</label>
                    <input
                      type="number"
                      value={editUricAcid}
                      onChange={(e) => setEditUricAcid(e.target.value)}
                      min={0}
                      max={15}
                      step="0.1"
                      placeholder="例: 7.1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                    />
                  </div>
                  <div className="bg-slate-50 p-2 rounded-md border border-slate-200 flex items-center justify-between h-[34px] mt-4.5">
                    <span className="text-[10px] font-semibold text-slate-600 block leading-tight">服薬習慣あり</span>
                    <button
                      type="button"
                      onClick={() => setEditMeds(!editMeds)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                        editMeds ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                        editMeds ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">本日のクリニック診断結果</label>
                  <input
                    type="text"
                    value={editClinicResult}
                    onChange={(e) => setEditClinicResult(e.target.value)}
                    placeholder="例: 尿酸値は順調に低下。このまま継続してください。"
                    maxLength={100}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">お医者さんからの指導・症状メモ</label>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="指導内容や、現在の関節の痛み部位などのメモ。"
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md py-2.5 text-xs font-semibold text-slate-600 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    保存する
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isAlarmModalOpen && activeAlarm && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-sm overflow-hidden border border-slate-200 shadow-2xl flex flex-col p-5 text-center relative"
            >
              <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200 animate-bounce">
                <Bell className="w-7 h-7 stroke-[2.5]" />
              </div>
              
              <span className="text-xs text-blue-600 font-bold tracking-wider font-mono bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 w-max mx-auto mb-2">
                アラーム時刻 {activeAlarm.time}
              </span>
              
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {activeAlarm.label}の時間です！
              </h3>
              
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                痛風改善には規則正しい服薬と十分な水分補給が欠かせません。<br />今すぐ記録を更新しましょう。
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    const current = getCurrentRecord();
                    handleUpdateRecord({
                      medicationMorning: current.medicationMorning || activeAlarm.label.includes("朝"),
                      medicationAfternoon: current.medicationAfternoon || activeAlarm.label.includes("昼"),
                      medicationEvening: current.medicationEvening || activeAlarm.label.includes("夜"),
                      medicationNight: current.medicationNight || activeAlarm.label.includes("就寝"),
                    });
                    setIsAlarmModalOpen(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-md text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Pill className="w-4 h-4" />
                  服薬を完了として記録する
                </button>
                
                <button
                  onClick={() => {
                    const current = getCurrentRecord();
                    handleUpdateRecord({
                      waterIntake: current.waterIntake + 250,
                    });
                    setIsAlarmModalOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Droplet className="w-4 h-4" />
                  水を250ml飲んだと記録する
                </button>

                <button
                  onClick={() => setIsAlarmModalOpen(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-md text-xs transition-colors"
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
