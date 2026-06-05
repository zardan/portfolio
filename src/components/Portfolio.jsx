import React, { useState, useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Portfolio() {
  const [isHovering, setIsHovering] = useState(false)
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = container.children[0]?.offsetWidth || 0
    const gap = 12 // gap-3 = 12px
    const scrollAmount = (cardWidth + gap) * 3 // Scroll 3 items at a time
    
    const newScrollPosition = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })
  }

  return (
    <section id="portfolio">
      <div className="container">
        <h2 className="section-title">
            Portfolio
        </h2>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-2xl transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            &lt;
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 snap-x snap-mandatory"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onScroll={(e) => {
              // Hide scrollbar with CSS
              e.target.style.scrollbarWidth = 'none'
            }}
          >
            {projects.map((project) => (
              <div key={project.id} className="flex-shrink-0 w-full md:w-1/3 snap-start">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-2xl transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}