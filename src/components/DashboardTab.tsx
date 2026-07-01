import React, { useState } from "react";
import { DailyRecord, MealLog, UserProfile, AlarmSetting } from "../types";
import AppLogo from "./AppLogo";
import { getTodayDateString } from "../utils/date";
import { 
  Droplet, 
  Pill, 
  Beer, 
  Activity, 
  Utensils, 
  Plus, 
  Check, 
  AlertTriangle, 
  Smile, 
  Trash2, 
  Calendar,
  Sparkles,
  User,
  Settings,
  Bell,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardTabProps {
  currentRecord: DailyRecord;
  onUpdateRecord: (updated: Partial<DailyRecord>) => void;
  selectedDate: string;
  onChangeDate: (date: string) => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export default function DashboardTab({
  currentRecord,
  onUpdateRecord,
  selectedDate,
  onChangeDate,
  profile,
  onUpdateProfile,
}: DashboardTabProps) {
  const [mealInput, setMealInput] = useState("");
  const [mealPurine, setMealPurine] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [mealFilter, setMealFilter] = useState<"ALL" | "LOW" | "MEDIUM" | "HIGH">("ALL");

  const [newAlarmTime, setNewAlarmTime] = useState("08:00");
  const [newAlarmLabel, setNewAlarmLabel] = useState("");
  const [isAddingAlarm, setIsAddingAlarm] = useState(false);

  const alarms = profile.alarms || [];

  const handleToggleAlarm = (id: string, field: 'enabled' | 'soundEnabled' | 'notificationEnabled') => {
    const updated = alarms.map(al => {
      if (al.id === id) {
        return { ...al, [field]: !al[field] };
      }
      return al;
    });
    onUpdateProfile({ alarms: updated });
  };

  const handleAddAlarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlarmLabel.trim()) return;
    const newAlarm: AlarmSetting = {
      id: `alarm-${Date.now()}`,
      time: newAlarmTime,
      label: newAlarmLabel.trim(),
      enabled: true,
      soundEnabled: true,
      notificationEnabled: true,
    };
    onUpdateProfile({ alarms: [...alarms, newAlarm] });
    setNewAlarmLabel("");
    setIsAddingAlarm(false);
  };

  const handleDeleteAlarm = (id: string) => {
    onUpdateProfile({ alarms: alarms.filter(al => al.id !== id) });
  };

  const handleTestAlarmSound = () => {
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
      console.warn("Audio test failed", e);
    }
  };

  const addWater = (amount: number) => {
    onUpdateRecord({
      waterIntake: currentRecord.waterIntake + amount,
    });
  };

  const resetWater = () => {
    onUpdateRecord({ waterIntake: 0 });
  };

  const handleMedToggle = (time: "Morning" | "Afternoon" | "Evening" | "Night") => {
    const fieldMap = {
      Morning: "medicationMorning" as const,
      Afternoon: "medicationAfternoon" as const,
      Evening: "medicationEvening" as const,
      Night: "medicationNight" as const,
    };
    const field = fieldMap[time];
    const updatedVal = !currentRecord[field];
    
    const morning = time === "Morning" ? updatedVal : !!currentRecord.medicationMorning;
    const afternoon = time === "Afternoon" ? updatedVal : !!currentRecord.medicationAfternoon;
    const evening = time === "Evening" ? updatedVal : !!currentRecord.medicationEvening;
    const night = time === "Night" ? updatedVal : !!currentRecord.medicationNight;

    onUpdateRecord({
      [field]: updatedVal,
      medicationTaken: morning && afternoon && evening && night,
    });
  };

  const handlePainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateRecord({ painLevel: parseInt(e.target.value) });
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealInput.trim()) return;

    const newMeal: MealLog = {
      id: Date.now().toString(),
      name: mealInput.trim(),
      purineLevel: mealPurine,
      purineMg: mealPurine === "LOW" ? 25 : mealPurine === "MEDIUM" ? 80 : 200, // rough placeholder
    };

    onUpdateRecord({
      meals: [...currentRecord.meals, newMeal],
    });
    setMealInput("");
    setMealPurine("LOW");
    setMealFilter("ALL");
  };

  const handleRemoveMeal = (id: string) => {
    onUpdateRecord({
      meals: currentRecord.meals.filter((m) => m.id !== id),
    });
  };

  // Helper to interpret pain levels
  const getPainDescription = (level: number) => {
    if (level === 0) return { label: "痛みなし (快適)", color: "text-emerald-500", bg: "bg-emerald-50" };
    if (level <= 3) return { label: "違和感 (むずむずする・予兆)", color: "text-amber-500", bg: "bg-amber-50" };
    if (level <= 6) return { label: "軽〜中等度の痛み (歩けるがズキズキ痛む)", color: "text-orange-500", bg: "bg-orange-50" };
    if (level <= 9) return { label: "激痛 (歩くのが非常に困難・腫れている)", color: "text-red-500", bg: "bg-red-50" };
    return { label: "猛烈な激痛 (靴を履けず、触れるだけで激痛)", color: "text-rose-600 animate-pulse", bg: "bg-rose-50" };
  };

  const painInfo = getPainDescription(currentRecord.painLevel);

  // Water calculations
  const waterTarget = profile.targetWater || 2000;
  const waterPercent = Math.min(100, Math.round((currentRecord.waterIntake / waterTarget) * 100));

  // Count purine logs
  const lowCount = currentRecord.meals.filter(m => m.purineLevel === "LOW").length;
  const medCount = currentRecord.meals.filter(m => m.purineLevel === "MEDIUM").length;
  const highCount = currentRecord.meals.filter(m => m.purineLevel === "HIGH").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      
      {/* LEFT COLUMN - Today's Status & Action Center (8 cols on lg) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Date Selector Header */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">記録対象の日付</span>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onChangeDate(e.target.value)}
                  className="font-mono text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                {selectedDate === getTodayDateString() && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-sm font-bold border border-emerald-200">
                    今日
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Water Intake Tracker Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-sky-500" />
                水分補給トラッカー
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                水分をたっぷり摂ると尿量が増え、尿酸を体外へ洗い流しやすくなります（目標: 2000ml / 2L 以上）
              </p>
            </div>
            <button
              onClick={resetWater}
              className="text-slate-400 hover:text-red-500 text-xs transition-colors p-1 cursor-pointer"
              title="リセット"
            >
              リセット
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Progress Bar / Cup Representation (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                {/* Simulated Water Fill Wave */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-sky-400/20"
                  style={{ height: `${waterPercent}%` }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                
                <div className="z-10 text-center">
                  <span className="font-mono text-3xl font-extrabold text-sky-600 block">
                    {currentRecord.waterIntake}
                    <span className="text-xs font-normal text-slate-400 ml-0.5">ml</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mt-1">
                    目標の {waterPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Add Buttons (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => addWater(200)}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-md border border-slate-200 hover:border-sky-200 hover:bg-sky-50/30 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-500" />
                  +200ml (コップ1杯)
                </button>
                <button
                  onClick={() => addWater(350)}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-md border border-slate-200 hover:border-sky-200 hover:bg-sky-50/30 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-500" />
                  +350ml (マグ缶)
                </button>
                <button
                  onClick={() => addWater(500)}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-md border border-slate-200 hover:border-sky-200 hover:bg-sky-50/30 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-500" />
                  +500ml (ペットボトル)
                </button>
              </div>

              {/* Tips block */}
              <div className="bg-sky-50/50 rounded-md p-3 border border-sky-100/50 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-sky-700 leading-relaxed">
                  {waterPercent >= 100 ? (
                    <strong>目標達成！お見事です！腎臓が尿酸を効率よく排泄する環境が整っています。この調子でキープ！</strong>
                  ) : (
                    "起床後、入浴前後、就寝前、お仕事の合間など、こまめな水分補給（コップ1杯）を習慣付けましょう。ジュースや甘い飲み物は果糖が尿酸値を上げるため、水やカフェインレスのお茶が最適です。"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Meds Checklist Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                <Pill className="w-4.5 h-4.5 text-emerald-500" />
                服薬チェック（1日4回）
              </h3>
              <p className="text-[11px] text-slate-400">
                尿酸値を下げる薬や予防薬は、指示された時間に欠かさず服用しましょう。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "Morning" as const, label: "朝食後", field: "medicationMorning" as const },
              { id: "Afternoon" as const, label: "昼食後", field: "medicationAfternoon" as const },
              { id: "Evening" as const, label: "夕食後", field: "medicationEvening" as const },
              { id: "Night" as const, label: "就寝前", field: "medicationNight" as const },
            ].map((item) => {
              const isChecked = !!currentRecord[item.field];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMedToggle(item.id)}
                  className={`flex items-center justify-between p-2.5 rounded-md border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                      isChecked 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : "bg-white border-slate-300"
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-semibold text-xs">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-2 bg-emerald-50/30 border border-emerald-100/50 p-2 rounded-md text-[10px] text-emerald-700 leading-normal">
            ※ 尿酸低下薬の急な中断は、痛風発作を誘発する恐れがあります。医師の指示通り規則正しく服用してください。
          </div>
        </div>

        {/* ⏰ Auto-Launch Reminder & Alarm Settings Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                <Bell className="w-4.5 h-4.5 text-blue-500 animate-swing" />
                服薬・水分補給アラーム設定 (自動起動)
              </h3>
              <p className="text-[11px] text-slate-400">
                指定時間になると音が鳴り、ブラウザ通知からタップ1つで本アプリを自動起動します。
              </p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleTestAlarmSound}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-md text-[11px] font-bold text-slate-600 cursor-pointer"
                title="アラーム音と通知のテスト"
              >
                <Volume2 className="w-3.5 h-3.5" />
                アラームテスト
              </button>
              
              <button
                type="button"
                onClick={() => setIsAddingAlarm(!isAddingAlarm)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                追加
              </button>
            </div>
          </div>

          {/* Inline Add Alarm Form */}
          <AnimatePresence>
            {isAddingAlarm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddAlarmSubmit}
                className="mb-4 bg-slate-50 border border-slate-150 rounded-lg p-3 space-y-3 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                  <div className="sm:col-span-3">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">時間</label>
                    <input
                      type="time"
                      value={newAlarmTime}
                      onChange={(e) => setNewAlarmTime(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 font-mono font-bold focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">アラーム名</label>
                    <input
                      type="text"
                      placeholder="例: 朝の服薬・水分"
                      value={newAlarmLabel}
                      onChange={(e) => setNewAlarmLabel(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div className="sm:col-span-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAlarm(false)}
                      className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-md text-xs font-semibold text-slate-500"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold"
                    >
                      保存
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Alarm list */}
          <div className="divide-y divide-slate-100">
            {alarms.length === 0 ? (
              <p className="text-center py-6 text-slate-400 text-xs">登録されているアラームはありません。右上の「追加」ボタンから登録してください。</p>
            ) : (
              alarms.map((alarm) => (
                <div key={alarm.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 gap-3">
                  <div className="flex items-center gap-3">
                    {/* Enable switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleAlarm(alarm.id, "enabled")}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                        alarm.enabled ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                        alarm.enabled ? "translate-x-4" : "translate-x-0"
                      }`} />
                    </button>
                    
                    <div>
                      <span className={`text-sm font-mono font-bold ${alarm.enabled ? "text-slate-800" : "text-slate-400 line-through"}`}>
                        {alarm.time}
                      </span>
                      <span className={`text-xs ml-2 font-medium ${alarm.enabled ? "text-slate-600" : "text-slate-400"}`}>
                        {alarm.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Sound toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleAlarm(alarm.id, "soundEnabled")}
                      className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                        alarm.soundEnabled
                          ? "bg-slate-50 border-blue-200 text-blue-600"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                      title={alarm.soundEnabled ? "アラーム音：オン" : "アラーム音：オフ"}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Notification toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleAlarm(alarm.id, "notificationEnabled")}
                      className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                        alarm.notificationEnabled
                          ? "bg-slate-50 border-blue-200 text-blue-600"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                      title={alarm.notificationEnabled ? "プッシュ通知：オン" : "プッシュ通知：オフ"}
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteAlarm(alarm.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                      title="アラームを削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Joint Pain Level Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-500" />
                関節の痛みレベル
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                現在の関節 of 痛みや違和感を10段階で記録し、推移を確認します。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 px-4 py-2.5 rounded-md border border-slate-200">
              <span className="text-xs text-slate-500">現在の痛み：</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-sm ${painInfo.bg} ${painInfo.color} border border-slate-100`}>
                レベル {currentRecord.painLevel} — {painInfo.label}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-emerald-500">0 (無痛)</span>
              <input
                type="range"
                min="0"
                max="10"
                value={currentRecord.painLevel}
                onChange={handlePainChange}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <span className="text-xs font-mono font-bold text-rose-600">10 (極限)</span>
            </div>

            <div className="grid grid-cols-11 text-[9px] text-slate-400 font-mono text-center px-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <span
                  key={num}
                  className={`cursor-pointer hover:font-bold ${
                    currentRecord.painLevel === num ? "text-slate-800 font-extrabold" : ""
                  }`}
                  onClick={() => onUpdateRecord({ painLevel: num })}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Health Input Card */}
        <div className="bg-slate-50 rounded-lg border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs">
          <h3 className="font-semibold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 mb-2">
            <User className="w-4 h-4 text-blue-500" />
            測定データ＆本日カルテのクイック入力
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-end">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">お名前</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ name: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">身長 (cm)</label>
              <input
                type="number"
                value={typeof profile.height === "number" && profile.height > 0 ? profile.height : ""}
                onChange={(e) => onUpdateProfile({ height: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="未登録"
                step="0.1"
                className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 font-mono font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">本日の体重 (kg)</label>
              <input
                type="number"
                value={typeof currentRecord.weight === "number" && currentRecord.weight > 0 ? currentRecord.weight : ""}
                onChange={(e) => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onUpdateRecord({ weight: val });
                  if (val !== undefined) onUpdateProfile({ weight: val });
                }}
                placeholder="未登録"
                step="0.1"
                className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 font-mono font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">本日の尿酸値</label>
              <input
                type="number"
                value={typeof currentRecord.uricAcid === "number" && currentRecord.uricAcid > 0 ? currentRecord.uricAcid : ""}
                onChange={(e) => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onUpdateRecord({ uricAcid: val });
                  if (val !== undefined) onUpdateProfile({ uricAcid: val });
                }}
                placeholder="未登録"
                step="0.1"
                className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-700 font-mono font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">服薬指示</label>
              <button
                type="button"
                onClick={() => onUpdateProfile({ hasPrescribedMeds: !profile.hasPrescribedMeds })}
                className={`w-full py-1.5 rounded-md border text-center transition-colors font-semibold text-xs cursor-pointer ${
                  profile.hasPrescribedMeds
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
              >
                {profile.hasPrescribedMeds ? "あり" : "なし"}
              </button>
            </div>
          </div>
          
          <div className="mt-2.5">
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">本日のクリニック診断結果</label>
            <input
              type="text"
              value={currentRecord.clinicResult || ""}
              onChange={(e) => onUpdateRecord({ clinicResult: e.target.value })}
              placeholder="例: 尿酸値低下中。お酒の制限をしっかりと。次回は1ヶ月後診察。"
              className="w-full bg-white border border-slate-200 rounded-md p-2 text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Food Purine Log & Alcohol Controls (4 cols on lg) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Dietary Food & Purine Quick Logger */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
            <Utensils className="w-5 h-5 text-blue-600" />
            食事プリン体ログ
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            今日食べた料理を記録し、プリン体リスク割合を可視化します。
          </p>

          <form onSubmit={handleAddMeal} className="space-y-3 mb-4">
            <div>
              <input
                type="text"
                placeholder="例: サバの塩焼き、唐揚げ、白米"
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-1.5">
              {(["LOW", "MEDIUM", "HIGH"] as const).map((level) => {
                const labelMap = { LOW: "低リスク", MEDIUM: "中等度", HIGH: "高プリン体" };
                const activeStyle = {
                  LOW: "bg-emerald-100 border-emerald-300 ring-1 ring-emerald-300/30",
                  MEDIUM: "bg-amber-100 border-amber-300 ring-1 ring-amber-300/30",
                  HIGH: "bg-red-100 border-red-300 ring-1 ring-red-300/30",
                };

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setMealPurine(level);
                      setMealFilter(level);
                    }}
                    className={`flex-1 p-2 rounded-md border text-[10px] font-bold transition-all text-center cursor-pointer ${
                      mealPurine === level ? activeStyle[level] : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    {labelMap[level]}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              食事ログを追加
            </button>
          </form>

          {/* Stats bar */}
          <div className="flex gap-2 mb-4 bg-slate-50/50 p-1.5 rounded-md border border-slate-200 text-[10px] text-center">
            <button
              type="button"
              onClick={() => setMealFilter(mealFilter === "LOW" ? "ALL" : "LOW")}
              className={`flex-1 py-1.5 px-1 rounded-md transition-all cursor-pointer ${
                mealFilter === "LOW" 
                  ? "bg-emerald-100 border border-emerald-300 shadow-3xs" 
                  : "bg-white border border-transparent hover:bg-slate-100"
              }`}
            >
              <span className="text-emerald-600 font-bold block">{lowCount}</span>
              <span className="text-slate-500 font-semibold block">低プリン体</span>
            </button>
            
            <div className="w-[1px] bg-slate-200 self-stretch my-1"></div>
            
            <button
              type="button"
              onClick={() => setMealFilter(mealFilter === "MEDIUM" ? "ALL" : "MEDIUM")}
              className={`flex-1 py-1.5 px-1 rounded-md transition-all cursor-pointer ${
                mealFilter === "MEDIUM" 
                  ? "bg-amber-100 border border-amber-300 shadow-3xs" 
                  : "bg-white border border-transparent hover:bg-slate-100"
              }`}
            >
              <span className="text-amber-600 font-bold block">{medCount}</span>
              <span className="text-slate-500 font-semibold block">中等度</span>
            </button>
            
            <div className="w-[1px] bg-slate-200 self-stretch my-1"></div>
            
            <button
              type="button"
              onClick={() => setMealFilter(mealFilter === "HIGH" ? "ALL" : "HIGH")}
              className={`flex-1 py-1.5 px-1 rounded-md transition-all cursor-pointer ${
                mealFilter === "HIGH" 
                  ? "bg-red-100 border border-red-300 shadow-3xs" 
                  : "bg-white border border-transparent hover:bg-slate-100"
              }`}
            >
              <span className="text-red-600 font-bold block">{highCount}</span>
              <span className="text-slate-500 font-semibold block">高危険</span>
            </button>
          </div>

          {/* Meal List Header / Active Filter Info */}
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-bold text-slate-400">
              {mealFilter === "ALL" 
                ? "登録済みの食事（すべて）" 
                : `登録済みの食事（${mealFilter === "LOW" ? "低リスク" : mealFilter === "MEDIUM" ? "中等度" : "高プリン体"}のみ）`}
            </span>
            {mealFilter !== "ALL" && (
              <button
                type="button"
                onClick={() => setMealFilter("ALL")}
                className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                すべて表示
              </button>
            )}
          </div>

          {/* Meal List */}
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
            {currentRecord.meals.filter(m => mealFilter === "ALL" || m.purineLevel === mealFilter).length === 0 ? (
              <p className="text-center text-slate-300 text-xs py-6">
                {mealFilter === "ALL" 
                  ? "今日の食事記録はありません。" 
                  : `${mealFilter === "LOW" ? "低リスク" : mealFilter === "MEDIUM" ? "中等度" : "高プリン体"}の食事記録はありません。`}
              </p>
            ) : (
              currentRecord.meals
                .filter(m => mealFilter === "ALL" || m.purineLevel === mealFilter)
                .map((meal) => {
                  const colorMap = {
                    LOW: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "低プリン体" },
                    MEDIUM: { bg: "bg-amber-50 text-amber-700 border-amber-200", label: "中プリン体" },
                    HIGH: { bg: "bg-red-50 text-red-700 font-bold border-red-200 animate-pulse", label: "極高プリン体" },
                  };
                  const config = colorMap[meal.purineLevel];

                  return (
                    <div
                      key={meal.id}
                      className="flex justify-between items-center bg-slate-50/40 border border-slate-200 p-2.5 rounded-md text-xs hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-700">{meal.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-sm w-max font-bold border ${config.bg}`}>
                          {config.label}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveMeal(meal.id)}
                        className="text-slate-300 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
                        title="削除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Alcohol & Drinking Limitation Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
            <Beer className="w-5 h-5 text-amber-500" />
            飲酒・お酒の量
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            お酒はプリン体の有無にかかわらず尿酸値を上げます。飲む量をコントロールしましょう。
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">今日飲んだアルコール量（杯）</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateRecord({ alcoholCups: Math.max(0, currentRecord.alcoholCups - 1) })}
                  className="w-10 h-10 rounded-md border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  -
                </button>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-md h-10 flex items-center justify-center font-mono font-bold text-slate-700">
                  {currentRecord.alcoholCups} 杯
                </div>
                <button
                  onClick={() => onUpdateRecord({ alcoholCups: currentRecord.alcoholCups + 1 })}
                  className="w-10 h-10 rounded-md border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {currentRecord.alcoholCups > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">お酒の種類</label>
                <select
                  value={currentRecord.alcoholType}
                  onChange={(e) => onUpdateRecord({ alcoholType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="ビール (超危険：プリン体極高)">ビール (超危険：高プリン)</option>
                  <option value="日本酒 (注意：中プリン)">日本酒 (中プリン)</option>
                  <option value="焼酎 (低プリン)">焼酎 (低プリン)</option>
                  <option value="ウイスキー・ハイボール (低プリン)">ウイスキー・ハイボール (低プリン)</option>
                  <option value="ワイン (中プリン)">ワイン (中プリン)</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            )}

            {/* Warnings context */}
            <AnimatePresence>
              {currentRecord.alcoholCups > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 p-3.5 rounded-md border border-red-200 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5 animate-bounce" />
                  <div className="text-[11px] text-red-800 leading-relaxed">
                    <strong>アルコール警告！</strong>
                    <p className="mt-0.5">
                      アルコールは体内で分解される際、尿酸の生産を促し、かつ腎臓からの尿酸排出を強力に阻害します。
                    </p>
                    <p className="mt-1 font-semibold text-red-700">
                      ★ 飲んだお酒と「同量〜2倍以上」の水をすぐに追加摂取してください！
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-emerald-50/70 p-3.5 rounded-md border border-emerald-100 flex items-start gap-2.5">
                  <Smile className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    本日ノンアルコール！素晴らしいです。尿酸値が最も下がりやすい状態をキープできています。
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Daily Note / Diary Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <label className="font-semibold text-slate-800 block text-sm mb-2">
            今日の日記・体調メモ
          </label>
          <textarea
            value={currentRecord.notes || ""}
            onChange={(e) => onUpdateRecord({ notes: e.target.value })}
            placeholder="例: 右足中指の痛みが大分引いた。夕食後の薬も忘れないようにしよう。"
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
