import { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Award, Users, Medal, Building2 } from 'lucide-react';
import NeuralScene from './NeuralScene';
import AvatarScene from './AvatarScene';

const CHIPS = [
  { text: 'Precisely Award 2025', sub: 'Round of Applause', color: '#39ff14', icon: Award, pos: { top: '8%', left: '-30%' }, delay: 0 },
  { text: 'Fortune 100 Clients', sub: 'Precisely S&D', color: '#ffe000', icon: Users, pos: { top: '26%', right: '-32%' }, delay: 0.4 },
  { text: 'Gold Medallist', sub: 'MBA-IT · GHRCE', color: '#ff6b00', icon: Medal, pos: { bottom: '30%', left: '-30%' }, delay: 0.8 },
  { text: '4 Companies', sub: 'Aecom · Juniper · Precisely · eBay', color: '#ff2d78', icon: Building2, pos: { bottom: '14%', right: '-32%' }, delay: 1.2 },
] as const;

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEls = [badgeRef.current, nameRef.current, subtitleRef.current, bioRef.current, ctaRef.current];
    textEls.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 180);
    });

    const av = avatarRef.current;
    if (av) {
      av.style.opacity = '0';
      av.style.transform = 'translateX(40px) scale(0.95)';
      setTimeout(() => {
        av.style.transition = 'opacity 1.1s ease, transform 1.1s ease';
        av.style.opacity = '1';
        av.style.transform = 'translateX(0) scale(1)';
      }, 600);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <NeuralScene />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(7,9,13,0.55) 65%, rgba(7,9,13,0.97) 100%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(57,255,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* Left: Text */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div ref={badgeRef} className="flex items-center gap-2.5 mb-6 sm:mb-8">
              <Sparkles size={12} className="text-[#39ff14]" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-[#6b7685]">
                UI Developer · eBay Inc. · Full Stack
              </span>
            </div>

            <h1
              ref={nameRef}
              className="font-bold leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)' }}
            >
              <span className="block text-[#a8b4c0] text-[0.5em] font-normal tracking-widest uppercase mb-3">
                Hi, I'm
              </span>
              <span className="block text-[#f0f4f8]">Sharmistha</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #39ff14 0%, #ffe000 60%, #ff6b00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Chakraborty
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="font-medium text-[#a8b4c0] mb-4"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' }}
            >
              I develop{' '}
              <span style={{ color: '#39ff14' }}>user interfaces</span> &{' '}
              <span style={{ color: '#ffe000' }}>web applications</span>
            </p>

            <p
              ref={bioRef}
              className="text-[#6b7685] leading-relaxed mb-8 sm:mb-10"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.975rem)', maxWidth: '480px' }}
            >
              Full-stack developer with expertise in Java, Spring Boot, Angular, React, and TypeScript.
              Currently building the Genie SEO Tool at{' '}
              <span style={{ color: '#a8b4c0', fontWeight: 500 }}>eBay Inc.</span>
              {' '}Self-starter. Fast learner. Let's build something great.
            </p>

            <div ref={ctaRef} className="flex items-center gap-4 flex-wrap">
              <a
                href="#systems"
                data-cursor="EXPLORE"
                className="group flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff14]"
                style={{
                  background: 'rgba(57,255,20,0.08)',
                  border: '1px solid rgba(57,255,20,0.25)',
                  color: '#39ff14',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.15)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.25)';
                }}
              >
                View My Work
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="text-sm font-medium tracking-wider uppercase text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200 px-4 py-3 sm:py-3.5 border border-white/5 rounded-sm hover:border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex items-center gap-3 mt-12 sm:mt-16 opacity-30" aria-hidden="true">
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#39ff14]" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#6b7685]">Scroll</span>
            </div>
          </div>

          {/* Right: Avatar + chips */}
          <div
            ref={avatarRef}
            className="relative flex flex-col items-center justify-center order-1 lg:order-2"
          >
            {/* Avatar with floating chips — desktop only */}
            <div
              className="relative w-full max-w-sm sm:max-w-md mx-auto hidden lg:block"
              style={{ height: 'min(75vh, 680px)', overflow: 'visible' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(57,255,20,0.05) 0%, transparent 70%)',
                }}
              />
              <AvatarScene />
              {CHIPS.map((chip) => (
                <FloatingChip
                  key={chip.text}
                  text={chip.text}
                  sub={chip.sub}
                  color={chip.color}
                  style={chip.pos as React.CSSProperties}
                  delay={chip.delay}
                />
              ))}
            </div>

            {/* Avatar — mobile/tablet (no floating chips) */}
            <div
              className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:hidden"
              style={{ height: 'min(55vw, 340px)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(57,255,20,0.05) 0%, transparent 70%)',
                }}
              />
              <AvatarScene />
            </div>

            {/* Chip grid — mobile/tablet only */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4 lg:hidden px-1" role="list" aria-label="Achievements">
              {CHIPS.map((chip) => (
                <MobileChip
                  key={chip.text}
                  text={chip.text}
                  sub={chip.sub}
                  color={chip.color}
                  Icon={chip.icon}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  text,
  sub,
  color,
  style,
  delay = 0,
}: {
  text: string;
  sub: string;
  color: string;
  style: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 1200 + delay * 1000);
  }, [delay]);

  return (
    <div
      ref={ref}
      className="absolute px-3 py-2 rounded-lg text-left pointer-events-none"
      aria-hidden="true"
      style={{
        ...style,
        background: 'rgba(12, 14, 18, 0.88)',
        border: `1px solid ${color}30`,
        backdropFilter: 'blur(10px)',
        animation: `chipFloat ${2.5 + delay}s ease-in-out infinite`,
        animationDelay: `${delay * 0.5}s`,
        opacity: 0,
        zIndex: 20,
      }}
    >
      <style>{`
        @keyframes chipFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <div className="text-[11px] font-semibold whitespace-nowrap" style={{ color }}>
        {text}
      </div>
      <div className="text-[9px] text-[#6b7685] whitespace-nowrap">{sub}</div>
    </div>
  );
}

function MobileChip({
  text,
  sub,
  color,
  Icon,
}: {
  text: string;
  sub: string;
  color: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}) {
  return (
    <div
      role="listitem"
      className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg"
      style={{
        background: 'rgba(12, 14, 18, 0.75)',
        border: `1px solid ${color}28`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Icon size={14} style={{ color, flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
      <div className="min-w-0">
        <div className="text-[11px] font-semibold leading-tight truncate" style={{ color }}>
          {text}
        </div>
        <div className="text-[9px] text-[#6b7685] leading-tight mt-0.5 truncate">{sub}</div>
      </div>
    </div>
  );
}
