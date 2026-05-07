import { useRef, useEffect, useState } from 'react';
import { testimonials } from '../data/skills';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function QuoteIcon() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-[#39ff14]/30">
      <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 3.6C4.2 4.8 3.6 6.3 3.6 8.1V9H7.2V18H0ZM12 18V10.8C12 7.2 13.2 4.2 15.6 1.8L17.4 3.6C16.2 4.8 15.6 6.3 15.6 8.1V9H19.2V18H12Z" fill="currentColor"/>
    </svg>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const go = (dir: 1 | -1) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 200);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  });

  const t = testimonials[active];

  return (
    <section className="py-28 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: 'translateY(24px)' }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Testimonials</span>
          </div>
          <h2
            className="font-bold text-gradient leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            What People Say
          </h2>
        </div>

        <div className="relative">
          <div
            className="rounded-xl border border-white/5 p-8 md:p-10 glass"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            <QuoteIcon />
            <p className="text-[#a8b4c0] text-lg leading-relaxed mt-5 mb-8 italic">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg, #39ff1420, #ffe00020)', border: '1px solid rgba(57,255,20,0.2)', color: '#39ff14' }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-[#f0f4f8] font-semibold text-sm">{t.name}</div>
                <div className="text-[#6b7685] text-xs">{t.role} · {t.company}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setActive(i); setAnimating(false); }, 200); } }}
                  className="transition-all duration-200 rounded-full"
                  style={{
                    width: i === active ? '20px' : '6px',
                    height: '6px',
                    background: i === active ? '#39ff14' : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="p-2 rounded-sm border border-white/5 text-[#6b7685] hover:text-[#f0f4f8] hover:border-white/15 transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="p-2 rounded-sm border border-white/5 text-[#6b7685] hover:text-[#f0f4f8] hover:border-white/15 transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
