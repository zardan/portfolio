import React from 'react'
import Sidebar from './components/Sidebar'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { useActiveSection } from './hooks/useActiveSection'

const sections = [
  { name: 'Om mig', id: 'om-mig' },
  { name: 'Portfolio', id: 'portfolio' },
  //{ name: 'Blog', id: 'blog' },
  { name: 'Kontakt', id: 'kontakt' }
]

export default function App() {
  const sectionIds = sections.map(s => s.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <Sidebar activeSection={activeSection} sections={sections} />

      {/* Main Content */}
      <main className="w-4/5 ml-auto overflow-y-scroll h-screen snap-content">
        <About />
        <Portfolio />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  )
}
