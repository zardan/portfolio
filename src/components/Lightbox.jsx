import React, { useEffect, useRef, useState } from 'react'
import Picture from './Picture'

const src = (path) => import.meta.env.BASE_URL + path
const isVideo = (path) => /\.(mp4|webm|mov)$/i.test(path)
const pad = (n) => String(n).padStart(2, '0')

// One image (or clip) at a time over the project view, uncropped.
// Arrow keys or swipe step through the project's images, Escape or a click beside the image closes.
export default function Lightbox({ media, index, onIndex, onClose }) {
    const closeRef = useRef(null)
    const [touchX, setTouchX] = useState(null)
    const item = media[index]
    const step = (delta) => onIndex((index + delta + media.length) % media.length)

    useEffect(() => {
        const previous = document.activeElement
        closeRef.current?.focus()
        return () => previous?.focus?.()
    }, [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') step(-1)
            if (e.key === 'ArrowRight') step(1)
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    })

    const onTouchEnd = (e) => {
        if (touchX === null) return
        const dx = e.changedTouches[0].clientX - touchX
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
        setTouchX(null)
    }

    const arrow = 'hidden md:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-2xl text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            className="fixed inset-0 z-[60] bg-paper flex flex-col fade-in"
            onClick={onClose}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
        >
            <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
                <span className="text-small text-muted tracking-wide">
                    <span className="text-accent">{pad(index + 1)}</span> / {pad(media.length)}
                </span>
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Stäng bilden"
                    className="w-10 h-10 -mr-2 flex items-center justify-center text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                        <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                    </svg>
                </button>
            </div>

            <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 md:px-24 md:py-8">
                {isVideo(item.src) ? (
                    <video
                        key={item.src}
                        src={src(item.src)}
                        poster={item.poster ? src(item.poster) : undefined}
                        aria-label={item.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <Picture
                        key={item.src}
                        src={item.src}
                        alt={item.alt}
                        loading="eager"
                        intrinsic={false}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-full object-contain"
                    />
                )}

                {media.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Föregående bild"
                            onClick={(e) => { e.stopPropagation(); step(-1) }}
                            className={`${arrow} left-4 md:left-8`}
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            aria-label="Nästa bild"
                            onClick={(e) => { e.stopPropagation(); step(1) }}
                            className={`${arrow} right-4 md:right-8`}
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            <p className="!mb-0 px-6 md:px-10 pb-6 md:pb-8 text-small text-muted truncate">{item.alt}</p>
        </div>
    )
}
