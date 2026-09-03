import React from 'react'
import Sidebar from './components/Sidebar'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { useActiveSection } from './hooks/useActiveSection'

const sections = [
 // { name: 'Om mig', id: 'om-mig' },
  { name: 'Portfolio', id: 'portfolio' },
  //{ name: 'Blog', id: 'blog' },
  { name: 'Kontakt', id: 'kontakt' }
]

export default function App() {
  const sectionIds = sections.map(s => s.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <div className="flex flex-col md:flex-row">
      {/* Fixed Sidebar */}
      <Sidebar activeSection={activeSection} sections={sections} />

      {/* Main Content */}
      <main className="w-full md:w-4/5 md:ml-auto overflow-y-scroll h-screen snap-content pt-16 md:pt-0">
        {/* <About /> */}
        <Portfolio />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  )
}
