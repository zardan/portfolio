import React from 'react'
import { useReveal } from '../hooks/useReveal'

const links = [
  { label: 'e-post', text: 'sara.cedernaes@gmail.com', href: 'mailto:sara.cedernaes@gmail.com' },
  { label: 'instagram', text: '@saracedernaes', href: 'https://www.instagram.com/saracedernaes/' },
  { label: 'linkedin', text: 'sara-viktoria', href: 'https://www.linkedin.com/in/sara-viktoria/' }
]

export default function Contact() {
  const [titleRef, titleVisible] = useReveal()

  return (
    <section id="kontakt" className="min-h-[70vh]">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title text-5xl md:text-8xl lg:text-9xl reveal ${titleVisible ? 'reveal-visible' : ''}`}
        >
          Säg hej.
        </h2>
        <ul className="max-w-3xl text-sm border-t border-ink/20">
          {links.map((link) => (
            <li key={link.label} className="border-b border-ink/20">
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 py-4 hover:text-accent transition-colors"
              >
                <span className="flex-1 min-w-0 md:grid md:grid-cols-[9rem_1fr] md:gap-4">
                  <span className="block text-xs md:text-sm text-ink/60 group-hover:text-accent transition-colors">{link.label}</span>
                  <span className="block break-all">{link.text}</span>
                </span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
