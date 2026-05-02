import { Link } from 'react-router-dom'
import FlipCard from '../components/FlipCard'
import { useSiteConfig } from '../hooks/useSiteConfig'

export default function About() {
    const config = useSiteConfig()
    const skills = config.about_skills.split(',').map((s) => s.trim()).filter(Boolean)
    const timeline = (() => {
        try { return JSON.parse(config.about_timeline) }
        catch { return [] }
    })()

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

            {/* Hero */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 relative z-10">
                <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
                    <h1 className="font-display font-bold text-4xl lg:text-6xl text-slate-800 dark:text-white leading-tight mb-4">
                        About <br />
                        <span className="text-primary">Me</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                        {config.about_hero_subtitle}
                    </p>
                </div>
                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                    <FlipCard />
                </div>
                <div className="lg:col-span-4 order-3" />
            </section>

            {/* Bio + Skills */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                {/* Bio */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {config.about_bio_1}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {config.about_bio_2}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {config.about_bio_3}
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent sticky top-24">
                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-6">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm px-3 py-1.5 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="mb-20">
                <h2 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-8">
                    Experience
                </h2>
                <div className="space-y-4">
                    {timeline.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-transparent flex flex-col sm:flex-row sm:items-start gap-4"
                        >
                            <div className="shrink-0 sm:w-40">
                                <p className="text-primary text-xs font-bold uppercase tracking-wide">{item.period}</p>
                            </div>
                            <div>
                                <p className="font-display font-bold text-slate-800 dark:text-white mb-0.5">
                                    {item.role}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">{item.company}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="flex flex-wrap gap-4 justify-center mb-12">
                <a
                    href="/cv.pdf"
                    download
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Download CV
                </a>
                <Link
                    to="/portfolio"
                    className="bg-white dark:bg-slate-700 border border-primary text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-primary/5 transition-all transform hover:-translate-y-0.5"
                >
                    View Portfolio →
                </Link>
            </section>
        </main>
    )
}
