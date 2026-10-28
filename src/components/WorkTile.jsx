import React from 'react'
import { useReveal } from '../hooks/useReveal'

const spans = {
    small: '',
    wide: 'col-span-2',
    tall: 'row-span-2',
    large: 'col-span-2 row-span-2'
}

// Where the number circle sits inside the tile, varied from tile to tile
const corners = [
    'top-3 left-3 md:top-4 md:left-4',
    'bottom-3 right-3 md:bottom-4 md:right-4',
    'top-3 right-3 md:top-4 md:right-4',
    'bottom-3 left-3 md:bottom-4 md:left-4'
]

// Only the cover and its number: title and tags show when the project is opened
export default function WorkTile({ project, number, onOpen, index = 0, style }) {
    const [tileRef, isVisible] = useReveal()
    const { cover } = project
    const small = !cover.size || cover.size === 'small'
    // Trying a light circle on a couple of tiles
    const light = number === 3 || number === 6

    return (
        <button
            type="button"
            ref={tileRef}
            onClick={onOpen}
            aria-label={`Visa projekt: ${project.title}`}
            data-cursor="öppna"
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

            {/* Number circle, see-through like the red circle on the intro photo; smaller on 1×1 tiles */}
            <span className={`absolute ${corners[index % corners.length]} ${small ? 'w-10 h-10 md:w-12 md:h-12 text-base md:text-lg' : 'w-14 h-14 md:w-20 md:h-20 text-xl md:text-3xl'} rounded-full flex items-center justify-center`}>
                <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full ${light ? 'bg-paper/75' : 'bg-accent/80'}`}
                />
                <span className={`relative font-normal leading-none ${light ? 'text-accent' : 'text-paper'}`}>{number}</span>
            </span>
        </button>
    )
}
