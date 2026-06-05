import React, { useState, useEffect } from 'react'

export default function ProjectCard({ project }) {
    const [imageIndex, setImageIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        if (!isHovering || project.images.length <= 1) return

        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % project.images.length)
        }, 1000)

        return () => clearInterval(interval)
    }, [isHovering, project.images.length])

    return (
        <a
            key={project.id}
            href={project.link}
            className={`group relative overflow-hidden ${project.link && project.link !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                setImageIndex(0)
            }}
        >
            <img
                src={project.images[imageIndex]}
                alt={project.title}
                className="w-full aspect-square object-cover transition-opacity duration-100"
            />
            <div className="absolute inset-0 transition-colors duration-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                    <h3 className="text-white text-lg">{project.title}</h3>
                </div>
            </div>
        </a>
    )
}
