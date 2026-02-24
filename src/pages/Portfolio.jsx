import FlipCard from '../components/FlipCard'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects.json'

export default function Portfolio() {
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

            {/* Hero – same layout as Home */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10">
                {/* Left */}
                <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
                    <h2 className="font-display font-bold text-4xl lg:text-6xl text-slate-800 dark:text-white leading-tight mb-4">
                        My <br />
                        <span className="text-primary">Portfolio</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        A collection of product work spanning UX research, automation, and e-commerce. Each project tells a story of problems solved and users delighted.
                    </p>
                </div>

                {/* Center – flip card (same as Home) */}
                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                    <FlipCard />
                </div>

                {/* Right – stats sticky note */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end order-3">
                    <div className="relative w-64 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-primary shadow-sm border border-primary/50" />
                        <div className="bg-white dark:bg-slate-700 p-6 shadow-xl rounded-lg border border-slate-100 dark:border-slate-600">
                            <p className="font-display font-bold text-slate-700 dark:text-slate-200 text-sm mb-3 uppercase tracking-wide">By the numbers</p>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Projects</span>
                                    <span className="font-bold text-primary">{projects.length}+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Years exp.</span>
                                    <span className="font-bold text-primary">3+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Users impacted</span>
                                    <span className="font-bold text-primary">50K+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects grid */}
            <section className="relative">
                <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-8 text-center lg:text-left">
                    Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </main>
    )
}
