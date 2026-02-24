import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'About Me', to: '/about' },
]

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <ul className="flex items-center space-x-8 font-display font-bold text-lg text-slate-600 dark:text-slate-300">
                    {navLinks.map(({ label, to }) => {
                        const isActive = pathname === to
                        return (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className={`hover:text-primary transition-colors pb-0.5 border-b-2 ${isActive
                                            ? 'border-primary text-primary'
                                            : 'border-transparent hover:border-primary'
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <a
                    href="/cv.pdf"
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Download CV
                </a>
            </div>
        </nav>
    )
}
