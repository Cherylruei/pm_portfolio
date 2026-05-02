import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FlipCard from '../components/FlipCard';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { useSiteConfig } from '../hooks/useSiteConfig';

// Decorative star icon (inline SVG replacement for Material Icons)
function Star({ className }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
    </svg>
  );
}

export default function Home() {
  const { projects } = useProjects();
  const config = useSiteConfig();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  // "Yeah!" sticker follows mouse with trailing (lerp) effect
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const sticker = document.getElementById('yeah-sticker');
    if (!sticker) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        sticker.style.opacity = '1';
      }
    };

    const ease = 0.1; // lower = more trailing lag
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * ease;
      pos.current.y += (mouse.current.y - pos.current.y) * ease;

      // Calculate angle from movement direction
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      // Tilt slightly in the movement direction, max ±15deg
      const tilt = Math.min(speed, 15) * (Math.sign(dx) || 1) * 0.8;

      sticker.style.left = `${pos.current.x}px`;
      sticker.style.top = `${pos.current.y}px`;
      sticker.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <main className='container mx-auto px-6 py-12 relative'>
      {/* Dark mode toggle */}
      <button
        className='fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform'
        onClick={() => document.documentElement.classList.toggle('dark')}
        aria-label='Toggle dark mode'
      >
        <span className='text-yellow-500 dark:hidden text-xl'>☀️</span>
        <span className='text-blue-300 hidden dark:block text-xl'>🌙</span>
      </button>

      {/* Floating decorations */}
      <div className='absolute top-20 left-10 text-slate-400 dark:text-slate-600 animate-[float_6s_ease-in-out_infinite] pointer-events-none'>
        <Star className='w-8 h-8 -rotate-12' />
      </div>
      <div className='absolute top-40 right-10 text-teal-300 dark:text-teal-700 animate-[float_6s_ease-in-out_3s_infinite] pointer-events-none'>
        <Star className='w-10 h-10 rotate-12' />
      </div>
      <div className='absolute bottom-1/4 left-5 text-green-200 dark:text-green-900 animate-[float_6s_ease-in-out_infinite] pointer-events-none'>
        <Star className='w-12 h-12 -rotate-45' />
      </div>

      {/* Hero section */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10'>
        {/* Left – intro text */}
        <div className='lg:col-span-4 text-center lg:text-left order-2 lg:order-1 relative'>
          <h2 className='font-display font-bold text-4xl lg:text-6xl text-slate-800 dark:text-white leading-tight mb-4'>
            Hi, I&apos;m <br />
            <span className='text-primary'>Cheryl Li</span>
          </h2>
          <p className='text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 whitespace-pre-line'>
            {config.home_subtitle}
          </p>
          <Link
            to='/portfolio'
            className='inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all transform hover:-translate-y-0.5'
          >
            View My Work →
          </Link>
        </div>

        {/* Center – flip card */}
        <div className='lg:col-span-4 flex justify-center order-1 lg:order-2'>
          <FlipCard />
        </div>

        {/* Right – sticky note quote */}
        <div className='lg:col-span-4 flex justify-center lg:justify-end order-3'>
          <div className='relative w-64 transform rotate-3 hover:rotate-0 transition-transform duration-300'>
            <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-red-500' />
            <div className='bg-white dark:bg-slate-700 p-6 shadow-xl rounded-lg border border-slate-100 dark:border-slate-600 relative overflow-hidden'>
              <div className='absolute top-0 right-0 p-2 opacity-10 text-6xl'>
                "
              </div>
              <p className='font-display text-slate-600 dark:text-slate-300 italic leading-relaxed relative z-10 whitespace-pre-line'>
                {config.home_quote}
              </p>
              <div className='mt-4 flex justify-end'>
                <div className='h-1 w-12 bg-slate-200 dark:bg-slate-600 rounded-full' />
              </div>
              <div className='mt-2 flex justify-end'>
                <div className='h-1 w-8 bg-slate-200 dark:bg-slate-600 rounded-full' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects section */}
      {featuredProjects.length > 0 && (
        <section className='mb-24 relative z-10'>
          <div className='flex items-center justify-between mb-8'>
            <h3 className='font-display font-bold text-2xl text-slate-800 dark:text-white'>
              Featured Work
            </h3>
            <Link
              to='/portfolio'
              className='text-primary font-bold text-sm hover:underline'
            >
              View all projects →
            </Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* "Yeah!" sticker follows cursor with trailing effect */}
      <div
        id='yeah-sticker'
        className='fixed z-20 pointer-events-none hidden lg:block'
        style={{
          opacity: 0,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className='text-red-500 dark:text-red-300 font-display font-black text-xs px-4 py-2'>
          Yeah!
        </div>
      </div>
    </main>
  );
}
