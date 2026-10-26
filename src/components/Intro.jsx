import React from 'react'

export default function Intro() {
    return (
        <section id="start" className="min-h-screen flex items-center !py-0">
            <div className="container w-full fade-in">
                <p className="text-xs uppercase tracking-widest text-ink/60 mb-6">
                    Keramik · Textil · Ingenjörskonst
                </p>
                <h2 className="text-accent text-4xl md:text-6xl lg:text-8xl">
                    ingenjör<br />som lär sig<br />lera.
                </h2>
                <div className="mt-10 flex items-center gap-4">
                    <span className="block shrink-0 w-4 h-4 rounded-full bg-accent" aria-hidden="true" />
                    <p className="!mb-0 text-sm max-w-sm">
                        Sara Cedernaes. Just nu på Nyckelviksskolan, 2026–2027.
                    </p>
                </div>
            </div>
        </section>
    )
}
