import { useRef, useEffect, useState, useCallback } from 'react';
import { experiences, education } from '../data/experience';
import type { Experience } from '../data/experience';

// ── Colour palette per company ─────────────────────────────────────────────
const PALETTE: Record<string, { body: string; glow: string; eye: string; accent: string }> = {
  ebay:      { body: '#0d1f0d', glow: '#39ff14', eye: '#39ff14', accent: '#a8f5d0' },
  precisely: { body: '#1a1208', glow: '#ff6b00', eye: '#ff6b00', accent: '#ffd6a5' },
  juniper:   { body: '#1f0a0a', glow: '#ff2d78', eye: '#ff2d78', accent: '#ffb3c1' },
  aecom:     { body: '#1a1500', glow: '#ffe000', eye: '#ffe000', accent: '#fff3a0' },
};

const YEARS: Record<string, string> = {
  ebay: '2025–Now',
  precisely: '2024–2025',
  juniper: '2022–2023',
  aecom: '2020–2021',
};

// ── SVG Robot face ──────────────────────────────────────────────────────────
function RobotFace({
  colors,
  blinking,
  talking,
  size,
}: {
  colors: { glow: string; eye: string; accent: string };
  blinking: boolean;
  talking: boolean;
  size: number;
}) {
  const s = size / 80; // scale factor (robot designed at 80px)
  const eyeH = blinking ? 1 : 9;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Antenna */}
      <line x1="40" y1="8" x2="40" y2="18" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="6" r="3" fill={colors.glow} style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }} />

      {/* Head */}
      <rect
        x="14" y="18" width="52" height="44" rx="12"
        fill="currentColor"
        stroke={colors.glow}
        strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 8px ${colors.glow}40)` }}
      />

      {/* Ear bolts */}
      <circle cx="14" cy="40" r="4" fill={colors.accent} opacity="0.6" />
      <circle cx="66" cy="40" r="4" fill={colors.accent} opacity="0.6" />

      {/* Eyes */}
      <rect x="22" y="30" width="14" height={eyeH} rx="4" fill={colors.eye}
        style={{ filter: `drop-shadow(0 0 6px ${colors.eye})`, transition: 'height 0.08s' }} />
      <rect x="44" y="30" width="14" height={eyeH} rx="4" fill={colors.eye}
        style={{ filter: `drop-shadow(0 0 6px ${colors.eye})`, transition: 'height 0.08s' }} />

      {/* Eye shine */}
      {!blinking && (
        <>
          <rect x="24" y="31" width="4" height="3" rx="1.5" fill="white" opacity="0.5" />
          <rect x="46" y="31" width="4" height="3" rx="1.5" fill="white" opacity="0.5" />
        </>
      )}

      {/* Mouth */}
      <rect
        x="27" y={talking ? 52 : 53}
        width="26"
        height={talking ? 7 : 4}
        rx="3"
        fill={colors.glow}
        opacity="0.7"
        style={{ transition: 'all 0.15s', filter: `drop-shadow(0 0 4px ${colors.glow})` }}
      />

      {/* Chin screws */}
      <circle cx="24" cy="58" r="2" fill={colors.accent} opacity="0.4" />
      <circle cx="56" cy="58" r="2" fill={colors.accent} opacity="0.4" />
    </svg>
  );
}

// ── Single robot bubble ─────────────────────────────────────────────────────
interface RobotBubbleProps {
  exp: Experience;
  index: number;
  isActive: boolean;
  onSelect: (id: string | null) => void;
  orbitAngle: number;
}

function RobotBubble({ exp, index, isActive, onSelect, orbitAngle }: RobotBubbleProps) {
  const colors = PALETTE[exp.id] ?? PALETTE.aecom;
  const [blinking, setBlinking] = useState(false);
  const [talking, setTalking] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Random blink
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 120);
    };
    const delay = 1500 + index * 600 + Math.random() * 2000;
    const id = setInterval(blink, delay);
    return () => clearInterval(id);
  }, [index]);

  // Talking animation when active
  useEffect(() => {
    if (!isActive) { setTalking(false); return; }
    const id = setInterval(() => setTalking((t) => !t), 300);
    return () => clearInterval(id);
  }, [isActive]);

  const size = isActive ? 96 : hovered ? 82 : 72;

  return (
    <button
      className="relative flex flex-col items-center focus:outline-none group"
      onClick={() => onSelect(isActive ? null : exp.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Orbit ring glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: isActive
            ? `0 0 0 3px ${colors.glow}60, 0 0 28px ${colors.glow}40`
            : hovered
            ? `0 0 0 2px ${colors.glow}40, 0 0 16px ${colors.glow}20`
            : 'none',
          borderRadius: '50%',
          transition: 'box-shadow 0.3s ease',
        }}
      />

      {/* Robot svg */}
      <div
        style={{
          color: colors.body,
          width: size,
          height: size,
          transition: 'width 0.3s ease, height 0.3s ease',
          filter: isActive ? `drop-shadow(0 0 12px ${colors.glow}80)` : undefined,
        }}
      >
        <RobotFace colors={colors} blinking={blinking} talking={talking} size={size} />
      </div>

      {/* Name badge */}
      <div
        className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider whitespace-nowrap"
        style={{
          color: colors.accent,
          background: `${colors.body}cc`,
          border: `1px solid ${colors.glow}40`,
          boxShadow: isActive ? `0 0 10px ${colors.glow}30` : 'none',
          transition: 'all 0.3s',
        }}
      >
        {exp.company}
      </div>
      <div className="text-[9px] text-[#6b7685] font-mono mt-0.5">{YEARS[exp.id]}</div>
    </button>
  );
}

// ── Expanded detail panel ───────────────────────────────────────────────────
function DetailPanel({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const colors = PALETTE[exp.id] ?? PALETTE.aecom;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    });
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative rounded-2xl border p-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.body}ee 0%, #0d1117 100%)`,
        borderColor: `${colors.glow}30`,
        boxShadow: `0 0 40px ${colors.glow}18, inset 0 0 60px ${colors.body}80`,
        opacity: 0,
        transform: 'translateY(12px) scale(0.98)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10"
        style={{ background: colors.glow }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.glow }} />
            <span className="text-xs font-mono tracking-wider" style={{ color: colors.accent }}>{exp.period}</span>
            <span className="text-[#6b7685] text-xs">·</span>
            <span className="text-xs text-[#6b7685]">{exp.location}</span>
          </div>
          <h3 className="text-[#f0f4f8] font-bold text-xl leading-tight">{exp.role}</h3>
          <div className="text-sm font-semibold mt-0.5" style={{ color: colors.glow }}>{exp.company}</div>
        </div>
        <button
          onClick={onClose}
          className="text-[#6b7685] hover:text-white transition-colors text-lg leading-none p-1"
        >
          ✕
        </button>
      </div>

      <p className="text-[#6b7685] text-sm leading-relaxed mb-4">{exp.description}</p>

      {/* Achievements */}
      <div className="space-y-2 mb-5">
        {exp.achievements.map((a, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div
              className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
              style={{ background: colors.glow, boxShadow: `0 0 6px ${colors.glow}` }}
            />
            <p className="text-[#a8b4c0] text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5">
        {exp.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: colors.accent,
              borderColor: `${colors.glow}30`,
              background: `${colors.glow}10`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Floating orbs background decoration ────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => {
        const colors = Object.values(PALETTE);
        const c = colors[i % colors.length];
        const size = 4 + (i % 3) * 3;
        return (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: size,
              height: size,
              background: c.glow,
              boxShadow: `0 0 ${size * 3}px ${c.glow}`,
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 4) * 18}%`,
              animation: `floatOrb ${4 + i * 0.7}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Mission control grid lines ──────────────────────────────────────────────
function GridLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#39ff14" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// ── Connector lines between robots ─────────────────────────────────────────
function ConnectorLines({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const buttons = container.querySelectorAll<HTMLButtonElement>('[data-robot-btn]');
      const rects = Array.from(buttons).map((b) => b.getBoundingClientRect());
      const cRect = container.getBoundingClientRect();
      const pts = rects.map((r) => ({
        x: r.left + r.width / 2 - cRect.left,
        y: r.top + r.height / 2 - cRect.top,
      }));
      const newLines = [];
      for (let i = 0; i < pts.length - 1; i++) {
        newLines.push({ x1: pts[i].x, y1: pts[i].y, x2: pts[i + 1].x, y2: pts[i + 1].y });
      }
      setLines(newLines);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [containerRef]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#39ff14"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.15"
        />
      ))}
    </svg>
  );
}

// ── Education card ──────────────────────────────────────────────────────────
const EDU_META: Record<string, { glow: string; accent: string; bg: string; label: string; cgpa: string; icon: string }> = {
  cdac:  { glow: '#39ff14', accent: '#a8f5d0', bg: '#051200', label: 'PG Diploma',   cgpa: '8.0',  icon: '🎓' },
  ghrce: { glow: '#ffe000', accent: '#fff3a0', bg: '#1a1500', label: 'MBA · IT',      cgpa: '9.76', icon: '🏆' },
  rgpv:  { glow: '#ff2d78', accent: '#ffb3c1', bg: '#1a0010', label: 'B.Tech · CSE', cgpa: '8.01', icon: '💻' },
};

function EduCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const meta = EDU_META[edu.id] ?? { glow: '#39ff14', accent: '#a8f5d0', bg: '#051200', label: '', cgpa: '', icon: '📘' };
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = `opacity 0.7s ease ${index * 0.18}s, transform 0.7s ease ${index * 0.18}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) rotateX(0deg)';
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-default select-none"
      style={{
        opacity: 0,
        transform: 'translateY(28px) rotateX(6deg)',
        background: meta.bg,
        border: `1px solid ${meta.glow}30`,
        boxShadow: hovered
          ? `0 0 40px ${meta.glow}28, 0 0 0 1px ${meta.glow}40, inset 0 0 30px ${meta.bg}`
          : `0 0 20px ${meta.glow}10, inset 0 0 20px ${meta.bg}`,
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        minHeight: 220,
      }}
    >
      {/* Animated scan-line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.glow}80, transparent)`,
          top: hovered ? '100%' : '0%',
          transition: 'top 1.2s ease',
          opacity: hovered ? 0 : 1,
        }}
      />

      {/* Top edge glow bar */}
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.glow}, transparent)` }}
      />

      {/* Giant translucent icon backdrop */}
      <div
        className="absolute -right-4 -bottom-4 text-[7rem] leading-none pointer-events-none select-none"
        style={{ opacity: hovered ? 0.18 : 0.09, transition: 'opacity 0.4s ease', filter: `drop-shadow(0 0 20px ${meta.glow})` }}
      >
        {meta.icon}
      </div>

      {/* Corner circuit lines */}
      <svg className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-20" viewBox="0 0 80 80">
        <path d="M80 0 L80 30 L50 30 L50 0" stroke={meta.glow} strokeWidth="0.8" fill="none" />
        <path d="M60 30 L60 50 L80 50" stroke={meta.glow} strokeWidth="0.8" fill="none" opacity="0.5" />
        <circle cx="50" cy="30" r="2" fill={meta.glow} />
        <circle cx="80" cy="50" r="1.5" fill={meta.glow} opacity="0.6" />
      </svg>

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* CGPA badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
            style={{ color: meta.glow, borderColor: `${meta.glow}40`, background: `${meta.glow}12` }}
          >
            {meta.label}
          </div>
          <div
            className="flex flex-col items-end"
          >
            <div
              className="text-2xl font-black leading-none tabular-nums"
              style={{
                color: meta.glow,
                textShadow: `0 0 16px ${meta.glow}80`,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {meta.cgpa}
            </div>
            <div className="text-[9px] text-[#6b7685] font-mono tracking-wider">CGPA</div>
          </div>
        </div>

        {/* Period */}
        <div className="text-[10px] font-mono mb-2" style={{ color: `${meta.glow}99` }}>{edu.period}</div>

        {/* Degree */}
        <div className="text-[#f0f4f8] font-bold text-base leading-tight mb-1">{edu.degree}</div>

        {/* Institution */}
        <div
          className="text-sm font-semibold mb-3"
          style={{ color: meta.accent, opacity: 0.85 }}
        >
          {edu.institution}
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-3" style={{ background: `linear-gradient(90deg, ${meta.glow}40, transparent)` }} />

        {/* Points */}
        {edu.points.map((p, i) => (
          <div key={i} className="flex items-start gap-2">
            <div
              className="shrink-0 w-1 h-1 rounded-full mt-1.5"
              style={{ background: meta.glow, boxShadow: `0 0 6px ${meta.glow}` }}
            />
            <p className="text-[#6b7685] text-xs leading-relaxed">{p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main section ────────────────────────────────────────────────────────────
export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeExp = experiences.find((e) => e.id === activeId) ?? null;

  const handleSelect = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  return (
    <section id="experience" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Inject float keyframes */}
      <style>{`
        @keyframes floatOrb {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-14px) scale(1.1); }
        }
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Experience</span>
          </div>
          <h2 className="font-bold text-gradient leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Career Endeavours
          </h2>
          <p className="text-[#6b7685] mt-4 max-w-lg leading-relaxed">
            Each robot represents a chapter of my career. Click one to deploy its mission log.
          </p>
        </div>

        {/* Mission control stage */}
        <div
          className="relative rounded-2xl border border-white/5 mb-8 overflow-hidden"
          style={{ background: '#080d14', minHeight: 220 }}
        >
          <GridLines />
          <FloatingOrbs />

          {/* Status bar */}
          <div className="relative z-10 flex items-center gap-3 px-5 py-3 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#06d6a0] animate-pulse" />
            <span className="text-[10px] font-mono text-[#6b7685] tracking-widest uppercase">
              Mission Control — {activeId ? `Bot ${experiences.find(e => e.id === activeId)?.company} online` : 'Select a robot to deploy'}
            </span>
            <div className="ml-auto flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: ['#ff7043', '#ffbe0b', '#06d6a0'][i] }} />
              ))}
            </div>
          </div>

          {/* Robot row */}
          <div
            ref={containerRef}
            className="relative z-10 flex items-end justify-center gap-8 md:gap-16 px-6 py-10"
          >
            <ConnectorLines containerRef={containerRef} />
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                data-robot-btn
                style={{
                  animation: `robotFloat ${3.5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <RobotBubble
                  exp={exp}
                  index={i}
                  isActive={activeId === exp.id}
                  onSelect={handleSelect}
                  orbitAngle={i * 90}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {activeExp && (
          <div className="mb-12">
            <DetailPanel exp={activeExp} onClose={() => setActiveId(null)} />
          </div>
        )}

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Education</span>
            <div className="w-6 h-px bg-[#39ff14]" />
          </div>
          <p className="text-[#6b7685] text-xs font-mono mb-8 tracking-wider">
            — ACADEMIC LOG INITIALIZED —
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {education.map((edu, i) => (
              <EduCard key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
