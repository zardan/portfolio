import React, { useEffect, useRef, useState } from 'react'

// The red circle follows the mouse with a slight delay and grows to twice its size over links,
// buttons, work tiles and project images. Only with a mouse, and not for visitors who have
// turned off animations.
const enabled = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CircleCursor() {
    const ref = useRef(null)
    const [on] = useState(enabled)
    const [hover, setHover] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!on) return
        const target = { x: -100, y: -100 }
        const pos = { x: -100, y: -100 }
        let frame

        const tick = () => {
            pos.x += (target.x - pos.x) * 0.2
            pos.y += (target.y - pos.y) * 0.2
            if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
            frame = requestAnimationFrame(tick)
        }

        const onMove = (e) => {
            target.x = e.clientX
            target.y = e.clientY
            setVisible(true)
        }

        const onOver = (e) => setHover(Boolean(e.target.closest?.('a, button')))
        const onLeave = () => setVisible(false)

        frame = requestAnimationFrame(tick)
        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        document.documentElement.addEventListener('mouseleave', onLeave)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            document.documentElement.removeEventListener('mouseleave', onLeave)
        }
    }, [on])

    if (!on) return null

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={`fixed left-0 top-0 z-[80] pointer-events-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${hover ? 'w-6 h-6 bg-accent/60' : 'w-3 h-3 bg-accent'}`}
            />
        </div>
    )
}
