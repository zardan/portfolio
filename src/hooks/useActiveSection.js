import { useState, useEffect } from 'react'

// The active section is the one that fills most of the screen. (A line 30% down the
// viewport missed short sections: with the på sistone grid fully in view low on the
// screen, the line still crossed om mig.)
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    let frame = null

    const update = () => {
      frame = null
      const viewport = window.innerHeight
      let best = null
      let bestVisible = 0
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return
        const { top, bottom } = element.getBoundingClientRect()
        const visible = Math.min(bottom, viewport) - Math.max(top, 0)
        if (visible > bestVisible) {
          best = id
          bestVisible = visible
        }
      })
      // At the bottom of the page the last section is the one being read, however short
      const last = document.getElementById(sectionIds[sectionIds.length - 1])
      if (last && last.getBoundingClientRect().bottom <= viewport + 1) best = last.id
      setActiveSection(best)
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    // Capture, so the scroll of <main> (the scroll area on desktop) is heard too
    document.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    update()

    return () => {
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [sectionIds])

  return activeSection
}
