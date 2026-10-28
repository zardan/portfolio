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
  const { openId, open, show, close } = view
  const openIndex = openId ? projects.findIndex((p) => p.id === openId) : null
  // The opened tile's position, so the project view can expand out of it
  const [origin, setOrigin] = useState(null)
  const prev = useCallback(() => show(projects[(openIndex - 1 + projects.length) % projects.length].id), [openIndex, show])
  const next = useCallback(() => show(projects[(openIndex + 1) % projects.length].id), [openIndex, show])

  const layout = overviewLayout(projects)
  // Projects that don't fit; "…" opens the first of them, and the project view's arrows go through them all
  const hidden = projects.filter((p) => !layout.tiles.some((t) => t.project === p))

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

            {layout.tiles.map(({ project, pos }) => {
              const index = projects.indexOf(project)
              return (
                <WorkTile
                  key={project.id}
                  project={project}
                  number={index + 1}
                  index={index}
                  style={wide ? area(pos) : undefined}
                  onOpen={(e) => {
                    setOrigin(e.currentTarget.getBoundingClientRect())
                    open(project.id)
                  }}
                />
              )
            })}

            {hidden.length > 0 && (
              <button
                type="button"
                aria-label={`Visa fler projekt (${hidden.length} till)`}
                onClick={(e) => {
                  setOrigin(e.currentTarget.getBoundingClientRect())
                  open(hidden[0].id)
                }}
                className="group flex flex-col justify-between p-3 lg:p-4 text-left bg-ink/5 hover:bg-ink/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={wide ? area(layout.more) : undefined}
              >
                <span className="text-small text-muted">
                  {hidden.length} till
                </span>
                <span className="font-display font-bold text-accent text-5xl lg:text-6xl leading-none transition-[letter-spacing] duration-300 group-hover:tracking-widest">
                  …
                </span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 md:mt-8 text-body md:whitespace-nowrap">
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
