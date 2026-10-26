import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function About() {
    const [ref, visible] = useReveal()

    return (
        <section id="om-mig">
            <div ref={ref} className={`container reveal ${visible ? 'reveal-visible' : ''}`}>
                <h2 className="section-title">
                    om mig
                </h2>
                <div className="max-w-2xl text-sm md:text-base leading-relaxed">
                    <p>
                        Jag är ingenjör och matematiker från KTH och har arbetat inom utbildning och energi, ofta med produktutveckling i unga startups.
                    </p>
                    <p>
                        Jag tycker om att bygga saker och lösa problem, men också om att skapa fritt med händerna. På senare tid har det blivit mycket hantverk i form av keramik, stickning och tuftning.
                    </p>
                    <p>
                        För mig liknar ingenjörsarbete och hantverk varandra. Båda handlar om att testa idéer, nörda ner sig i verktyg, material och tekniker. Samtidigt har de förstås olika processer och syften.
                    </p>
                </div>
            </div>
        </section>
    )
}
