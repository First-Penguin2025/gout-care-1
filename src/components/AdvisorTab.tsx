import React, { useState } from "react";
import { MealLog } from "../types";
import { 
  Search, 
  Check,
  Plus,
  Utensils,
  BookmarkPlus,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  purineDatabase, 
  PurineFoodItem, 
  getPurineLevelBadgeColor, 
  getPurineLevelJapanese 
} from "../data/purineDatabase";

interface AdvisorTabProps {
  onAddMealToToday: (meal: MealLog) => void;
}

export default function AdvisorTab({ onAddMealToToday }: AdvisorTabProps) {
  // --- 1. Purine Database States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [selectedFood, setSelectedFood] = useState<PurineFoodItem | null>(purineDatabase[0]);
  
  // Custom meal log adding states
  const [portionScale, setPortionScale] = useState<number>(1); // multiplier (0.5, 1, 1.5, 2 etc.)
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manual fallback input if user wants to add custom food directly
  const [manualFoodName, setManualFoodName] = useState("");
  const [manualFoodLevel, setManualFoodLevel] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [manualFoodMg, setManualFoodMg] = useState<string>("");
  const [isAddingManual, setIsAddingManual] = useState(false);

  // --- 2. Search Filter Logic ---
  const filteredDatabase = purineDatabase.filter((item) => {
    // Search Term match (fuzzy lowercase)
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category match
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    
    // Level match
    const matchesLevel = selectedLevel === "ALL" || item.purineLevel === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Handle adding pre-defined food to today's meal logs
  const handleAddFoodToLog = (item: PurineFoodItem, scale: number = 1) => {
    // Calculate estimated purine in mg for this portion
    const calculatedMg = Math.round(item.purineMg * scale);
    const scaledName = scale === 1 ? item.name : `${item.name} (${scale}人前)`;

    const meal: MealLog = {
      id: `food-${Date.now()}-${item.id}`,
      name: scaledName,
      purineLevel: item.purineLevel,
      purineMg: calculatedMg
    };

    onAddMealToToday(meal);
    
    // Trigger UI success state
    setLastAddedId(item.id);
    setSuccessMessage(`「${scaledName}」を本日の食事ログに追加しました！`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
      setLastAddedId(null);
    }, 3000);
  };

  // Handle manual direct entry of food
  const handleAddManualFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFoodName.trim()) return;

    const mgValue = manualFoodMg === "" ? undefined : parseInt(manualFoodMg);

    const meal: MealLog = {
      id: `manual-food-${Date.now()}`,
      name: manualFoodName.trim(),
      purineLevel: manualFoodLevel,
      purineMg: mgValue !== undefined && !isNaN(mgValue) ? mgValue : (manualFoodLevel === "LOW" ? 25 : manualFoodLevel === "MEDIUM" ? 100 : 250)
    };

    onAddMealToToday(meal);
    
    setSuccessMessage(`「${manualFoodName}」を手動で食事ログに追加しました！`);
    setManualFoodName("");
    setManualFoodMg("");
    setIsAddingManual(false);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* SUCCESS / ACTION TOAST NOTIFICATION */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 border border-emerald-500"
          >
            <Check className="w-4 h-4 bg-white text-emerald-600 rounded-full p-0.5" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col space-y-6">
        
        {/* ======================================================== */}
        {/* COMPACT PURINE DICTIONARY & LOGGING (Full Width) */}
        {/* ======================================================== */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs flex-1 flex flex-col min-h-[600px]">
          <div className="flex justify-between items-start gap-4 mb-4 flex-wrap sm:flex-nowrap">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-600" />
                プリン体検索図鑑
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                100種類以上の身近な食材やお酒のプリン体含有量（100gあたり）を瞬時に検索・確認し、ワンクリックで本日の食事ログに登録できます。
              </p>
            </div>
            <button 
              onClick={() => setIsAddingManual(!isAddingManual)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium border transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                isAddingManual 
                  ? "bg-slate-100 border-slate-300 text-slate-700" 
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              {isAddingManual ? "閉じる" : "手動で食事を追加"}
            </button>
          </div>

          {/* MANUAL FOOD INPUT FALLBACK */}
          {isAddingManual && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddManualFood}
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 space-y-3"
            >
              <p className="text-xs font-bold text-slate-600 border-b border-slate-200 pb-1.5 flex items-center gap-1">
                <BookmarkPlus className="w-3.5 h-3.5 text-blue-500" />
                データベースにない食材・メニューの手動登録
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">食材・メニュー名</label>
                  <input 
                    type="text" 
                    placeholder="例: たこ焼き、オムライスなど" 
                    value={manualFoodName}
                    onChange={(e) => setManualFoodName(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">目安プリン体量 (mg)</label>
                  <input 
                    type="number" 
                    placeholder="未入力時はリスク度基準で自動計算" 
                    value={manualFoodMg}
                    onChange={(e) => setManualFoodMg(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-1.5">
                <div className="flex gap-1">
                  <span className="text-[11px] font-semibold text-slate-500 self-center mr-2">リスク度:</span>
                  {(["LOW", "MEDIUM", "HIGH"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setManualFoodLevel(lvl)}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold border transition-colors cursor-pointer ${
                        manualFoodLevel === lvl 
                          ? getPurineLevelBadgeColor(lvl) + " ring-1 ring-offset-1 ring-slate-400"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {lvl === "LOW" ? "低" : lvl === "MEDIUM" ? "中" : "高"}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-1.5 rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  食事ログに登録
                </button>
              </div>
            </motion.form>
          )}

          {/* SEARCH AND FILTERS */}
          <div className="space-y-3 mb-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="食材や料理、カテゴリをリアルタイム検索（例: レバー、ビール、豆腐など）"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-xs focus:outline-hidden"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters row: Category & Level */}
            <div className="flex flex-col gap-2">
              {/* Categories */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">カテゴリで絞り込み:</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: "ALL", label: "すべて" },
                    { id: "肉類・卵", label: "肉類・卵" },
                    { id: "魚介類・海産物", label: "魚介・海藻" },
                    { id: "野菜・キノコ・豆", label: "野菜・キノコ・豆" },
                    { id: "主食", label: "主食" },
                    { id: "お酒・飲料", label: "飲料・お酒" },
                    { id: "その他・おつまみ", label: "その他" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">プリン体含有リスクで絞り込み:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { id: "ALL", label: "すべて" },
                    { id: "LOW", label: "低（0〜100mg未満）" },
                    { id: "MEDIUM", label: "中（100〜200mg）" },
                    { id: "HIGH", label: "高（200mg以上・危険）" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-semibold border transition-colors cursor-pointer ${
                        selectedLevel === lvl.id
                          ? lvl.id === "LOW" ? "bg-emerald-600 text-white border-emerald-600" :
                            lvl.id === "MEDIUM" ? "bg-amber-500 text-white border-amber-500" :
                            "bg-rose-600 text-white border-rose-600"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS LIST & DETAILS SCREEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            
            {/* RESULTS LIST */}
            <div className="border border-slate-100 rounded-lg overflow-y-auto max-h-[500px] bg-slate-50/50 p-2 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 px-2 pb-1.5 border-b border-slate-100 flex justify-between">
                <span>検索結果（{filteredDatabase.length}件）</span>
                <span>項目名クリックで詳細表示</span>
              </div>
              {filteredDatabase.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-md border border-slate-100">
                  該当する食材が見つかりませんでした。
                  {searchTerm && (
                    <p className="mt-2 text-[11px] text-slate-500">
                      「手動で食事を追加」ボタンより、直接ログに記録するか、検索ワードを変えてお試しください。
                    </p>
                  )}
                </div>
              ) : (
                filteredDatabase.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedFood(item);
                      setPortionScale(1);
                    }}
                    className={`p-2.5 rounded-md border text-left transition-all flex justify-between items-center cursor-pointer ${
                      selectedFood?.id === item.id
                        ? "bg-blue-50/70 border-blue-200 shadow-2xs"
                        : "bg-white border-slate-150 hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                        <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex gap-2 text-[10px] text-slate-500 items-center">
                        <span>100g中: <strong className="font-mono font-bold text-slate-700">{item.purineMg}mg</strong></span>
                        <span>•</span>
                        <span className="text-slate-400">目安: {item.portion || "100g"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${getPurineLevelBadgeColor(item.purineLevel)}`}>
                        {item.purineLevel === "LOW" ? "低" : item.purineLevel === "MEDIUM" ? "中" : "高"}
                      </span>
                      
                      <button
                        onClick={() => handleAddFoodToLog(item, 1)}
                        className={`p-1 rounded-md border transition-all cursor-pointer ${
                          lastAddedId === item.id
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "bg-slate-50 hover:bg-blue-600 hover:text-white border-slate-200 hover:border-blue-600"
                        }`}
                        title="1人前を今日に記録"
                      >
                        {lastAddedId === item.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ACTIVE FOOD DETAILS PANEL */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex flex-col justify-between max-h-[500px] overflow-y-auto">
              {selectedFood ? (
                <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Badge */}
                    <div className="border-b border-slate-200 pb-2 mb-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{selectedFood.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${getPurineLevelBadgeColor(selectedFood.purineLevel)}`}>
                          {getPurineLevelJapanese(selectedFood.purineLevel)}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold inline-block mt-1">
                        分類: {selectedFood.category}
                      </span>
                    </div>

                    {/* Nutrient highlight */}
                    <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded border border-slate-150 mb-3">
                      <div className="text-center border-r border-slate-100">
                        <span className="text-[9px] text-slate-400 block font-medium">100gあたりの量</span>
                        <span className="font-mono text-base font-extrabold text-slate-800">{selectedFood.purineMg}<span className="text-xs font-normal text-slate-500 ml-0.5">mg</span></span>
                      </div>
                      <div className="text-center">
                        <span className="text-[9px] text-slate-400 block font-medium">標準的な1人前</span>
                        <span className="text-xs font-semibold text-slate-700 block mt-1 truncate">{selectedFood.portion || "100g"}</span>
                      </div>
                    </div>

                    {/* Advice box */}
                    <div className="space-y-1.5 bg-white p-3 rounded border border-slate-150 text-xs text-slate-600 leading-relaxed shadow-3xs">
                      <p className="font-bold text-slate-800 text-[11px] flex items-center gap-1 text-blue-700">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        食事管理アドバイス：
                      </p>
                      <p className="text-[11px] leading-relaxed">{selectedFood.advice}</p>
                    </div>

                    {/* Alternatives list */}
                    {selectedFood.alternatives.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">💡 代替・おすすめの安全な選択肢:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedFood.alternatives.map((alt, idx) => (
                            <span 
                              key={idx}
                              className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-semibold"
                            >
                              {alt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Add with Portions */}
                  <div className="border-t border-slate-200 pt-3 mt-3 bg-white/70 p-3 rounded border border-slate-150/50">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] font-bold text-slate-600">追加する量を選択して登録:</span>
                      <span className="text-xs font-bold font-mono text-blue-700">{portionScale}人前</span>
                    </div>
                    
                    {/* Portion control buttons */}
                    <div className="flex gap-1.5 mb-2.5">
                      {[0.5, 1, 1.5, 2].map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => setPortionScale(sc)}
                          className={`flex-1 text-[11px] font-bold py-1 rounded border transition-all cursor-pointer ${
                            portionScale === sc
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {sc === 0.5 ? "半分 (0.5)" : sc === 1 ? "1人前" : `${sc}人前`}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleAddFoodToLog(selectedFood, portionScale)}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-xs py-2 rounded-md shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      この量で食事ログに追加する
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-slate-400 text-xs py-10">
                  <p>左の検索結果から食材を選択してください。</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
