import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
}

interface Drop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  color: string;
  size: number;
  rotation: number;
  spin: number;
}

const RAINBOW = [
  '#ff4d6d', '#ff6b35', '#ffbe0b', '#06d6a0',
  '#00bbf9', '#7df9ff', '#8cc8ff', '#c77dff',
  '#ff70a6', '#ff9f1c',
];

function rainbowAt(t: number): string {
  const i = Math.floor(t) % RAINBOW.length;
  return RAINBOW[(i + RAINBOW.length) % RAINBOW.length];
}

// Draw a 4-pointed star at (cx, cy) with outer radius r
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, rotation: number) {
  const inner = r * 0.35;
  const points = 4;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points + rotation;
    const radius = i % 2 === 0 ? r : inner;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -200, y: -200 });
  const prevPos = useRef({ x: -200, y: -200 });
  const smoothPos = useRef({ x: -200, y: -200 });
  const trail = useRef<TrailPoint[]>([]);
  const drops = useRef<Drop[]>([]);
  const sparkles = useRef<Sparkle[]>([]);
  const rafId = useRef<number>(0);
  const hue = useRef(0);
  const speed = useRef(0);
  const frameCount = useRef(0);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    document.body.style.cursor = 'none';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      prevPos.current = { ...pos.current };
      pos.current = { x: e.clientX, y: e.clientY };

      const dx = pos.current.x - prevPos.current.x;
      const dy = pos.current.y - prevPos.current.y;
      speed.current = Math.sqrt(dx * dx + dy * dy);

      hue.current += 0.18 + speed.current * 0.04;

      const color = rainbowAt(hue.current * 0.4);

      const count = speed.current > 12 ? 2 : 1;
      for (let k = 0; k < count; k++) {
        const jitter = speed.current * 0.08;
        trail.current.push({
          x: e.clientX + (Math.random() - 0.5) * jitter,
          y: e.clientY + (Math.random() - 0.5) * jitter,
          age: 0,
          color,
          size: 3 + speed.current * 0.18,
        });
      }

      // Spawn sparkles — more frequently when moving fast
      const sparkChance = speed.current > 8 ? 0.55 : 0.22;
      if (Math.random() < sparkChance) {
        const sparkColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
        const angle = Math.random() * Math.PI * 2;
        const spd = 0.6 + Math.random() * 2.2;
        sparkles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 0.8,  // slight upward bias
          age: 0,
          life: 22 + Math.floor(Math.random() * 18),
          color: sparkColor,
          size: 2.5 + Math.random() * 3.5,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.3,
        });
      }

      const target = e.target as HTMLElement;
      const label = target.closest('[data-cursor]')?.getAttribute('data-cursor') || '';
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? '1' : '0';
      }
    };

    const onClick = (e: MouseEvent) => {
      // Burst of sparkles on click
      for (let i = 0; i < 12; i++) {
        const sparkColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
        const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
        const spd = 1.5 + Math.random() * 3.5;
        sparkles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          age: 0,
          life: 30 + Math.floor(Math.random() * 20),
          color: sparkColor,
          size: 3 + Math.random() * 4,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.4,
        });
      }

      for (let i = 0; i < 3; i++) {
        drops.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          radius: 2 + i * 2,
          maxRadius: 28 + i * 18,
          alpha: 0.7 - i * 0.15,
          color: RAINBOW[(Math.floor(hue.current * 0.4) + i * 3) % RAINBOW.length],
        });
      }
    };

    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
    };
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();
    const mutObs = new MutationObserver(addListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    const TRAIL_MAX = 42;
    const TRAIL_LIFE = 38;

    const animate = () => {
      rafId.current = requestAnimationFrame(animate);
      frameCount.current++;

      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.18;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
        const dotColor = rainbowAt(hue.current * 0.4);
        dotRef.current.style.background = dotColor;
        dotRef.current.style.boxShadow = `0 0 8px ${dotColor}, 0 0 18px ${dotColor}`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${smoothPos.current.x}px`;
        ringRef.current.style.top = `${smoothPos.current.y}px`;
        const ringColor = rainbowAt(hue.current * 0.4 + 2);
        ringRef.current.style.borderColor = ringColor + '55';
        ringRef.current.style.boxShadow = `0 0 10px ${ringColor}33`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Ink drops ─────────────────────────────────────────────
      drops.current = drops.current.filter((d) => d.alpha > 0.01);
      for (const d of drops.current) {
        d.radius += (d.maxRadius - d.radius) * 0.12;
        d.alpha *= 0.88;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.strokeStyle = d.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = d.alpha;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 14;
        ctx.stroke();
      }

      // ── Trail ──────────────────────────────────────────────────
      for (const pt of trail.current) pt.age++;
      trail.current = trail.current.filter((pt) => pt.age < TRAIL_LIFE);
      if (trail.current.length > TRAIL_MAX) {
        trail.current.splice(0, trail.current.length - TRAIL_MAX);
      }

      for (const pt of trail.current) {
        const life = 1 - pt.age / TRAIL_LIFE;
        const r = pt.size * life * 1.4;
        if (r < 0.5) continue;
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        grad.addColorStop(0, pt.color + 'ff');
        grad.addColorStop(0.45, pt.color + 'cc');
        grad.addColorStop(1, pt.color + '00');
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = life * 0.72;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      // ── Connecting line ────────────────────────────────────────
      if (trail.current.length > 2) {
        const len = trail.current.length;
        for (let i = Math.max(0, len - 18); i < len - 1; i++) {
          const a = trail.current[i];
          const b = trail.current[i + 1];
          const lifeA = 1 - a.age / TRAIL_LIFE;
          const lifeB = 1 - b.age / TRAIL_LIFE;
          const avg = (lifeA + lifeB) * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = b.color;
          ctx.lineWidth = avg * 3.5;
          ctx.globalAlpha = avg * 0.55;
          ctx.lineCap = 'round';
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 12;
          ctx.stroke();
        }
      }

      // ── Sparkles ───────────────────────────────────────────────
      sparkles.current = sparkles.current.filter((s) => s.age < s.life);
      for (const s of sparkles.current) {
        s.age++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;          // gravity
        s.vx *= 0.97;          // drag
        s.rotation += s.spin;

        const life = 1 - s.age / s.life;
        // twinkle: flicker at ~12fps using a sine wave
        const twinkle = 0.6 + 0.4 * Math.abs(Math.sin(s.age * 0.45));
        const alpha = life * twinkle;
        const r = s.size * life;
        if (r < 0.4) continue;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8 + r * 3;

        // Draw 4-pointed star
        drawStar(ctx, 0, 0, r, 0);
        ctx.fillStyle = s.color;
        ctx.fill();

        // Tiny bright centre dot for extra sparkle
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = alpha * 0.9;
        ctx.fill();

        ctx.restore();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };
    animate();

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId.current);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990]"
        style={{ mixBlendMode: 'screen' }}
      />

      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[background,box-shadow] duration-75"
        style={{ background: '#8cc8ff' }}
      />

      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1.5px solid rgba(140,200,255,0.4)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.1s, box-shadow 0.1s',
        }}
      >
        <div
          ref={labelRef}
          className="absolute whitespace-nowrap text-[9px] font-medium tracking-widest uppercase text-white opacity-0"
          style={{ top: '130%', left: '50%', transform: 'translateX(-50%)', transition: 'opacity 0.2s' }}
        />
      </div>
    </>
  );
}
