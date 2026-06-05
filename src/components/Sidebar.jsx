import React from 'react'

export default function Sidebar({ activeSection, sections }) {
  return (
    <div className="w-1/5 h-screen fixed left-0 top-0 bg-white p-10 flex flex-col justify-start border-r border-gray-200">
      {/* Name and intro */}
      <div>
        <h1 className="text-3xl p-2 my-5 major-mono-display-regular">
          Sara Cedernaes &#9658;
        </h1>
        <p className="text-sm text-gray-600">
            Skapa saker. Analoga som digitala. Utforska material. Se vad som händer. 
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 major-mono mt-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center text-lg font-bold transition-all duration-400"
            >
              <span className={isActive ? 'bg-gray-700 text-white p-1' : 'text-gray-600 p-1'}>
                {section.name}
              </span>
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="text-xs text-gray-400 mt-auto">
        © {new Date().getFullYear()} Sara Cedernaes. All rights reserved.
      </div>
    </div>
  )
}
