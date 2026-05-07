import { useState, useRef, useEffect } from 'react';
import { projects, Project, ArchNode } from '../data/projects';

const TYPE_COLORS: Record<string, string> = {
  frontend: '#39ff14',
  ai: '#ffe000',
  backend: '#ff6b00',
  infra: '#ff2d78',
  data: '#00f5d4',
};

const TYPE_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  ai: 'AI / ML',
  backend: 'Backend',
  infra: 'Infrastructure',
  data: 'Data',
};

function PacketAnimation({
  fromX, fromY, toX, toY, color,
}: {
  fromX: number; fromY: number; toX: number; toY: number; color: string;
}) {
  return (
    <circle r="3" fill={color} opacity="0.8">
      <animateMotion
        dur={`${0.9 + Math.random() * 0.6}s`}
        repeatCount="indefinite"
        path={`M${fromX},${fromY} L${toX},${toY}`}
      />
    </circle>
  );
}

function ArchCanvas({ project, activeNode, onNodeClick }: {
  project: Project;
  activeNode: string | null;
  onNodeClick: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 600, H = 360;
  const nx = (x: number) => (x / 100) * W;
  const ny = (y: number) => (y / 100) * H;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full rounded-lg"
      style={{ height: '320px', background: 'rgba(7,9,13,0.6)' }}
    >
      <defs>
        <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(57,255,20,0.03)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#arch-grid)" />

      {project.edges.map((edge, i) => {
        const a = project.nodes.find((n) => n.id === edge.from);
        const b = project.nodes.find((n) => n.id === edge.to);
        if (!a || !b) return null;
        const isActive = activeNode === edge.from || activeNode === edge.to;
        return (
          <g key={i}>
            <line
              x1={nx(a.x)} y1={ny(a.y)}
              x2={nx(b.x)} y2={ny(b.y)}
              stroke={isActive ? 'rgba(57,255,20,0.5)' : 'rgba(57,255,20,0.1)'}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray={isActive ? 'none' : '4 4'}
            />
            {edge.label && (
              <text
                x={(nx(a.x) + nx(b.x)) / 2}
                y={(ny(a.y) + ny(b.y)) / 2 - 4}
                fill="rgba(57,255,20,0.4)"
                fontSize="8"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {activeNode &&
        project.edges
          .filter((e) => e.from === activeNode || e.to === activeNode)
          .map((edge, i) => {
            const a = project.nodes.find((n) => n.id === edge.from);
            const b = project.nodes.find((n) => n.id === edge.to);
            if (!a || !b) return null;
            return (
              <PacketAnimation
                key={`pkt-${i}`}
                fromX={nx(a.x)} fromY={ny(a.y)}
                toX={nx(b.x)} toY={ny(b.y)}
                color={TYPE_COLORS[a.type]}
              />
            );
          })}

      {project.nodes.map((node) => {
        const isActive = activeNode === node.id;
        const color = TYPE_COLORS[node.type];
        return (
          <g
            key={node.id}
            className="cursor-pointer"
            onClick={() => onNodeClick(node.id)}
          >
            {isActive && (
              <circle
                cx={nx(node.x)} cy={ny(node.y)} r="20"
                fill="none" stroke={color} strokeWidth="1" opacity="0.3"
              >
                <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={nx(node.x)} cy={ny(node.y)} r={isActive ? 10 : 7}
              fill={isActive ? color : 'rgba(12,14,18,0.9)'}
              stroke={color}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text
              x={nx(node.x)} y={ny(node.y) + (isActive ? 22 : 19)}
              fill={color} fontSize="9" textAnchor="middle"
              fontFamily="Inter Tight, sans-serif" fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function NodeDetail({ node }: { node: ArchNode }) {
  return (
    <div
      className="rounded-lg border border-white/8 p-4 glass"
      style={{ animation: 'fadeSlideUp 0.3s ease forwards' }}
    >
      <style>{`@keyframes fadeSlideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: TYPE_COLORS[node.type] }}
        />
        <span
          className="text-xs font-medium tracking-wider uppercase"
          style={{ color: TYPE_COLORS[node.type] }}
        >
          {TYPE_LABELS[node.type]}
        </span>
      </div>
      <h4 className="text-[#f0f4f8] font-semibold mb-1.5">{node.label}</h4>
      <p className="text-[#6b7685] text-sm leading-relaxed">{node.description}</p>
    </div>
  );
}

export default function ArchPlayground() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveNode(null);
  }, [activeProject]);

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

  const selectedNode = activeProject.nodes.find((n) => n.id === activeNode);

  return (
    <section id="architecture" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: 'translateY(24px)' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#39ff14]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Architecture Playground</span>
          </div>
          <h2
            className="font-bold text-gradient leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Inspect Architecture
          </h2>
          <p className="text-[#6b7685] mt-4 max-w-xl leading-relaxed">
            Select a system and click any node to explore its role, stack, and how data flows through the topology.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide rounded-sm border transition-all duration-200 ${
                    activeProject.id === p.id
                      ? 'border-[#39ff14]/40 bg-[#39ff14]/10 text-[#39ff14]'
                      : 'border-white/5 bg-white/[0.02] text-[#6b7685] hover:border-white/10 hover:text-[#a8b4c0]'
                  }`}
                >
                  {p.title.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>

            <ArchCanvas
              project={activeProject}
              activeNode={activeNode}
              onNodeClick={(id) => setActiveNode(activeNode === id ? null : id)}
            />

            <p className="text-[10px] text-[#6b7685] mt-3 tracking-wide">
              Click a node to inspect its role. Active connections animate data flow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs tracking-widest uppercase text-[#6b7685] mb-2">
              {selectedNode ? 'Node Detail' : 'Select a Node'}
            </div>

            {selectedNode ? (
              <NodeDetail node={selectedNode} />
            ) : (
              <div className="rounded-lg border border-white/5 p-5 bg-white/[0.02]">
                <p className="text-[#6b7685] text-sm text-center leading-relaxed py-6 opacity-50">
                  Click any node on the topology to see its details here.
                </p>
              </div>
            )}

            <div className="rounded-lg border border-white/5 p-4 bg-white/[0.02]">
              <div className="text-[10px] tracking-widest uppercase text-[#6b7685] mb-3">Layer Legend</div>
              <div className="space-y-2">
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-xs text-[#6b7685]">{TYPE_LABELS[type]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 p-4 bg-white/[0.02]">
              <div className="text-[10px] tracking-widest uppercase text-[#6b7685] mb-3">Key Metrics</div>
              <div className="space-y-2">
                {activeProject.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <span className="text-xs text-[#6b7685]">{m.label}</span>
                    <span className="text-xs font-mono text-[#39ff14]">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
