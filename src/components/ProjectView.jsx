import React, { useEffect, useRef } from 'react'

const src = (path) => import.meta.env.BASE_URL + path

// A fixed-ratio image cell, so every layout stays on a strict grid
function Cell({ path, alt = '', className = '', position }) {
    return (
        <div className={`relative overflow-hidden bg-ink/5 ${className}`}>
            <img
                src={src(path)}
                alt={alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={position ? { objectPosition: position } : undefined}
            />
        </div>
    )
}

function ProjectNumber({ number, className = '' }) {
    return (
        <span className={`block font-display font-bold text-accent leading-none ${className}`}>
            {number}.
        </span>
    )
}

function Title({ project, className = '' }) {
    return (
        <h3 id="project-view-title" className={`text-accent ${className}`}>
            {project.title}
        </h3>
    )
}

function Tags({ project }) {
    if (!project.tags?.length) return null
    return (
        <p className="!mb-0 text-xs text-ink/60 tracking-wide uppercase">
            {project.tags.join(' · ')}
        </p>
    )
}

function Description({ project, className = '' }) {
    if (!project.description) return null
    return (
        <p className={`!mb-0 text-sm leading-relaxed ${className}`}>
            {project.description}
        </p>
    )
}

// The project's other images, as cells in the same grid as the cover and text
function Images({ project, className }) {
    return (project.images ?? []).map(asImage).map((image, i) => (
        <Cell key={image.src} path={image.src} alt={`${project.title}, bild ${i + 2}`} position={image.position} className={className} />
    ))
}

// Text left, cover right, the other images continuing in the same grid underneath
function HeroLayout({ project, number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-2 md:col-span-5 flex flex-col gap-5 order-2 md:order-1">
                <ProjectNumber number={number} className="text-6xl md:text-8xl" />
                <Title project={project} className="text-2xl md:text-4xl" />
                <Tags project={project} />
                <Description project={project} className="md:mt-auto" />
            </div>
            <Cell
                path={project.cover.src}
                alt={project.title}
                position={project.cover.position}
                className="col-span-2 md:col-span-7 aspect-[5/4] order-1 md:order-2"
            />
            <Images project={project} className="md:col-span-3 aspect-square order-3" />
        </div>
    )
}

// Cover left, text right with the number at the bottom, the other images underneath in the same grid
function SplitLayout({ project, number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-8">
            <Cell
                path={project.cover.src}
                alt={project.title}
                position={project.cover.position}
                className="col-span-2 md:col-span-6 aspect-[4/5]"
            />
            <div className="col-span-2 md:col-span-6 flex flex-col gap-5">
                <Title project={project} className="text-2xl md:text-4xl" />
                <Tags project={project} />
                <Description project={project} />
                <ProjectNumber number={number} className="text-6xl md:text-8xl md:mt-auto md:self-end" />
            </div>
            <Images project={project} className="md:col-span-4 aspect-[4/3]" />
        </div>
    )
}

// Spans in the project view grid. On mobile the grid has two columns, so spans are capped at 2 there.
const colSpans = { 1: 'col-span-1', 2: 'col-span-2 md:col-span-2', 3: 'col-span-2 md:col-span-3' }
const rowSpans = { 1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-2 md:row-span-3' }

// Images may be a path, or { src, cols, rows, position } to span more of the grid
const asImage = (image) => (typeof image === 'string' ? { src: image } : image)

function SpanGrid({ project }) {
    const cover = { cols: 2, rows: 2, ...project.cover }
    const images = (project.images ?? []).map(asImage)
    return (
        <div className="view-grid-wrap">
            <div className="view-grid">
                {[cover, ...images].map((image, i) => (
                    <Cell
                        key={image.src}
                        path={image.src}
                        alt={i === 0 ? project.title : `${project.title}, bild ${i + 1}`}
                        position={image.position}
                        className={`${colSpans[image.cols] ?? colSpans[1]} ${rowSpans[image.rows] ?? rowSpans[1]}`}
                    />
                ))}
            </div>
        </div>
    )
}

// Title row on top, the images as a grid of square cells with the text in a narrow column beside it
function GalleryLayout({ project, number }) {
    return (
        <>
            <div className="flex items-end justify-between gap-6">
                <Title project={project} className="text-2xl md:text-5xl" />
                <ProjectNumber number={number} className="text-5xl md:text-8xl shrink-0" />
            </div>
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 mt-6 md:mt-8">
                <div className="md:col-span-9">
                    <SpanGrid project={project} />
                </div>
                <div className="md:col-span-3 flex flex-col gap-5">
                    <Tags project={project} />
                    <Description project={project} />
                </div>
            </div>
        </>
    )
}

const layouts = {
    hero: HeroLayout,
    split: SplitLayout,
    gallery: GalleryLayout
}

export default function ProjectView({ project, number, total, onClose, onPrev, onNext }) {
    const closeRef = useRef(null)
    const overlayRef = useRef(null)

    // Focus the close button on open, handle keys, and give focus back on close
    useEffect(() => {
        const previous = document.activeElement
        closeRef.current?.focus()
        return () => previous?.focus?.()
    }, [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose, onPrev, onNext])

    // Start each project at the top
    useEffect(() => {
        overlayRef.current?.scrollTo(0, 0)
    }, [project.id])

    const Layout = layouts[project.layout] ?? HeroLayout

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-ink/40 overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-view-title"
                className="bg-paper min-h-full md:min-h-0 md:my-10 md:mx-auto md:max-w-6xl px-6 md:px-12"
            >
                <div className="flex items-center justify-between py-4 border-b border-ink/20 text-xs text-ink/60 tracking-wide uppercase">
                    <span>på sistone</span>
                    <div className="flex items-center gap-4">
                        <span>{number} / {total}</span>
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            aria-label="Stäng"
                            className="w-8 h-8 -mr-2 flex items-center justify-center text-lg text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="py-8 md:py-12">
                    <Layout project={project} number={number} />
                </div>

                <div className="flex items-center justify-between py-4 border-t border-ink/20 text-xs tracking-wide uppercase">
                    <button type="button" onClick={onPrev} className="hover:text-accent focus:outline-none focus-visible:text-accent">
                        ← föregående
                    </button>
                    <button type="button" onClick={onNext} className="hover:text-accent focus:outline-none focus-visible:text-accent">
                        nästa →
                    </button>
                </div>
            </div>
        </div>
    )
}
