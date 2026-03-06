import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target to next departure (e.g., 4 hours from now)
    const target = new Date();
    target.setHours(target.getHours() + 4);
    target.setMinutes(0);
    target.setSeconds(0);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        // Reset for demo purposes
        target.setHours(target.getHours() + 4);
        return;
      }

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; speed: number }[] = [];
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = 400;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: 0, // Unused but kept for type compatibility if needed, or better remove from type
          speed: Math.random() * 0.5 + 0.1,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        } as any);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star: any) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-60"
      />
      
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium tracking-wider mb-6 border border-amber-500/20">
              EST. 2050
            </span>
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 font-display"
          >
            Vivez <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">l'Histoire</span> en première loge
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Vivez le passé comme jamais auparavant. Des dinosaures du Crétacé à l'art de la Renaissance. Votre voyage vous attend.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/destinations" 
              className="group px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Explorer les Époques
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/booking" 
              className="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-full font-medium hover:bg-zinc-900/80 transition-all"
            >
              Commencer le Voyage
            </Link>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } } }}
            className="mt-12 md:mt-16 flex flex-col items-center"
          >
            <div className="bg-zinc-950/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <p className="text-xs text-amber-500/80 uppercase tracking-[0.2em] mb-4">Prochain départ : Paris, 1925</p>
              <div className="flex items-center gap-3 md:gap-6 text-white font-mono">
                <div className="text-center min-w-[60px]">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Heures</div>
                </div>
                <div className="text-2xl text-zinc-700 font-light animate-pulse">:</div>
                <div className="text-center min-w-[60px]">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Minutes</div>
                </div>
                <div className="text-2xl text-zinc-700 font-light animate-pulse">:</div>
                <div className="text-center min-w-[60px]">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums text-amber-500">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Secondes</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
