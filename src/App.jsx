import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Intro from './components/Intro'
import About from './components/About'
import Portfolio from './components/Portfolio'
import CV from './components/CV'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { useActiveSection } from './hooks/useActiveSection'

const sections = [
  { name: 'om mig', id: 'om-mig' },
  { name: 'på sistone', id: 'portfolio' },
  { name: 'cv', id: 'cv' },
  //{ name: 'Blog', id: 'blog' },
  { name: 'kontakt', id: 'kontakt' }
]

// 'start' (the intro) is observed too, so no menu item is marked at the top of the page
const sectionIds = ['start', ...sections.map(s => s.id)]

export default function App() {
  const activeSection = useActiveSection(sectionIds)
  // While a project is open the page underneath is hidden, so mark "på sistone" in the menu
  const [projectOpen, setProjectOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      {/* Fixed Sidebar */}
      <Sidebar activeSection={projectOpen ? 'portfolio' : activeSection} sections={sections} />

      {/* Main Content */}
      <main className="w-full md:flex-1 md:min-w-0 md:ml-64 lg:ml-72 xl:ml-80 overflow-y-scroll h-screen snap-content pt-16 md:pt-0">
        <Intro />
        <About />
        <Portfolio onProjectOpen={setProjectOpen} />
        <CV />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  )
}
