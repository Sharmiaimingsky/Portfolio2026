import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  connections: number[];
}

export default function NeuralScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 18);

    // Nodes
    const NODE_COUNT = 80;
    const nodes: NeuralNode[] = [];
    const nodeGroup = new THREE.Group();

    const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x8cc8ff });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x3a7bd5, transparent: true, opacity: 0.3 });
    const glowGeo = new THREE.SphereGeometry(0.2, 8, 8);

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8
      );
      nodes.push({
        position: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.002
        ),
        originalPosition: pos.clone(),
        connections: [],
      });

      const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
      mesh.position.copy(pos);
      nodeGroup.add(mesh);

      const glow = new THREE.Mesh(glowGeo, glowMat.clone());
      glow.position.copy(pos);
      nodeGroup.add(glow);
    }
    scene.add(nodeGroup);

    // Build connections (edges between nearby nodes)
    const CONNECTION_DIST = 5.5;
    const edges: { a: number; b: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < CONNECTION_DIST) {
          edges.push({ a: i, b: j });
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
          if (edges.length > 160) break;
        }
      }
      if (edges.length > 160) break;
    }

    // Line geometry for connections
    const linePositions = new Float32Array(edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3a7bd5,
      transparent: true,
      opacity: 0.25,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Animated data packets travelling along edges
    const PACKET_COUNT = 12;
    const packetGeo = new THREE.SphereGeometry(0.05, 4, 4);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x7df9ff });
    const packets: { mesh: THREE.Mesh; edgeIdx: number; t: number; speed: number }[] = [];

    for (let i = 0; i < PACKET_COUNT; i++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat.clone());
      scene.add(mesh);
      packets.push({
        mesh,
        edgeIdx: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.008;

      // Move nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        node.position.add(node.velocity);

        // Magnetic drift toward cursor
        const dx = mouseRef.current.x * 12 - node.position.x;
        const dy = mouseRef.current.y * 7 - node.position.y;
        node.velocity.x += dx * 0.00003;
        node.velocity.y += dy * 0.00003;

        // Restore to original position gently
        node.velocity.x += (node.originalPosition.x - node.position.x) * 0.0006;
        node.velocity.y += (node.originalPosition.y - node.position.y) * 0.0006;
        node.velocity.z += (node.originalPosition.z - node.position.z) * 0.0006;

        // Damping
        node.velocity.multiplyScalar(0.98);

        // Update mesh positions (skip glow meshes at odd indices)
        const mesh = nodeGroup.children[i * 2] as THREE.Mesh;
        const glow = nodeGroup.children[i * 2 + 1] as THREE.Mesh;
        mesh.position.copy(node.position);
        glow.position.copy(node.position);

        // Pulse glow
        const pulseMat = glow.material as THREE.MeshBasicMaterial;
        pulseMat.opacity = 0.15 + Math.sin(time * 2 + i) * 0.1;
      }

      // Update connection lines
      for (let e = 0; e < edges.length; e++) {
        const { a, b } = edges[e];
        const base = e * 6;
        linePositions[base] = nodes[a].position.x;
        linePositions[base + 1] = nodes[a].position.y;
        linePositions[base + 2] = nodes[a].position.z;
        linePositions[base + 3] = nodes[b].position.x;
        linePositions[base + 4] = nodes[b].position.y;
        linePositions[base + 5] = nodes[b].position.z;
      }
      lineGeo.attributes.position.needsUpdate = true;

      // Animate packets
      for (const p of packets) {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.edgeIdx = Math.floor(Math.random() * edges.length);
        }
        const edge = edges[p.edgeIdx];
        const pa = nodes[edge.a].position;
        const pb = nodes[edge.b].position;
        p.mesh.position.lerpVectors(pa, pb, p.t);
      }

      // Subtle camera sway
      camera.position.x = Math.sin(time * 0.15) * 0.4 + mouseRef.current.x * 0.3;
      camera.position.y = Math.cos(time * 0.1) * 0.2 + mouseRef.current.y * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
