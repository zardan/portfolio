import React from 'react'
import { cv } from '../data/cv'
import { useReveal } from '../hooks/useReveal'

export default function CV() {
    const [ref, visible] = useReveal()

    return (
        <section id="cv">
            <div ref={ref} className={`container reveal ${visible ? 'reveal-visible' : ''}`}>
                <h2 className="section-title">
                    cv
                </h2>
                <div className="max-w-3xl space-y-12">
                    {cv.map((group) => (
                        <div key={group.heading}>
                            <h3 className="text-xl md:text-2xl mb-4 pb-2 border-b border-ink/20">
                                {group.heading}
                            </h3>
                            <dl className="text-body">
                                {group.items.map((item) => (
                                    <div key={item.title} className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr] gap-4 py-2">
                                        <dt className="text-muted">{item.years}</dt>
                                        <dd>
                                            <span className="font-normal">{item.title}</span>
                                            {item.detail && <span className="block text-muted">{item.detail}</span>}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
