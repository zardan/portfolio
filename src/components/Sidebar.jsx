import React, { useState } from 'react'

export default function Sidebar({ activeSection, sections }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-paper border-b border-ink/15">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#start"><h1 className="text-xl">sara cedernaes</h1></a>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="relative w-6 h-4 flex flex-col justify-between shrink-0"
          >
            <span
              className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-ink transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${
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
                  className="block text-xl font-display font-bold"
                >
                  <span className={isActive ? 'text-accent' : 'text-ink'}>
                    {section.name}
                  </span>
                </a>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 xl:w-80 h-screen fixed left-0 top-0 bg-paper p-8 xl:p-10 flex-col justify-start border-r border-ink/15">
        {/* Name and intro */}
        <div>
          <a href="#start">
            <h1 className="text-2xl xl:text-3xl my-5 break-words fade-in">
              sara<br />cedernaes
            </h1>
          </a>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mt-12">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav-link flex items-center gap-2 text-xl font-display font-bold"
              >
                <span
                  aria-hidden="true"
                  className={`w-2.5 h-2.5 rounded-full bg-accent transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />
                <span className={isActive ? 'text-accent' : 'text-ink'}>
                  {section.name}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="text-xs text-ink/50 mt-auto">
          © {new Date().getFullYear()} Sara Cedernaes. All rights reserved.
        </div>
      </div>
    </>
  )
}
