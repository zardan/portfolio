import React from 'react'
import Sidebar from './components/Sidebar'
import Intro from './components/Intro'
import About from './components/About'
import Portfolio from './components/Portfolio'
import CV from './components/CV'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { useActiveSection } from './hooks/useActiveSection'
import { useProjectView } from './hooks/useProjectView'

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
  const projectView = useProjectView()

  return (
    <div className="flex flex-col md:flex-row">
      {/* Fixed Sidebar */}
      {/* While a project is open the page underneath is hidden, so the menu marks "på sistone" and lists the projects */}
      <Sidebar
        activeSection={projectView.openId ? 'portfolio' : activeSection}
        sections={sections}
        openProject={projectView.openId}
        onShowProject={projectView.show}
      />

      {/* Main Content */}
      <main className="w-full md:flex-1 md:min-w-0 md:ml-64 lg:ml-72 xl:ml-80 overflow-y-scroll h-screen snap-content pt-16 md:pt-0">
        <Intro />
        <About />
        <Portfolio view={projectView} />
        <CV />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  )
}
