import React, { useState } from 'react'

export default function Sidebar({ activeSection, sections }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-lg">Sara Cedernaes</h1>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="relative w-6 h-4 flex flex-col justify-between shrink-0"
          >
            <span
              className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-gray-700 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        <nav
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <div className="px-6 pb-4 space-y-3">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold major-mono"
                >
                  <span className={isActive ? 'bg-gray-700 text-white p-1' : 'text-gray-600 p-1'}>
                    {section.name}
                  </span>
                </a>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-1/5 h-screen fixed left-0 top-0 bg-white p-10 flex-col justify-start border-r border-gray-200">
        {/* Name and intro */}
        <div>
          <h1 className="text-3xl p-2 my-5 fade-in">
            Sara Cedernaes
          </h1>
          <p>
            Nyckelviksskolan 2026-2027
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
                className="nav-link flex items-center text-lg font-bold"
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
    </>
  )
}
