import { Link } from 'react-router-dom'
import FlipCard from '../components/FlipCard'

const skills = [
    'React', 'Node.js', 'Supabase', 'Vercel',
    'Prompt Engineering', 'LLM API', 'AI Agent',
    'PRD', 'OKR', 'User Research', 'Competitive Analysis',
    'User Interviews', 'Persona', 'User Journey',
]

const timeline = [
    {
        period: '2023 Aug – Present',
        role: 'Frontend Engineer',
        company: '雄獅資訊',
        note: 'React development, building internal tools and consumer-facing features.',
    },
    {
        period: '2021 – 2023',
        role: 'PM',
        company: '歐中貿易（捷克）',
        note: '50+ projects, led 10-person team to trade shows in China, expanded Shopify revenue 2×.',
    },
    {
        period: '2019 – 2021',
        role: 'PM',
        company: '巨騰蘇州',
        note: 'Collaborated with Microsoft (Surface) and Facebook (Portal). Resolved enterprise escalations in 2 weeks, saving 50% cost.',
    },
    {
        period: '2017 – 2019',
        role: 'PMC Supervisor',
        company: 'Chicony（捷克）',
        note: 'Managed 40% market share region across European accounts.',
    },
]

export default function About() {
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
                        Builder PM. Frontend engineer. Former cross-national project manager.
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
                            Frontend engineer with 2 years of hands-on React experience, now building AI products as a PM. I write code and ship PRDs—my engineering background means fewer spec gaps and faster iteration with dev teams.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Before pivoting to tech, I spent 5+ years as a cross-national PM—managing 50+ projects at a Czech-China trade company, leading a 10-person team to trade shows in China, and resolving enterprise client escalations (Microsoft Surface, Facebook Portal) within 2 weeks.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-transparent">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Now I&apos;m building AI-native products: an LLM career coach for 104 (Taiwan&apos;s largest job platform) and a gamified coffee origin card game with LINE Login and a Gacha mechanic. Both built with real PRDs, real users, and real deployments.
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
