import React, { useState } from "react";
import { UricAcidLog } from "../types";
import CustomChart from "./CustomChart";
import { getTodayDateString } from "../utils/date";
import { Plus, ClipboardList, Info, Sparkles, TrendingDown } from "lucide-react";

interface HistoryTabProps {
  logs: UricAcidLog[];
  onAddLog: (log: Omit<UricAcidLog, "id">) => void;
  onDeleteLog: (id: string) => void;
}

export default function HistoryTab({ logs, onAddLog, onDeleteLog }: HistoryTabProps) {
  // Sort logs by date ascending
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latestValue = sortedLogs[sortedLogs.length - 1]?.value || 0;

  const [date, setDate] = useState(getTodayDateString());
  const [value, setValue] = useState(() => latestValue > 0 ? latestValue.toFixed(1) : "7.0");
  const [note, setNote] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedVal = parseFloat(value);
    if (isNaN(parsedVal) || parsedVal < 2 || parsedVal > 15) {
      alert("尿酸値は 2.0 〜 15.0 mg/dL の範囲で入力してください。");
      return;
    }

    onAddLog({
      date,
      value: parsedVal,
      note: note.trim() || undefined,
    });

    setNote("");
    setSuccessMsg("尿酸値の数値を記録しました！");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const totalLogs = logs.length;
  const highestValue = logs.length > 0 ? Math.max(...logs.map((l) => l.value)) : 0;
  const lowestValue = logs.length > 0 ? Math.min(...logs.map((l) => l.value)) : 0;

  // Calculate decrease if they have at least 2 logs
  const hasDecrease = sortedLogs.length >= 2;
  const firstValue = sortedLogs[0]?.value || 0;
  const decreaseValue = firstValue - latestValue;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      
      {/* LEFT COLUMN - Chart & Stats Scorecard (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Statistics Scorecards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <span className="text-slate-400 font-medium text-[10px] block uppercase tracking-wider">
              現在の尿酸値
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-2xl font-black font-mono ${latestValue >= 7.0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {latestValue ? latestValue.toFixed(1) : "---"}
              </span>
              <span className="text-slate-400 text-xs">mg/dL</span>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm inline-block mt-2 border ${
              latestValue >= 7.0 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
            }`}>
              {latestValue >= 7.0 ? "高尿酸血症 (注意)" : "正常範囲内"}
            </span>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <span className="text-slate-400 font-medium text-[10px] block uppercase tracking-wider">
              最高値 vs 最低値
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold font-mono text-red-400">{highestValue ? highestValue.toFixed(1) : "---"}</span>
              <span className="text-slate-300 text-[10px]">/</span>
              <span className="text-lg font-bold font-mono text-emerald-500">{lowestValue ? lowestValue.toFixed(1) : "---"}</span>
              <span className="text-slate-400 text-xs ml-0.5">mg/dL</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2.5">過去の検査レンジ</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-slate-400 font-medium text-[10px] block uppercase tracking-wider">
              改善の成果
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              {hasDecrease && decreaseValue > 0 ? (
                <>
                  <span className="text-2xl font-black font-mono text-emerald-600 flex items-center">
                    <TrendingDown className="w-5 h-5 mr-0.5 inline" />
                    -{decreaseValue.toFixed(1)}
                  </span>
                  <span className="text-slate-400 text-xs">mg/dL</span>
                </>
              ) : (
                <span className="text-lg font-bold text-slate-400 font-mono">
                  継続測定中
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-2.5">
              {hasDecrease && decreaseValue > 0 ? "初回測定からの低下量" : "2回目以降の測定で成果表示"}
            </p>
          </div>
        </div>

        {/* Embedded Custom SVG Chart */}
        <CustomChart logs={logs} onDeleteLog={onDeleteLog} />
      </div>

      {/* RIGHT COLUMN - Add New Log Form (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">新規尿酸値を記録</h3>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            健康診断や病院の血液検査で測定した尿酸値（Uric Acid）を入力してください。
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">測定日</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">尿酸値 (mg/dL)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="2.0"
                  max="15.0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-sm text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  mg/dL
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">測定時の状態・メモ</label>
              <input
                type="text"
                placeholder="例: 定期健診、痛風外来、発作から2週間後"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {successMsg && (
              <div className="text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-sm text-xs text-center font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              数値を記録する
            </button>
          </form>
        </div>

        {/* Clinical Info Box */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 space-y-3">
          <div className="flex items-start gap-2 text-blue-800">
            <Info className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
            <span className="font-semibold text-xs">尿酸値についての医学的知識</span>
          </div>
          <ul className="text-[11px] text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
            <li>
              血中尿酸濃度が <strong className="text-slate-800">7.0 mg/dL</strong> を超えると「高尿酸血症」と診断されます。
            </li>
            <li>
              この状態が続くと関節内で尿酸が結晶化し、突然激しい痛みをもたらす「痛風発作」を引き起こします。
            </li>
            <li>
              治療ガイドラインでは、痛風を予防するために薬物療法や生活習慣の改善によって尿酸値を <strong className="text-emerald-600">6.0 mg/dL以下</strong> にコントロールし続けることが推奨されます。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
