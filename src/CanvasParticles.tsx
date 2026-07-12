import React, { useEffect, useRef, useCallback, FC } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "floating";
}

export interface CanvasProps {
  particleSize: number;
  particleSpeed: number;
}

interface Props extends CanvasProps {}

const CanvasParticles: FC<Props> = ({
  particleSize = 0.1,
  particleSpeed = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = [];
      const count = window.innerWidth < 640 ? 150 : 400;
      // Floating particles only (400)
      for (let i = 0; i < 400; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() * 0.5 + 0.2) * particleSpeed,
          vy: -Math.random() * 0.5 - 0.2,
          size: Math.random() * 1.5 + 0.5 * particleSize,
          opacity: 0,
          type: "floating",
        });
      }
    },
    [particleSpeed, particleSize],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const particles = particlesRef.current;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.opacity = Math.sin(Date.now() * 0.001 + i) * 0.3 + 0.1;

      // Floating only
      if (p.y < -50 || p.x > width + 50) {
        p.y = height * Math.random();
        p.x = Math.random() * width;
      }
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#d4af37";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-90"
      style={{ background: "transparent ", willChange: "transform, opacity" }}
    />
  );
};

export default CanvasParticles;
