import React, { useEffect, useRef, useState } from 'react'

// Sizes and main colours of the photos, made by scripts/optimize-images.mjs before dev and build.
// When the file is missing (vite started some other way) photos load as plain JPEGs.
const meta = Object.values(import.meta.glob('../data/images.json', { eager: true, import: 'default' }))[0] ?? {}

const url = (path) => import.meta.env.BASE_URL + path

// A photo that loads a WebP sized for the screen, shows its main colour while loading and fades in.
// sizes tells the browser how wide the photo is shown, e.g. '(min-width: 768px) 50vw, 100vw'.
export default function Picture({ src, alt = '', sizes = '100vw', className = '', style, loading = 'lazy', intrinsic = true, onClick }) {
    const info = meta[src]
    const ref = useRef(null)
    const [loaded, setLoaded] = useState(false)

    // A photo already in the cache may have loaded before React could listen for it
    useEffect(() => {
        if (ref.current?.complete) setLoaded(true)
    }, [src])

    return (
        <picture className="contents">
            {info && (
                <source
                    type="image/webp"
                    srcSet={info.webp.map(([file, w]) => `${url(file)} ${w}w`).join(', ')}
                    sizes={sizes}
                />
            )}
            <img
                ref={ref}
                src={url(src)}
                alt={alt}
                width={intrinsic ? info?.width : undefined}
                height={intrinsic ? info?.height : undefined}
                loading={loading}
                decoding="async"
                onLoad={() => setLoaded(true)}
                onClick={onClick}
                className={`transition-[opacity,transform] duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                style={{ backgroundColor: loaded ? undefined : info?.color, ...style }}
            />
        </picture>
    )
}
