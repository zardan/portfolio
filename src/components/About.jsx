import React from 'react'
import { useReveal } from '../hooks/useReveal'

// Numbered like the moodboard; 0 is where it started
const materials = [
    { n: '0', name: 'kth', note: 'ingenjör & matematiker' },
    { n: '1', name: 'lera', note: 'keramik' },
    { n: '2', name: 'garn', note: 'stickning' },
    { n: '3', name: 'ull', note: 'tuftning' }
]

export default function About() {
    const [ref, visible] = useReveal()

    return (
        <section id="om-mig">
            <div ref={ref} className={`container reveal ${visible ? 'reveal-visible' : ''}`}>
                <h2 className="section-title">
                    Om mig
                </h2>

                {/* Hairline grid: text, a red block and a material index */}
                <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-ink/20 text-sm md:text-base leading-relaxed">
                    <div className="md:col-span-2 border-r border-b border-ink/20 p-6 md:p-8">
                        <p className="!mb-0">
                            Jag är ingenjör och matematiker från KTH och har arbetat inom utbildning och energi, ofta med produktutveckling i unga startups.
                        </p>
                    </div>

                    <div className="md:col-span-2 md:row-span-2 border-r border-b border-ink/20 bg-accent text-paper p-6 md:p-8 flex flex-col justify-between min-h-[16rem]">
                        <span className="text-xs">just nu</span>
                        <div>
                            <p className="font-display text-6xl md:text-7xl xl:text-8xl leading-none !mb-3">26—27</p>
                            <p className="!mb-0">Nyckelviksskolan</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 border-r border-b border-ink/20 p-6 md:p-8">
                        <p className="!mb-0">
                            Jag tycker om att bygga saker och lösa problem, men också att skapa fritt med händerna. Jag gillar att testa idéer och nörda ner mig i verktyg, material och tekniker.
                        </p>
                    </div>

                    <ul className="md:col-span-4 grid grid-cols-2 md:grid-cols-4">
                        {materials.map((m) => (
                            <li key={m.n} className="border-r border-b border-ink/20 p-6 md:p-8">
                                <span className={`font-display text-4xl md:text-5xl leading-none ${m.n === '0' ? 'text-ink/40' : 'text-accent'}`}>
                                    {m.n}.
                                </span>
                                <span className="block font-display text-xl md:text-2xl mt-4">{m.name}</span>
                                <span className="block text-xs text-ink/60 mt-1">{m.note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
