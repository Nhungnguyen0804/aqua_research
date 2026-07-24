import "./WaterWaveEffect.css";
import React, { useEffect, useRef, useState, useCallback } from "react";

import type { ReactNode } from "react";
/*
khi hover/chạm vào sẽ hiện hiệu ứng "gợn sóng nước"
card = bọc ảnh + caption
background = fill + ko cần bọc và caption 



*/

// chuột move => đ gợn sóng
interface RipplePoint {
  x: number;
  y: number;
  radius: number; // bán kính hiện tại của vòng sóng (tăng dần theo thời gian)
  maxRadius: number; // bán kính tối đa trước khi vòng sóng biến mất
  strength: number; // biên độ lệch (độ "méo" ảnh) của vòng sóng
  lifetime: number; // thời gian đã tồn tại
  maxLifetime: number; // thời gian sống tối đa, hết thì bị loại bỏ
}

export interface LiquidRippleCardProps {
  imageSrc: string;
  imageAlt?: string;
  children?: ReactNode; /** Nội dung phủ lên trên ảnh, ví dụ caption, tiêu đề, nút bấm... */
  strength?: number; /** Độ mạnh của gợn sóng (biên độ lệch ảnh)*/
  radius?: number; /** Kích thước / bán kính lan toả của mỗi gợn sóng */
  speed?: number; /** Tốc độ lan toả & tắt dần của gợn sóng*/
  fill?: boolean; /** true = chiếm toàn bộ phần tử cha ( background) */
  disableEffect?: boolean; /** Tắt hẳn hiệu ứng (user bật "giảm chuyển động") */
  onClick?: () => void; /* Bấm vào card để gọi callback (vd mở lightbox) */
  className?: string;
}

const LiquidRippleCard = ({
  imageSrc,
  imageAlt = "",
  children,
  strength = 2,
  radius = 20,
  speed = 1.5,
  fill = false,
  disableEffect = false,
  onClick,
  className = "",
}: LiquidRippleCardProps) => {
  const MAX_RIPPLES = 8;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Canvas "texture" ẩn, giữ bản chụp lại của ảnh gốc để lấy màu khi vẽ lệch pixel
  const textureRef = useRef<HTMLCanvasElement | null>(null);

  // Danh sách các gợn sóng đang hoạt động + trạng thái animation
  const pointsRef = useRef<RipplePoint[]>([]);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const animatingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);

  // Cấu hình hiện tại, giữ trong ref để animation loop luôn đọc giá trị mới nhất
  const configRef = useRef({ strength, radius, speed });
  useEffect(() => {
    configRef.current = { strength, radius, speed };
  }, [strength, radius, speed]);

  // ---- Đồng bộ kích thước canvas & texture theo kích thước thật của container ----
  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!container || !canvas || !img) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // Vẽ lại texture (bản sao ảnh) mỗi khi resize để tỉ lệ luôn khớp canvas
    if (img.complete && img.naturalWidth > 0) {
      const texture = document.createElement("canvas");
      texture.width = width;
      texture.height = height;
      const tctx = texture.getContext("2d");
      tctx?.drawImage(img, 0, 0, width, height);
      textureRef.current = texture;
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ---- Vòng lặp animation: vẽ từng vòng gợn sóng bằng cách lệch pixel dọc theo ring ----
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const texture = textureRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !texture) {
      rafIdRef.current = requestAnimationFrame(animate);
      return;
    }
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { speed: spd } = configRef.current;
    const points = pointsRef.current;

    for (const point of points) {
      point.radius += (point.maxRadius / 30) * spd;
      point.lifetime += 1 * spd;

      const lifeRatio = point.lifetime / point.maxLifetime;
      const opacity = Math.max(0, 1 - lifeRatio);
      const amp = point.strength * opacity;
      if (amp <= 0.02) continue;

      // Thay vì quét toàn bộ canvas (rất tốn), chỉ vẽ dọc theo VÒNG (ring)
      // hiện tại của gợn sóng: quét theo góc 0 -> 2π, mỗi góc lấy vài bán kính
      // quanh point.radius để tạo dải sóng có độ dày ~ 10px.
      const circumference = 2 * Math.PI * Math.max(point.radius, 1);
      const angleStep = Math.max(0.02, 6 / circumference); // ~6px giữa các mẫu

      for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
        for (let rOffset = -8; rOffset <= 8; rOffset += 2) {
          const r = point.radius + rOffset;
          if (r < 0) continue;

          const x = point.x + r * Math.cos(angle);
          const y = point.y + r * Math.sin(angle);
          if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height)
            continue;

          // Độ lệch pixel dạng sóng sin, mô phỏng khúc xạ ánh sáng qua mặt nước
          const wave = Math.sin(r / 5 - point.lifetime / 3) * 10 * amp;
          const ox = wave * Math.cos(angle);
          const oy = wave * Math.sin(angle);

          ctx.drawImage(texture, x, y, 2, 2, x + ox, y + oy, 2, 2);
        }
      }
    }

    // Loại bỏ các gợn sóng đã hết vòng đời
    pointsRef.current = points.filter((p) => p.lifetime < p.maxLifetime);

    if (animatingRef.current || pointsRef.current.length > 0) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      rafIdRef.current = null;
    }
  }, []);

  const ensureAnimating = useCallback(() => {
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // ---- Sự kiện chuột: thêm 1 gợn sóng mới khi di chuyển đủ xa điểm trước ----
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableEffect || !isReady) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 8) return; // tránh tạo quá nhiều điểm liên tiếp
      if (pointsRef.current.length >= MAX_RIPPLES) {
        pointsRef.current.shift();
      }
      const { strength: str, radius: rad, speed: spd } = configRef.current;
      pointsRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: rad,
        strength: str,
        lifetime: 0,
        maxLifetime: 100 * spd,
      });
      lastPointRef.current = { x, y };
      ensureAnimating();
    },
    [disableEffect, isReady, ensureAnimating],
  );

  const handleMouseEnter = useCallback(() => {
    animatingRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    animatingRef.current = false;
  }, []);

  // Dọn dẹp animation frame khi unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const rootClassName = [
    "lrc-root",
    fill ? "lrc-root--fill" : "lrc-root--card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="lrc-image-wrap">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          className="lrc-image"
          onLoad={resizeCanvas}
        />
        {/* Canvas vẽ hiệu ứng gợn sóng, chỉ hiện opacity khi hover (xem CSS) */}
        <canvas ref={canvasRef} className="lrc-canvas" aria-hidden="true" />
      </div>

      {/* Nội dung phủ lên trên (caption, tiêu đề, nút...) */}
      {children && <div className="lrc-overlay">{children}</div>}
    </div>
  );
};

export default LiquidRippleCard;
