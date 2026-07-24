import "./WaveEffect.css";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;

  /** màu nền */
  color?: string;

  /** chiều cao nếu dùng làm background */
  height?: string | number;
};

export default function WaveEffect({
  children,
  className = "",
  color = "#3b82f6",
  height = "100%",
}: Props) {
  return (
    <div
      className={`wave-container ${className}`}
      style={{
        background: color,
        height,
      }}
    >
      <div className="wave wave1" />
      <div className="wave wave2" />

      <div className="wave-content">{children}</div>
    </div>
  );
}
