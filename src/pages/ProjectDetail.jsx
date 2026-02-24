import { useParams, Link, useNavigate } from 'react-router-dom'
import projects from '../data/projects.json'

const tagColorMap = {
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300',
}

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const project = projects.find((p) => p.id === id)

    if (!project) {
        return (
            <main className="container mx-auto px-6 py-24 text-center">
                <h2 className="font-display font-bold text-4xl text-slate-800 dark:text-white mb-4">
                    Project not found 🔍
                </h2>
                <Link to="/portfolio" className="text-primary hover:underline font-bold">
                    ← Back to Portfolio
                </Link>
            </main>
        )
    }

    const { tag, tagColor, title, description, demoUrl, coverImage, detail } = project

    return (
        <main className="container mx-auto px-6 py-12 max-w-4xl">
            {/* Dark mode toggle */}
            <button
                className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform"
                onClick={() => document.documentElement.classList.toggle('dark')}
                aria-label="Toggle dark mode"
            >
                <span className="text-yellow-500 dark:hidden text-xl">☀️</span>
                <span className="text-blue-300 hidden dark:block text-xl">🌙</span>
            </button>

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-8 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Back to Portfolio
            </button>

            {/* Hero image */}
            <div className="rounded-3xl overflow-hidden h-72 mb-8 shadow-xl">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${tagColorMap[tagColor] || tagColorMap.blue
                            }`}
                    >
                        {tag}
                    </span>
                    <h1 className="font-display font-bold text-4xl text-slate-800 dark:text-white mt-3 mb-2">
                        {title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">{description}</p>
                </div>
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:-translate-y-0.5"
                    >
                        🔗 View Demo
                    </a>
                )}
            </div>

            {/* Detail content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Meta sidebar */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-display font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide mb-3">
                            My Role
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{detail.role}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-display font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide mb-3">
                            Tools Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {detail.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1 rounded-full"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 border border-primary/10">
                        <h3 className="font-display font-bold text-primary text-sm uppercase tracking-wide mb-3">
                            Key Outcome
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {detail.outcome}
                        </p>
                    </div>
                </div>

                {/* Main content */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                            📋 Overview
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {detail.overview}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                            🎯 The Problem
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {detail.problem}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                            🔄 My Process
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {detail.process}
                        </p>
                    </section>

                    {/* Placeholder for future images / wireframes */}
                    <section>
                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                            🖼️ Visuals
                        </h2>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-48 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-display">
                                Screenshots / wireframes coming soon
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Navigation to other projects */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-6 font-display">
                    Explore more projects →
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {projects
                        .filter((p) => p.id !== id)
                        .map((p) => (
                            <Link
                                key={p.id}
                                to={`/portfolio/${p.id}`}
                                className="bg-white dark:bg-slate-800 rounded-full px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors shadow-sm border border-slate-100 dark:border-slate-700"
                            >
                                {p.title}
                            </Link>
                        ))}
                </div>
            </div>
        </main>
    )
}
