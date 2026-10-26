import React from 'react'
import { projects } from '../data/projects'
import WorkTile from './WorkTile'
import { useReveal } from '../hooks/useReveal'

export default function Portfolio() {
  const [titleRef, titleVisible] = useReveal()

  const tiles = projects.flatMap((project, p) =>
    project.images.map((image, i) => ({ project, image, number: p + 1, isFirst: i === 0 }))
  )

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
            {tiles.map((tile, index) => (
              <WorkTile key={tile.image.src} {...tile} index={index} />
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm max-w-lg">
          Jag tar emot beställningar. Säg till om något fångar ditt öga.{' '}
          <a href="#kontakt" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">Kontakt →</a>
        </p>
      </div>
    </section>
  )
}
