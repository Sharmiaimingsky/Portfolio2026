import { useEffect, useRef } from 'react';

export default function AvatarScene() {
  const imgRef = useRef<HTMLImageElement>(null);
  const rotX = useRef(0);
  const rotY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const hasMouseMoved = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const img = imgRef.current;
      if (!img) return;
      hasMouseMoved.current = true;
      const rect = img.getBoundingClientRect();

      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.38;

      const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);

      // Clamp to prevent flipping past ±90deg
      targetY.current = Math.max(-18, Math.min(18, dx * 18));
      targetX.current = Math.max(-12, Math.min(12, -dy * 12));
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      rafId.current = requestAnimationFrame(animate);

      if (!hasMouseMoved.current) return;

      rotX.current += (targetX.current - rotX.current) * 0.08;
      rotY.current += (targetY.current - rotY.current) * 0.08;

      const img = imgRef.current;
      if (img) {
        img.style.transform = `perspective(700px) rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
      }
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-end justify-center relative">
      {/* Neon glow behind avatar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 52% 52%, rgba(57,255,20,0.1) 0%, rgba(255,107,0,0.06) 40%, transparent 70%)',
        }}
      />

      <img
        ref={imgRef}
        src="/avatar.png"
        alt="Sharmistha Chakraborty"
        className="relative z-10 w-full h-full object-contain object-bottom select-none"
        style={{
          mixBlendMode: 'lighten',
          filter: 'drop-shadow(0 0 32px rgba(57,255,20,0.18)) drop-shadow(0 0 80px rgba(255,107,0,0.12))',
          transformOrigin: '50% 35%',
          willChange: 'transform',
          transform: 'perspective(700px) rotateX(0deg) rotateY(0deg)',
        }}
        draggable={false}
      />
    </div>
  );
}
