import React from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { useReveal } from '../hooks/useReveal'

export default function Portfolio() {
  const [titleRef, titleVisible] = useReveal()

  return (
    <section id="portfolio">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title reveal ${titleVisible ? 'reveal-visible' : ''}`}
        >
          Portfolio
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
