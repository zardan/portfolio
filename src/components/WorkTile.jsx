import React from 'react'
import { useReveal } from '../hooks/useReveal'

const spans = {
    small: '',
    wide: 'col-span-2',
    tall: 'row-span-2',
    large: 'col-span-2 row-span-2'
}

export default function WorkTile({ project, image, number, isFirst, index = 0 }) {
    const [tileRef, isVisible] = useReveal()

    return (
        <figure
            ref={tileRef}
            className={`reveal group relative overflow-hidden bg-ink/5 ${spans[image.size] ?? ''} ${isVisible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: `${index * 60}ms` }}
        >
            <img
                src={import.meta.env.BASE_URL + image.src}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={image.position ? { objectPosition: image.position } : undefined}
            />

            {isFirst && (
                <span className="absolute top-0 left-0 bg-paper px-2 pt-1.5 pb-1 md:px-3 md:pt-2 font-display font-bold text-accent text-2xl md:text-4xl leading-none">
                    {number}.
                </span>
            )}

            <figcaption
                className={`absolute inset-x-0 bottom-0 px-2 py-1.5 md:p-4 bg-paper/90 text-ink transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${isFirst ? '' : 'hidden md:block'}`}
            >
                <span className="block font-normal text-xs md:text-sm leading-tight">{project.title}</span>
                {project.tags?.length > 0 && (
                    <span className="hidden md:block text-xs text-ink/60 mt-1 tracking-wide uppercase">
                        {project.tags.join(' · ')}
                    </span>
                )}
            </figcaption>
        </figure>
    )
}
