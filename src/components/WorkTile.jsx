import React from 'react'
import { useReveal } from '../hooks/useReveal'

const spans = {
    small: '',
    wide: 'col-span-2',
    tall: 'row-span-2',
    large: 'col-span-2 row-span-2'
}

// Only the cover and its number: title and tags show when the project is opened
export default function WorkTile({ project, number, onOpen, index = 0, style }) {
    const [tileRef, isVisible] = useReveal()
    const { cover } = project

    return (
        <button
            type="button"
            ref={tileRef}
            onClick={onOpen}
            aria-label={`Visa projekt: ${project.title}`}
            className={`reveal group relative text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${spans[cover.size] ?? ''} ${isVisible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: `${index * 60}ms`, ...style }}
        >
            <span className="absolute inset-0 overflow-hidden bg-ink/5">
                <img
                    src={import.meta.env.BASE_URL + cover.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={cover.position ? { objectPosition: cover.position } : undefined}
                />
            </span>

            {/* Red circle with the number, half over the corner like the one on the intro photo */}
            <span className="absolute -left-2 -top-2 md:-left-3 md:-top-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent text-paper text-xs md:text-sm font-normal flex items-center justify-center">
                {number}
            </span>
        </button>
    )
}
