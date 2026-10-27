import React, { useCallback, useState } from 'react'
import { projects } from '../data/projects'
import WorkTile from './WorkTile'
import ProjectView from './ProjectView'
import { useReveal } from '../hooks/useReveal'

export default function Portfolio() {
  const [titleRef, titleVisible] = useReveal()
  const [openIndex, setOpenIndex] = useState(null)
  // The opened tile's position, so the project view can expand out of it
  const [origin, setOrigin] = useState(null)
  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(() => setOpenIndex((i) => (i - 1 + projects.length) % projects.length), [])
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % projects.length), [])

  return (
    <section id="portfolio">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title reveal ${titleVisible ? 'reveal-visible' : ''}`}
        >
          på sistone
        </h2>

        <div className="work-grid-wrap">
          <div className="work-grid">
            {projects.map((project, index) => (
              <WorkTile
                key={project.id}
                project={project}
                number={index + 1}
                index={index}
                onOpen={(e) => {
                  setOrigin(e.currentTarget.getBoundingClientRect())
                  setOpenIndex(index)
                }}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm max-w-lg">
          Jag tar emot beställningar. Säg till om något fångar ditt öga.{' '}
          <a href="#kontakt" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">Kontakt →</a>
        </p>
      </div>

      {openIndex !== null && (
        <ProjectView
          project={projects[openIndex]}
          number={openIndex + 1}
          total={projects.length}
          origin={origin}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
