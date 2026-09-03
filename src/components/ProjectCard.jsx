import React, { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function ProjectCard({ project, index = 0 }) {
    const [imageIndex, setImageIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [cardRef, isVisible] = useReveal()

    useEffect(() => {
        if (!isHovering || project.images.length <= 1) return

        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % project.images.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [isHovering, project.images.length])

    return (
        <a
            ref={cardRef}
            href={project.link}
            className={`reveal block ${isVisible ? 'reveal-visible' : ''} ${project.link && project.link !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                setImageIndex(0)
            }}
        >
            <div className="relative overflow-hidden aspect-square bg-gray-50">
                {project.images.map((src, i) => (
                    <img
                        key={src}
                        src={import.meta.env.BASE_URL + src}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out ${
                            i === imageIndex ? 'opacity-100' : 'opacity-0'
                        } ${isHovering ? 'scale-105' : 'scale-100'}`}
                    />
                ))}
            </div>

            <div className="pt-3">
                <h3 className="text-base">{project.title}</h3>
                {project.tags?.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1 tracking-wide uppercase">
                        {project.tags.join(' · ')}
                    </p>
                )}
            </div>
        </a>
    )
}
