import { useState } from "react";
import { UricAcidLog } from "../types";

interface CustomChartProps {
  logs: UricAcidLog[];
  onDeleteLog: (id: string) => void;
}

export default function CustomChart({ logs, onDeleteLog }: CustomChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sort logs by date ascending
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const width = 600;
  const height = 280;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  // Uric acid values typically range from 4.0 to 10.0 in gout patients
  const minY = 4.0;
  const maxY = 10.0;

  const getX = (index: number) => {
    if (sortedLogs.length <= 1) return paddingLeft + (width - paddingLeft - paddingRight) / 2;
    return (
      paddingLeft +
      (index / (sortedLogs.length - 1)) * (width - paddingLeft - paddingRight)
    );
  };

  const getY = (val: number) => {
    // Clamp values between minY and maxY for visual stability
    const clamped = Math.min(Math.max(val, minY), maxY);
    const range = maxY - minY;
    const ratio = (clamped - minY) / range;
    return height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
  };

  // Generate grid values
  const yGridValues = [4, 5, 6, 7, 8, 9, 10];

  // Path data for the uric acid curve
  const points = sortedLogs.map((log, i) => `${getX(i)},${getY(log.value)}`);
  const pathD = points.length > 0 ? `M ${points.join(" L ")}` : "";

  // Normal / high status check
  const latestVal = sortedLogs[sortedLogs.length - 1]?.value || 0;
  const isHigh = latestVal >= 7.0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            尿酸値の推移グラフ
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            医療機関での検査結果（目標: 7.0 mg/dL未満）
          </p>
        </div>
        
        <div className="flex gap-4 text-xs font-mono">
          <div className="bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">最新の測定値</span>
            <span className={`text-base font-bold ${isHigh ? 'text-red-500' : 'text-emerald-500'}`}>
              {latestVal ? `${latestVal.toFixed(1)} mg/dL` : "未測定"}
            </span>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">最高値記録</span>
            <span className="text-base font-bold text-slate-700">
              {logs.length > 0 ? `${Math.max(...logs.map(l => l.value)).toFixed(1)} mg/dL` : "0.0"}
            </span>
          </div>
        </div>
      </div>

      {sortedLogs.length === 0 ? (
        <div className="h-[280px] flex flex-col items-center justify-center bg-slate-50 rounded-md border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">尿酸値の記録がありません。</p>
          <p className="text-slate-400 text-xs mt-1">健康診断や通院の数値を記録しましょう。</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <div className="min-w-[600px] mx-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              {/* Grid Lines */}
              {yGridValues.map((val) => {
                const y = getY(val);
                const isThresh = val === 7;
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke={isThresh ? "#ef4444" : "#f1f5f9"}
                      strokeWidth={isThresh ? 1.5 : 1}
                      strokeDasharray={isThresh ? "4 4" : "0"}
                    />
                    <text
                      x={paddingLeft - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="font-mono text-[10px] fill-slate-400"
                    >
                      {val.toFixed(1)}
                    </text>
                    {isThresh && (
                      <text
                        x={width - paddingRight - 4}
                        y={y - 6}
                        textAnchor="end"
                        className="font-sans text-[10px] font-semibold fill-red-500 bg-white"
                      >
                        高尿酸血症の基準値 (7.0 mg/dL)
                      </text>
                    )}
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {sortedLogs.map((log, i) => {
                const x = getX(i);
                // Simplify date display to MM/DD
                const parts = log.date.split("-");
                const label = parts.length >= 3 ? `${parts[1]}/${parts[2]}` : log.date;
                return (
                  <text
                    key={log.id}
                    x={x}
                    y={height - 15}
                    textAnchor="middle"
                    className="font-mono text-[10px] fill-slate-400"
                  >
                    {label}
                  </text>
                );
              })}

              {/* Area under curve (Gradient) */}
              {points.length > 1 && (
                <path
                  d={`${pathD} L ${getX(sortedLogs.length - 1)},${height - paddingBottom} L ${getX(0)},${height - paddingBottom} Z`}
                  fill="url(#chartGradient)"
                  opacity="0.1"
                />
              )}

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Line */}
              {points.length > 1 && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {sortedLogs.map((log, i) => {
                const x = getX(i);
                const y = getY(log.value);
                const isPointHovered = hoveredIndex === i;
                const pointColor = log.value >= 7.0 ? "#ef4444" : "#10b981";

                return (
                  <g
                    key={log.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* Ring on hover */}
                    {isPointHovered && (
                      <circle
                        cx={x}
                        cy={y}
                        r={10}
                        fill={pointColor}
                        opacity={0.2}
                        className="transition-all duration-150"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={5}
                      fill="white"
                      stroke={pointColor}
                      strokeWidth={3}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Dynamic Tooltip Overlay (HTML absolute position) */}
          {hoveredIndex !== null && sortedLogs[hoveredIndex] && (
            <div
              className="absolute bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-sm text-xs shadow-lg border border-slate-800 transition-all duration-150 z-10 font-sans pointer-events-none"
              style={{
                left: `${getX(hoveredIndex) + 20}px`,
                top: `${getY(sortedLogs[hoveredIndex].value) - 20}px`,
                transform: "translate(-10%, -100%)",
              }}
            >
              <div className="font-mono text-slate-400 mb-0.5">
                {sortedLogs[hoveredIndex].date}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-sky-400 font-mono">
                  {sortedLogs[hoveredIndex].value.toFixed(1)} mg/dL
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-sm text-[9px] font-semibold ${
                    sortedLogs[hoveredIndex].value >= 7.0
                      ? "bg-red-500/20 text-red-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {sortedLogs[hoveredIndex].value >= 7.0 ? "基準値超え" : "正常値"}
                </span>
              </div>
              {sortedLogs[hoveredIndex].note && (
                <div className="text-slate-300 mt-1 border-t border-slate-800 pt-1 text-[11px] leading-relaxed">
                  {sortedLogs[hoveredIndex].note}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mini tabular view of historical records below graph */}
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">測定履歴一覧</h4>
        <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-md divide-y divide-slate-200">
          {sortedLogs.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">履歴がまだありません。</div>
          ) : (
            [...sortedLogs].reverse().map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500">{log.date}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-700 font-medium">{log.note || "定期検査"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-mono font-bold text-sm ${log.value >= 7.0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {log.value.toFixed(1)} mg/dL
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("この記録を削除してもよろしいですか？")) {
                        onDeleteLog(log.id);
                      }
                    }}
                    className="text-slate-300 hover:text-red-500 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="削除"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
