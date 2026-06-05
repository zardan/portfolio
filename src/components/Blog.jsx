import React from 'react'
import Hello from '../content/hello.mdx'

export default function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <h2 className="section-title">
            Blogg
        </h2>
        <article className="prose max-w-none">
          <Hello />
        </article>
      </div>
    </section>
  )
}
