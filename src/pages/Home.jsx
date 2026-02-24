import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlipCard from '../components/FlipCard'

// Decorative star icon (inline SVG replacement for Material Icons)
function Star({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    )
}

export default function Home() {
    // Mouse parallax for "Yeah!" sticker
    useEffect(() => {
        const sticker = document.getElementById('yeah-sticker')
        const handleMouseMove = (e) => {
            if (!sticker) return
            const cx = window.innerWidth / 2
            const cy = window.innerHeight / 2
            const mx = (e.clientX - cx) * 0.05
            const my = (e.clientY - cy) * 0.05
            sticker.style.transform = `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px)) rotate(-12deg)`
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <main className="container mx-auto px-6 py-12 relative">
            {/* Dark mode toggle */}
            <button
                className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform"
                onClick={() => document.documentElement.classList.toggle('dark')}
                aria-label="Toggle dark mode"
            >
                <span className="text-yellow-500 dark:hidden text-xl">☀️</span>
                <span className="text-blue-300 hidden dark:block text-xl">🌙</span>
            </button>

            {/* Floating decorations */}
            <div className="absolute top-20 left-10 text-slate-400 dark:text-slate-600 animate-[float_6s_ease-in-out_infinite] pointer-events-none">
                <Star className="w-8 h-8 -rotate-12" />
            </div>
            <div className="absolute top-40 right-10 text-teal-300 dark:text-teal-700 animate-[float_6s_ease-in-out_3s_infinite] pointer-events-none">
                <Star className="w-10 h-10 rotate-12" />
            </div>
            <div className="absolute bottom-1/4 left-5 text-green-200 dark:text-green-900 animate-[float_6s_ease-in-out_infinite] pointer-events-none">
                <Star className="w-12 h-12 -rotate-45" />
            </div>

            {/* Hero section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10">
                {/* Left – intro text */}
                <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1 relative">
                    <h2 className="font-display font-bold text-4xl lg:text-6xl text-slate-800 dark:text-white leading-tight mb-4">
                        Hi, I&apos;m <br />
                        <span className="text-primary">[Your Name]</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                        Crafting delightful experiences, one pixel at a time. I bridge the gap between user needs and business goals.
                    </p>
                    <Link
                        to="/portfolio"
                        className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        View My Work →
                    </Link>
                </div>

                {/* Center – flip card */}
                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                    <FlipCard />
                </div>

                {/* Right – sticky note quote */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end order-3">
                    <div className="relative w-64 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-red-500" />
                        <div className="bg-white dark:bg-slate-700 p-6 shadow-xl rounded-lg border border-slate-100 dark:border-slate-600 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">"</div>
                            <p className="font-display text-slate-600 dark:text-slate-300 italic leading-relaxed relative z-10">
                                "Good products solve problems. Great products create experiences people love."
                            </p>
                            <div className="mt-4 flex justify-end">
                                <div className="h-1 w-12 bg-slate-200 dark:bg-slate-600 rounded-full" />
                            </div>
                            <div className="mt-2 flex justify-end">
                                <div className="h-1 w-8 bg-slate-200 dark:bg-slate-600 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "Yeah!" sticker with parallax */}
            <div
                id="yeah-sticker"
                className="fixed top-1/2 left-1/2 z-20 pointer-events-none hidden lg:block transition-transform duration-100 ease-out"
                style={{ transform: 'translate(-50%, -50%) rotate(-12deg)' }}
            >
                <div className="bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-300 font-display font-black text-2xl px-4 py-2 rounded-lg shadow-sm border-2 border-red-200 dark:border-red-800 opacity-80 backdrop-blur-sm">
                    🛒 Yeah!
                </div>
            </div>
        </main>
    )
}
