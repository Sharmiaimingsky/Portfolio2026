import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, Github, Linkedin, Mail, Code2, Download, Check } from 'lucide-react';

function ContactScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const getSize = () => ({
      W: mount.clientWidth  || window.innerWidth,
      H: mount.clientHeight || window.innerHeight,
    });

    const { W, H } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.32, 180, 28, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x0a2200,
      emissiveIntensity: 0.5,
      metalness: 0.7,
      roughness: 0.2,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wire = new THREE.Mesh(knotGeo, wireMat);
    scene.add(wire);

    const ringCount = 100;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);
    const ringRadius = 2.6;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      ringPos[i * 3]     = Math.cos(angle) * ringRadius;
      ringPos[i * 3 + 1] = Math.sin(angle) * ringRadius * 0.25;
      ringPos[i * 3 + 2] = Math.sin(angle) * ringRadius;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    const ring = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({ color: 0x39ff14, size: 0.055, transparent: true, opacity: 0.5 })
    );
    scene.add(ring);

    const sphereColors = [0x39ff14, 0xff2d78, 0xff6b00, 0xffe000, 0x00f5d4, 0xff9f00];
    const sphereData: { mesh: THREE.Mesh; speed: number; radius: number; phase: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.SphereGeometry(0.05 + Math.random() * 0.07, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: sphereColors[i % sphereColors.length],
        emissive: sphereColors[i % sphereColors.length],
        emissiveIntensity: 0.9,
        metalness: 0.4,
        roughness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 8) * Math.PI * 2;
      const r = 2.0 + Math.random() * 1.0;
      mesh.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r);
      scene.add(mesh);
      sphereData.push({ mesh, speed: 0.25 + Math.random() * 0.35, radius: r, phase: angle });
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const greenLight = new THREE.PointLight(0x39ff14, 5, 12);
    greenLight.position.set(3, 2, 3);
    scene.add(greenLight);
    const pinkLight = new THREE.PointLight(0xff2d78, 3, 10);
    pinkLight.position.set(-3, -1, -2);
    scene.add(pinkLight);
    const orangeLight = new THREE.PointLight(0xff6b00, 2, 8);
    orangeLight.position.set(0, 3, -3);
    scene.add(orangeLight);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const { W: cW, H: cH } = getSize();
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / cW - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / cH - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const { W: nW, H: nH } = getSize();
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      knot.rotation.x = t * 0.18;
      knot.rotation.y = t * 0.26;
      wire.rotation.x = knot.rotation.x;
      wire.rotation.y = knot.rotation.y;
      ring.rotation.y = t * 0.12;
      ring.rotation.x = Math.sin(t * 0.08) * 0.18;

      sphereData.forEach((s, i) => {
        const a = s.phase + t * s.speed;
        s.mesh.position.x = Math.cos(a) * s.radius;
        s.mesh.position.z = Math.sin(a) * s.radius;
        s.mesh.position.y += Math.sin(t * 0.7 + i) * 0.003;
      });

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 0.35 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      knotMat.emissiveIntensity = 0.35 + Math.sin(t * 1.4) * 0.25;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    const email = 'sharmic17@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const socials = [
    { icon: Github,   label: 'GitHub',   href: 'https://github.com/Sharmiaimingsky' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sharmistha-chakrabortyy/' },
    { icon: Code2,    label: 'LeetCode', href: 'https://leetcode.com/sharmic17/' },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: '#050709' }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ContactScene />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(5,7,9,0.3) 0%, rgba(5,7,9,0.72) 55%, rgba(5,7,9,0.97) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative py-32 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={contentRef}
            style={{ opacity: 0, transform: 'translateY(32px)' }}
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#39ff14]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#6b7685]">Contact</span>
              <div className="w-6 h-px bg-[#39ff14]" />
            </div>

            <h2
              className="font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span className="text-gradient">Let's Create</span>
              <br />
              <span className="text-gradient-accent">Something Together</span>
            </h2>

            <p className="text-[#a8b4c0] leading-relaxed mx-auto mb-12" style={{ maxWidth: '480px' }}>
              I'm available for UI Developer roles, full-stack projects, and collaborative engineering.
              If you're building something ambitious — I'd love to talk.
            </p>

            <div className="flex items-center justify-center flex-wrap gap-4 mb-10">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#39ff14]/8 border border-[#39ff14]/20 text-[#39ff14] font-medium text-sm tracking-wide hover:bg-[#39ff14]/18 hover:border-[#39ff14]/50 transition-all duration-300 rounded-sm backdrop-blur-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Mail size={15} />
                    sharmic17@gmail.com
                  </>
                )}
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="/Sharmistha_Chakraborty_08_04_01.pdf"
                download="Sharmistha_Chakraborty_Resume.pdf"
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#ff6b00]/8 border border-[#ff6b00]/25 text-[#ff6b00] font-medium text-sm tracking-wide hover:bg-[#ff6b00]/18 hover:border-[#ff6b00]/55 transition-all duration-300 rounded-sm backdrop-blur-sm"
              >
                <Download size={15} />
                Download Resume
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 flex-wrap">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200 text-sm"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative pb-10 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#6b7685] tracking-wider">© 2025 Sharmistha Chakraborty</span>
          <span className="text-xs text-[#6b7685] tracking-wider">UI Developer · Full Stack · React · Spring Boot</span>
        </div>
      </div>
    </section>
  );
}
