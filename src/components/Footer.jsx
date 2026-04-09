export default function Footer() {
    return (
        <footer className="container mx-auto px-6 py-8 border-t border-primary/10 dark:border-slate-700 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 md:mb-0">
                    © 2024 [Your Name]. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://www.linkedin.com/in/cheryl-li-75500b165/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                    <a
                        href="mailto:cherylrueichun@gmail.com"
                        className="text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                        aria-label="Email"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}
