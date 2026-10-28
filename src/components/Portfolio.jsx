import React, { useCallback, useEffect, useState } from 'react'
import { projects } from '../data/projects'
import WorkTile from './WorkTile'
import ProjectView from './ProjectView'
import { useReveal } from '../hooks/useReveal'
import { overviewLayout, heading } from './overviewGrid'

// The overview is placed cell by cell from lg up (see overviewGrid.js); below that the tiles flow two by two
const wideQuery = '(min-width: 1024px)'
const useWide = () => {
  const [wide, setWide] = useState(() => window.matchMedia(wideQuery).matches)
  useEffect(() => {
    const query = window.matchMedia(wideQuery)
    const sync = () => setWide(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  return wide
}

const area = ({ col, row, w, h }) => ({ gridColumn: `${col} / span ${w}`, gridRow: `${row} / span ${h}` })

// view: the open project and how to open, switch and close it (useProjectView)
export default function Portfolio({ view }) {
  const [titleRef, titleVisible] = useReveal()
  const wide = useWide()
  // "…" shows every project; the grid then grows past one screen
  const [showAll, setShowAll] = useState(false)
  const { openId, open, show, close } = view
  const openIndex = openId ? projects.findIndex((p) => p.id === openId) : null
  // The opened tile's position, so the project view can expand out of it
  const [origin, setOrigin] = useState(null)
  const prev = useCallback(() => show(projects[(openIndex - 1 + projects.length) % projects.length].id), [openIndex, show])
  const next = useCallback(() => show(projects[(openIndex + 1) % projects.length].id), [openIndex, show])

  const layout = overviewLayout(projects)
  const tiles = showAll ? projects.map((project) => ({ project })) : layout.tiles
  const hidden = projects.length - layout.tiles.length
  // Placed only while collapsed on a wide screen; otherwise the tiles flow in order
  const placed = wide && !showAll

  // In the grid's top-left cells on a wide screen (like om mig), above the grid otherwise
  const title = (
    <div
      ref={titleRef}
      className={`reveal [container-type:inline-size] ${titleVisible ? 'reveal-visible' : ''}`}
      style={wide ? area(heading) : undefined}
    >
      <h2 className={`section-title ${wide ? '!pb-0' : ''}`}>
        {/* Shrinks to fit its cells: "sistone" is 5.2em wide */}
        <span className="block text-[min(1em,19cqw)]">på sistone</span>
      </h2>
    </div>
  )

  return (
    <section id="portfolio">
      <div className="container">
        {!wide && title}
        <div className="work-grid-wrap">
          <div className="work-grid">
            {wide && title}

            {tiles.map(({ project, pos }) => {
              const index = projects.indexOf(project)
              return (
                <WorkTile
                  key={project.id}
                  project={project}
                  number={index + 1}
                  index={index}
                  style={placed ? area(pos) : undefined}
                  onOpen={(e) => {
                    setOrigin(e.currentTarget.getBoundingClientRect())
                    open(project.id)
                  }}
                />
              )
            })}

            {hidden > 0 && (
              <button
                type="button"
                onClick={() => setShowAll((all) => !all)}
                aria-expanded={showAll}
                className="group flex flex-col justify-between p-3 lg:p-4 text-left bg-ink/5 hover:bg-ink/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={placed ? area(layout.more) : undefined}
              >
                <span className="text-xs text-ink/60">
                  {showAll ? 'visa färre' : `${hidden} till`}
                </span>
                <span className="font-display font-bold text-accent text-5xl lg:text-6xl leading-none transition-[letter-spacing] duration-300 group-hover:tracking-widest">
                  {showAll ? '←' : '…'}
                </span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 md:mt-8 text-sm md:whitespace-nowrap">
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
