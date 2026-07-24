import { useRef, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  lifetime: number;
  maxLifetime: number;
}

interface RippleGlowProps {
  children: ReactNode;
  className?: string;
  color?: string; // màu glow, mặc định trắng cho hợp với nước
}

function RippleGlow({
  children,
  className = "",
  color = "rgba(255,255,255,0.6)",
}: RippleGlowProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number | null>(null);

  // Vẽ 1 frame: mỗi ripple là 1 vòng tròn glow mờ dần, không cần texture ảnh
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripplesRef.current.forEach((r) => {
      r.radius += r.maxRadius / 20;
      r.lifetime += 1;
      const opacity = Math.max(0, 1 - r.lifetime / r.maxLifetime);
      if (opacity <= 0) return;

      // Vẽ 1 vòng tròn viền mờ dần - đây chính là "gợn sóng" nhưng
      // không cần lấy pixel từ đâu cả, chỉ vẽ hình tròn có gradient
      const gradient = ctx.createRadialGradient(
        r.x,
        r.y,
        Math.max(r.radius - 6, 0),
        r.x,
        r.y,
        r.radius,
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(
        0.5,
        color.replace(/[\d.]+\)$/, `${opacity * 0.5})`),
      );
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    ripplesRef.current = ripplesRef.current.filter(
      (r) => r.lifetime < r.maxLifetime,
    );

    if (ripplesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      rafRef.current = null;
    }
  }, [color]);

  const addRipple = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(rect.width, rect.height),
        lifetime: 0,
        maxLifetime: 40,
      });
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw);
    },
    [draw],
  );

  // Đồng bộ kích thước canvas với wrapper
  useEffect(() => {
    const resize = () => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
      }}
      onMouseDown={addRipple}
    >
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default RippleGlow;
