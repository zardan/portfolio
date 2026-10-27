import React, { useEffect, useLayoutEffect, useRef } from 'react'

const src = (path) => import.meta.env.BASE_URL + path

// An image cell that fills its grid area, so every layout stays on a strict grid
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

// Every layout is a grid of square cells where images and text span columns and rows.
// The gallery grid has 3 columns beside its text, hero and split have 4 across the full width,
// so the cells come out the same size. On mobile the grid has 2 columns and spans are capped at 2.
const colSpans = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-2 md:col-span-3',
    4: 'col-span-2 md:col-span-4'
}
const rowSpans = { 1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-2 md:row-span-3' }
const spans = ({ cols, rows }) => `${colSpans[cols] ?? colSpans[1]} ${rowSpans[rows] ?? rowSpans[1]}`

// The text block takes the full width on mobile and grows with its content
const textCols = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3' }
const textRows = { 1: 'md:row-span-1', 2: 'md:row-span-2', 3: 'md:row-span-3' }
const textSpans = ({ cols, rows }) => `col-span-2 ${textCols[cols] ?? textCols[2]} ${textRows[rows] ?? textRows[2]}`

// Images may be a path, or { src, cols, rows, position } to span more of the grid
const asImage = (image) => (typeof image === 'string' ? { src: image } : image)

function ViewGrid({ wide = false, children }) {
    return (
        <div className={`view-grid-wrap ${wide ? 'view-grid-wrap--wide' : ''}`}>
            <div className="view-grid">{children}</div>
        </div>
    )
}

function Cover({ cover, project, className = '' }) {
    return (
        <Cell
            path={cover.src}
            alt={project.title}
            position={cover.position}
            className={`${spans(cover)} ${className}`}
        />
    )
}

// The project's other images, after the cover and text in the same grid
function Images({ project, className = '' }) {
    return (project.images ?? []).map(asImage).map((image, i) => (
        <Cell
            key={image.src}
            path={image.src}
            alt={`${project.title}, bild ${i + 2}`}
            position={image.position}
            className={`${spans(image)} ${className}`}
        />
    ))
}

// Beside the cover the text takes the columns left over. Without a description it only needs
// one row, and the other images fill the space under it before continuing below the cover.
function textBeside(project, cover) {
    const short = !project.description && project.images?.length
    return textSpans({ cols: 4 - Math.min(cover.cols, 3), rows: short ? 1 : cover.rows })
}

// Text left, cover right (2×2 by default), the other images beside and under it
function HeroLayout({ project, number }) {
    const cover = { cols: 2, rows: 2, ...project.cover }
    return (
        <ViewGrid wide>
            <div className={`${textBeside(project, cover)} flex flex-col gap-5 order-2 md:order-none`}>
                <ProjectNumber number={number} className="text-6xl md:text-8xl" />
                <Title project={project} className="text-2xl md:text-4xl" />
                <Tags project={project} />
                <Description project={project} className="md:mt-auto" />
            </div>
            <Cover cover={cover} project={project} className="order-1 md:order-none" />
            <Images project={project} className="order-3 md:order-none" />
        </ViewGrid>
    )
}

// Cover left (2×2 by default), text right with the number at the bottom, the other images beside and under it
function SplitLayout({ project, number }) {
    const cover = { cols: 2, rows: 2, ...project.cover }
    return (
        <ViewGrid wide>
            <Cover cover={cover} project={project} />
            <div className={`${textBeside(project, cover)} flex flex-col gap-5`}>
                <Title project={project} className="text-2xl md:text-4xl" />
                <Tags project={project} />
                <Description project={project} />
                <ProjectNumber number={number} className="text-6xl md:text-8xl md:mt-auto md:self-end" />
            </div>
            <Images project={project} />
        </ViewGrid>
    )
}

// Title row on top, the images in a 3-column grid with the text in a narrow column beside it.
// cover.order places the cover among the images (0 = first).
function GalleryLayout({ project, number }) {
    const cover = { cols: 2, rows: 2, ...project.cover }
    const images = (project.images ?? []).map((image, i) => ({ ...asImage(image), alt: `${project.title}, bild ${i + 2}` }))
    images.splice(cover.order ?? 0, 0, { ...cover, alt: project.title })
    return (
        <>
            <div className="flex items-end justify-between gap-6">
                <Title project={project} className="text-2xl md:text-5xl" />
                <ProjectNumber number={number} className="text-5xl md:text-8xl shrink-0" />
            </div>
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 mt-6 md:mt-8">
                <div className="md:col-span-9">
                    <ViewGrid>
                        {images.map((image) => (
                            <Cell
                                key={image.src}
                                path={image.src}
                                alt={image.alt}
                                position={image.position}
                                className={spans(image)}
                            />
                        ))}
                    </ViewGrid>
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

export default function ProjectView({ project, number, total, origin, onClose, onPrev, onNext }) {
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

    // Expand out of the clicked tile until the view covers the page beside the sidebar
    useLayoutEffect(() => {
        const el = overlayRef.current
        if (!origin || !el?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const box = el.getBoundingClientRect()
        const from = `inset(${origin.top - box.top}px ${box.right - origin.right}px ${box.bottom - origin.bottom}px ${origin.left - box.left}px)`
        el.animate([{ clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px)' }], {
            duration: 450,
            easing: 'cubic-bezier(0.2, 0, 0, 1)'
        })
    }, [])

    // Name the open project in the browser tab and history
    useEffect(() => {
        const previous = document.title
        document.title = `${project.title} – ${previous}`
        return () => {
            document.title = previous
        }
    }, [project.title])

    // Start each project at the top
    useEffect(() => {
        overlayRef.current?.scrollTo(0, 0)
    }, [project.id])

    const Layout = layouts[project.layout] ?? HeroLayout

    return (
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-view-title"
            className="fixed inset-0 md:left-64 lg:left-72 xl:left-80 z-50 bg-paper overflow-y-auto"
        >
            <div className="container min-h-full flex flex-col">
                <div className="flex items-center justify-between gap-6 py-4 border-b border-ink/20">
                    {/* Breadcrumb: back to the grid, then the open project */}
                    <nav aria-label="Brödsmulor" className="flex items-center gap-3 min-w-0 font-display text-base md:text-lg leading-none">
                        <button
                            type="button"
                            onClick={onClose}
                            className="group flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            <span aria-hidden="true" className="text-accent transition-transform group-hover:-translate-x-1">←</span>
                            <span className="bg-accent text-paper px-2 py-1">på sistone</span>
                        </button>
                        <span aria-hidden="true" className="hidden md:inline text-ink/40">/</span>
                        <span className="hidden md:inline truncate lowercase text-ink/70">{project.title}</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <span className="text-xs text-ink/60 tracking-wide whitespace-nowrap">{number} / {total}</span>
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            aria-label="Stäng"
                            className="w-10 h-10 -mr-2 flex items-center justify-center text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 py-8 md:py-12">
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
