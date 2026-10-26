import { useRef, useEffect } from 'react';
import { Award, Zap, Users, Code2 } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    title: 'Precisely Award',
    desc: 'Round of Applause — Feb 2025 for Carrefour reverse sync deployment',
    color: '#ffe000',
  },
  {
    icon: Code2,
    title: 'Fortune 100 Clients',
    desc: 'Feature development, testing & design systems at Precisely S&D',
    color: '#39ff14',
  },
  {
    icon: Zap,
    title: 'Full Stack',
    desc: 'React, Angular, Java, Spring Boot, PostgreSQL, AWS across production systems',
    color: '#ff6b00',
  },
  {
    icon: Users,
    title: 'Gold Medallist',
    desc: 'University Topper — MBA-IT at GHRCE with 10 SGPA',
    color: '#ff2d78',
  },
];

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const el of [headerRef.current, gridRef.current]) {
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    }
  }, []);

  return (
    <section id="about" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            ref={headerRef}
            style={{ opacity: 0, transform: 'translateY(24px)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#39ff14]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Introduction</span>
            </div>
            <h2
              className="font-bold text-gradient leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Who am I.
            </h2>
            <p className="text-[#a8b4c0] leading-relaxed mb-4">
              I'm an enthusiastic software developer with experience in Java, Spring Boot, Angular, JPA, TypeScript, JavaScript, HTML, and CSS — with deep expertise in frameworks like React, Node.js, and Three.js.
            </p>
            <p className="text-[#a8b4c0] leading-relaxed mb-4">
              Currently a UI Developer at <span className="text-[#39ff14] font-medium">eBay Inc.</span>, building the Genie SEO Tool to improve search visibility, seller workflows, and enterprise optimization at scale. I work on modern React interfaces, reusable components, and user-centric design decisions that make complex search and merchandising systems easier to operate.
            </p>
            <p className="text-[#6b7685] leading-relaxed">
              Previously at Precisely S&D, I delivered features for Fortune 100 clients through the Data Integrity Suite, and at Juniper Networks I contributed to Junos device management and automation tooling. I'm a quick learner who collaborates closely with cross-functional teams to create efficient, scalable, and user-friendly solutions. Self-starter. Fast-paced environment enthusiast. Let's create something together.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href="https://github.com/Sharmiaimingsky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-wider uppercase px-5 py-2.5 border border-[#39ff14]/25 text-[#39ff14] hover:bg-[#39ff14]/10 transition-all duration-200 rounded-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sharmistha-chakrabortyy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-wider uppercase px-5 py-2.5 border border-white/10 text-[#6b7685] hover:border-white/20 hover:text-[#f0f4f8] transition-all duration-200 rounded-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Highlights grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4"
            style={{ opacity: 0, transform: 'translateY(24px)' }}
          >
            {highlights.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="rounded-lg border border-white/5 p-5 glass glass-hover"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${color}12`, border: `1px solid ${color}28` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="text-[#f0f4f8] font-semibold text-sm mb-1.5">{title}</div>
                <div className="text-[#6b7685] text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
