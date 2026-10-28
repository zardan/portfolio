import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function About() {
    const [ref, visible] = useReveal()

    return (
        <section id="om-mig">
            <div ref={ref} className={`container reveal ${visible ? 'reveal-visible' : ''}`}>
                {/* Grid: heading and text beside two photos, then and now, with the red block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 text-body leading-relaxed">
                    <div className="col-span-2 md:row-span-2 flex flex-col justify-between gap-8 pb-4 md:pb-0 md:pr-5">
                        <h2 className="section-title !pb-0">
                            Om mig
                        </h2>
                        <div>
                            <p>
                                Jag är ingenjör och matematiker från KTH och har arbetat inom utbildning och energi, ofta med produktutveckling i unga startups.
                            </p>
                            <p className="!mb-0">
                                Jag tycker om att bygga saker och lösa problem, men också att skapa fritt med händerna. Jag gillar att testa idéer och nörda ner mig i verktyg, material och tekniker.
                            </p>
                        </div>
                    </div>

                    <img
                        src="images/om-mig-kth.jpeg"
                        alt="KTH:s tegelfasad med vildvin i höstfärger"
                        className="col-span-2 w-full aspect-[4/3] object-cover"
                    />

                    <div className="[container-type:inline-size] aspect-square bg-accent text-paper p-4 lg:p-6 flex flex-col justify-between">
                        <span className="text-small">just nu</span>
                        <div>
                            <p className="font-display text-[21cqw] whitespace-nowrap leading-none !mb-2">26—27</p>
                            <p className="text-small !mb-0">Nyckelviksskolan</p>
                        </div>
                    </div>

                    <img
                        src="images/om-mig-ugn.jpeg"
                        alt="Lergods i en vedeldad jordugn"
                        className="w-full aspect-square object-cover object-[50%_45%]"
                    />
                </div>
            </div>
        </section>
    )
}
