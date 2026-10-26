import { useState, useEffect } from 'react'

// A section is active while it crosses a line 30% down the viewport,
// which also works for sections taller than the screen.
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -70% 0px' }
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
