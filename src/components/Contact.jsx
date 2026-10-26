import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const [titleRef, titleVisible] = useReveal()

  return (
    <section id="kontakt" className="min-h-[70vh]">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title text-6xl md:text-9xl reveal ${titleVisible ? 'reveal-visible' : ''}`}
        >
          säg hej.
        </h2>
        <p className="text-sm">
          <a className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent" href="mailto:sara.cedernaes@gmail.com">sara.cedernaes@gmail.com</a>
        </p>
      </div>
    </section>
  )
}
