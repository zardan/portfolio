import React from 'react'

export default function Intro() {
    return (
        <section id="start" className="!pb-0">
            <div className="container w-full fade-in">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-x-4 md:gap-x-6 items-end">
                    {/* Name: big, stacked, overlapping the photo's left edge on desktop */}
                    <h2 className="relative z-10 col-span-6 md:col-span-7 md:row-start-1 text-accent text-5xl sm:text-6xl lg:text-6xl xl:text-7xl leading-[0.9] pb-6 md:pb-10">
                        Sara<br />Cedernaes
                    </h2>

                    {/* Photo with the red circle motif half over its corner */}
                    <figure className="relative col-span-5 col-start-2 md:col-span-5 md:col-start-8 md:row-start-1 mt-8 md:mt-0">
                        <span
                            aria-hidden="true"
                            className="absolute -left-10 -top-10 md:-left-16 md:-top-16 w-28 h-28 md:w-44 md:h-44 rounded-full bg-accent"
                        />
                        <img
                            src="images/sara.jpeg"
                            alt="Sara Cedernaes i fleecejacka, svartvitt porträtt"
                            className="relative w-full aspect-[3/4] object-cover mix-blend-multiply"
                        />
                        <figcaption className="mt-2 text-small text-muted">
                            hello
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    )
}
