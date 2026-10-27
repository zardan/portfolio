import React, { useEffect, useRef } from 'react'

export default function ProjectView({ project, number, onClose }) {
    const closeRef = useRef(null)

    // Focus the close button on open, close on Escape, and give focus back on close
    useEffect(() => {
        const previous = document.activeElement
        closeRef.current?.focus()

        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('keydown', onKey)
            previous?.focus?.()
        }
    }, [onClose])

    const src = (path) => import.meta.env.BASE_URL + path

    return (
        <div
            className="fixed inset-0 z-50 bg-ink/40 overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-view-title"
                className="relative bg-paper min-h-full md:min-h-0 md:my-10 md:mx-auto md:max-w-4xl px-6 py-16 md:p-12"
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Stäng"
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-2xl hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                    ✕
                </button>

                <img
                    src={src(project.cover.src)}
                    alt={project.title}
                    className="w-full max-h-[75vh] object-contain"
                />

                <div className="mt-8 md:mt-10 md:grid md:grid-cols-[auto_1fr] md:gap-8">
                    <span className="block font-display font-bold text-accent text-4xl md:text-5xl leading-none">
                        {number}.
                    </span>
                    <div>
                        <h3 id="project-view-title" className="text-accent text-2xl md:text-3xl mt-4 md:mt-0">
                            {project.title}
                        </h3>
                        {project.tags?.length > 0 && (
                            <p className="text-xs text-ink/60 mt-3 tracking-wide uppercase">
                                {project.tags.join(' · ')}
                            </p>
                        )}
                        {project.description && (
                            <p className="mt-6 text-sm md:text-base leading-relaxed max-w-xl">
                                {project.description}
                            </p>
                        )}
                    </div>
                </div>

                {project.process?.length > 0 && (
                    <div className="mt-10 md:mt-14">
                        <h4 className="text-lg md:text-xl mb-4 pb-2 border-b border-ink/20">process</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {project.process.map((path) => (
                                <img
                                    key={path}
                                    src={src(path)}
                                    alt={`${project.title}, process`}
                                    loading="lazy"
                                    className="w-full h-auto"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
