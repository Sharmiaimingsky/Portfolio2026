import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, X, Layers, Zap, GitBranch, Github, ExternalLink } from 'lucide-react';
import { projects, Project } from '../data/projects';

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 rounded border border-white/5 bg-white/[0.03]">
      <div className="text-[#39ff14] font-mono font-medium text-lg leading-none mb-1">{value}</div>
      <div className="text-[#6b7685] text-xs tracking-wide">{label}</div>
    </div>
  );
}

function ArchDiagram({ project }: { project: Project }) {
  const typeColors: Record<string, string> = {
    frontend: '#39ff14',
    ai: '#ffe000',
    backend: '#ff6b00',
    infra: '#ff2d78',
    data: '#00f5d4',
  };

  return (
    <div className="relative w-full" style={{ height: '220px' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {project.edges.map((edge, i) => {
          const a = project.nodes.find((n) => n.id === edge.from);
          const b = project.nodes.find((n) => n.id === edge.to);
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(57,255,20,0.12)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
      {project.nodes.map((node) => (
        <div
          key={node.id}
          className="absolute flex flex-col items-center gap-1 group"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-[#0c0e12] transition-transform group-hover:scale-150"
            style={{ backgroundColor: typeColors[node.type] }}
          />
          <span
            className="text-[9px] font-medium whitespace-nowrap opacity-70 group-hover:opacity-100"
            style={{ color: typeColors[node.type] }}
          >
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ background: 'rgba(7,9,13,0.92)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg glass border border-white/8"
        style={{ animation: 'fadeSlideUp 0.4s ease forwards' }}
      >
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="relative h-56 overflow-hidden rounded-t-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111418]" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#6b7685] tracking-wider uppercase mb-2 block">
                  {project.year}
                </span>
                <h2 className="text-2xl font-bold text-[#f0f4f8]">{project.title}</h2>
                <p className="text-[#39ff14] text-sm mt-1">{project.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 text-[#6b7685] hover:text-[#f0f4f8] hover:border-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <p className="text-[#a8b4c0] leading-relaxed">{project.description}</p>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#ffe000]" />
              <span className="text-xs tracking-widest uppercase text-[#6b7685]">Performance</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <MetricCard key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={14} className="text-[#ff6b00]" />
              <span className="text-xs tracking-widest uppercase text-[#6b7685]">Architecture</span>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
              <ArchDiagram project={project} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={14} className="text-[#39ff14]" />
                <span className="text-xs tracking-widest uppercase text-[#6b7685]">Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 text-xs font-mono text-[#39ff14] border border-[#39ff14]/20 rounded-sm bg-[#39ff14]/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs tracking-widest uppercase text-[#6b7685] mb-3">Challenges</div>
              <ul className="space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="text-sm text-[#a8b4c0] flex gap-2">
                    <span className="text-[#ff2d78] mt-1 shrink-0">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {(project.github || project.githubBackend || project.githubFrontend || project.live) && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
                >
                  <Github size={14} /> View Code
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
                >
                  <Github size={14} /> Backend
                </a>
              )}
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
                >
                  <Github size={14} /> Frontend
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-[#39ff14] hover:text-[#ffe000] transition-colors duration-200"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <>
      <div
        ref={cardRef}
        className="group relative rounded-lg overflow-hidden border border-white/5 glass-hover glass cursor-pointer"
        style={{ opacity: 0, transform: 'translateY(32px)' }}
        onClick={() => setOpen(true)}
        data-cursor="VIEW SYSTEM"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111418]" />
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-mono text-[#6b7685] bg-[#0c0e12]/80 px-2 py-1 rounded-sm">
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[#f0f4f8] font-semibold mb-1.5 text-base leading-tight group-hover:text-[#39ff14] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[#6b7685] text-sm leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] font-mono text-[#6b7685] border border-white/5 px-2 py-0.5 rounded-sm bg-white/[0.02]">
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[10px] font-mono text-[#6b7685]">+{project.stack.length - 4}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#39ff14] font-medium tracking-wider group-hover:gap-2.5 transition-all duration-200">
            <span>Open System</span>
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function SelectedSystems() {
  const headerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="systems" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: 'translateY(24px)' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Selected Systems</span>
          </div>
          <h2
            className="font-bold text-gradient leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Systems I've Built
          </h2>
          <p className="text-[#6b7685] mt-4 max-w-xl leading-relaxed">
            Not components — architectures. Each project is an interactive system showcase with live topology, metrics, and deployment details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
