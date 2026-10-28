import React from 'react'
import { useReveal } from '../hooks/useReveal'

// A strip of close-ups from the work, instead of more words
const details = [
    { src: 'images/lerstudie-2.jpeg', alt: 'Gips som hälls över en lerfigur' },
    { src: 'images/kudde.jpeg', alt: 'Tuftad kudde' },
    { src: 'images/bowl-2.jpeg', alt: 'Skål med stänkt glasyr' },
    { src: 'images/yann-5.jpeg', alt: 'Kopp bränd i vedugn' }
]

export default function About() {
    const [ref, visible] = useReveal()

    return (
        <section id="om-mig">
            <div ref={ref} className={`container reveal ${visible ? 'reveal-visible' : ''}`}>
                <h2 className="section-title">
                    Om mig
                </h2>

                {/* Grid: text, a red block and a strip of close-ups */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-8 md:gap-y-10 text-sm md:text-base leading-relaxed">
                    <div className="md:col-span-2">
                        <p className="!mb-0">
                            Jag är ingenjör och matematiker från KTH och har arbetat inom utbildning och energi, ofta med produktutveckling i unga startups.
                        </p>
                    </div>

                    <div className="md:col-span-2 md:row-span-2 bg-accent text-paper p-6 md:p-8 flex flex-col justify-between min-h-[16rem]">
                        <span className="text-xs">just nu</span>
                        <div>
                            <p className="font-display text-6xl md:text-7xl xl:text-8xl leading-none !mb-3">26—27</p>
                            <p className="!mb-0">Nyckelviksskolan</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <p className="!mb-0">
                            Jag tycker om att bygga saker och lösa problem, men också att skapa fritt med händerna. Jag gillar att testa idéer och nörda ner mig i verktyg, material och tekniker.
                        </p>
                    </div>

                    <div className="md:col-span-4 grid grid-cols-4 gap-2 md:gap-4 md:pt-6">
                        {details.map((d) => (
                            <img key={d.src} src={d.src} alt={d.alt} loading="lazy" className="w-full aspect-square object-cover" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
