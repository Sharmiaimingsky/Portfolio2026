import { useRef, useEffect, useState } from 'react';
import { skillClusters } from '../data/skills';

export default function TechObservatory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

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
    <section id="observatory" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: 'translateY(24px)' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Tech Observatory</span>
          </div>
          <h2
            className="font-bold text-gradient leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Technology Ecosystem
          </h2>
          <p className="text-[#6b7685] mt-4 max-w-xl leading-relaxed">
            Not skill bars. Instead, a living map of technology clusters — hover to explore each domain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillClusters.map((cluster, clusterIdx) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              index={clusterIdx}
              isActive={activeCluster === cluster.id}
              onToggle={() => setActiveCluster(activeCluster === cluster.id ? null : cluster.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClusterCard({
  cluster,
  index,
  isActive,
  onToggle,
}: {
  cluster: typeof skillClusters[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
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
    <div
      ref={cardRef}
      onClick={onToggle}
      data-cursor="EXPLORE"
      className="rounded-lg border p-6 cursor-pointer transition-all duration-300 glass-hover"
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        borderColor: isActive ? `${cluster.color}40` : 'rgba(255,255,255,0.05)',
        background: isActive ? `${cluster.color}08` : 'rgba(14,18,24,0.5)',
        boxShadow: isActive ? `0 0 20px ${cluster.color}12` : 'none',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${cluster.color}15`, border: `1px solid ${cluster.color}30` }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cluster.color, boxShadow: isActive ? `0 0 8px ${cluster.color}` : 'none' }} />
        </div>
        <div>
          <div className="text-[#f0f4f8] font-semibold text-sm">{cluster.label}</div>
          <div className="text-[10px] text-[#6b7685]">{cluster.skills.length} technologies</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {cluster.skills.map((skill, i) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs rounded-sm font-medium transition-all duration-200"
            style={{
              color: isActive ? cluster.color : '#6b7685',
              backgroundColor: isActive ? `${cluster.color}10` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isActive ? `${cluster.color}25` : 'rgba(255,255,255,0.05)'}`,
              transitionDelay: `${i * 20}ms`,
              textShadow: isActive ? `0 0 8px ${cluster.color}60` : 'none',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
