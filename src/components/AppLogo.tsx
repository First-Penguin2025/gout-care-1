import React from "react";

// ==========================================
// 💡 【左上ロゴの設定】
// ==========================================
// プロジェクトの `public/logo.png` を直接参照して表示します。
export const LOGO_IMAGE_URL = "/logo.png";

interface AppLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <img
      src={LOGO_IMAGE_URL}
      alt="Gout Care ー痛風改善サポートー ロゴ"
      className={className || "w-12 h-12 rounded-xl object-contain shadow-sm transition-all hover:scale-105 cursor-pointer"}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

