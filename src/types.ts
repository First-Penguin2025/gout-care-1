export interface MealLog {
  id: string;
  name: string;
  purineLevel: "LOW" | "MEDIUM" | "HIGH";
  purineMg?: number;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  waterIntake: number; // in ml
  alcoholCups: number; // number of drinks/glasses
  alcoholType: string; // "beer" | "sake" | "highball" | "none" | etc.
  medicationTaken: boolean;
  medicationMorning?: boolean;
  medicationAfternoon?: boolean;
  medicationEvening?: boolean;
  medicationNight?: boolean;
  painLevel: number; // 0 (none) to 10 (intense attack)
  weight?: number; // in kg
  uricAcid?: number; // Uric acid level for the day
  clinicResult?: string; // Today's clinic diagnosis result
  notes?: string;
  meals: MealLog[];
}

export interface UricAcidLog {
  id: string;
  date: string; // YYYY-MM-DD
  value: number; // mg/dL (e.g., 7.5)
  note?: string;
}

export interface UserProfile {
  name: string;
  diagnosedDate: string; // YYYY-MM-DD
  targetWater: number; // in ml, default 2000
  hasPrescribedMeds: boolean;
  height?: number; // in cm
  weight?: number; // in kg
  uricAcid?: number; // in mg/dL
  notes?: string;
  alarms?: AlarmSetting[];
}

export interface AlarmSetting {
  id: string;
  time: string; // "HH:MM"
  label: string;
  enabled: boolean;
  soundEnabled: boolean;
  notificationEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface PurineAnalysisResult {
  food: string;
  purineLevel: "LOW" | "MEDIUM" | "HIGH";
  purineMg: number;
  advice: string;
  alternatives: string[];
}
