import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const [titleRef, titleVisible] = useReveal()

  return (
    <section id="kontakt">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title reveal ${titleVisible ? 'reveal-visible' : ''}`}
        >
          Kontakt
        </h2>
        <p className="text-gray-600">Email: <a className="text-blue-600" href="mailto:sara.cedernaes@gmail.com">sara.cedernaes@gmail.com</a></p>
      </div>
    </section>
  )
}
