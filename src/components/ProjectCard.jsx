import { Link } from 'react-router-dom'

const tagColorMap = {
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300',
}

export default function ProjectCard({ project }) {
    const { id, tag, tagColor, title, description, demoUrl, coverImage } = project

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-primary/10 flex flex-col">
            {/* Cover image */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl h-48 mb-6 overflow-hidden relative">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Tag */}
            <div className="flex justify-between items-center mb-2">
                <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${tagColorMap[tagColor] || tagColorMap.blue
                        }`}
                >
                    {tag}
                </span>
            </div>

            {/* Title + description */}
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">{description}</p>

            {/* Actions row */}
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
                <Link
                    to={`/portfolio/${id}`}
                    className="flex-1 text-center text-sm font-bold text-primary hover:underline py-1"
                >
                    View Details →
                </Link>
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm font-bold bg-primary/10 hover:bg-primary/20 text-primary py-1 px-3 rounded-full transition-colors"
                    >
                        🔗 Demo
                    </a>
                )}
            </div>
        </div>
    )
}
