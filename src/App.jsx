import React from 'react'
import Sidebar from './components/Sidebar'
import Intro from './components/Intro'
import About from './components/About'
import Portfolio from './components/Portfolio'
import CV from './components/CV'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { useActiveSection } from './hooks/useActiveSection'

const sections = [
  { name: 'arbeten', id: 'portfolio' },
  { name: 'om mig', id: 'om-mig' },
  { name: 'cv', id: 'cv' },
  //{ name: 'Blog', id: 'blog' },
  { name: 'kontakt', id: 'kontakt' }
]

const sectionIds = sections.map(s => s.id)

export default function App() {
  const activeSection = useActiveSection(sectionIds)

  return (
    <div className="flex flex-col md:flex-row">
      {/* Fixed Sidebar */}
      <Sidebar activeSection={activeSection} sections={sections} />

      {/* Main Content */}
      <main className="w-full md:w-4/5 md:ml-auto overflow-y-scroll h-screen snap-content pt-16 md:pt-0">
        <Intro />
        <Portfolio />
        <About />
        <CV />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  )
}
