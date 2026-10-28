import React, { useEffect, useRef, useState } from 'react'

// The red circle follows the mouse with a slight delay. Over an element with data-cursor="<word>"
// it grows into a large see-through circle with that word in it (like the number circles on the
// tiles), over other links and buttons it swells a little. Only with a mouse, and not for
// visitors who have turned off animations.
const enabled = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CircleCursor() {
    const ref = useRef(null)
    const [on] = useState(enabled)
    const [state, setState] = useState({ kind: 'dot', label: '' })
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!on) return
        document.documentElement.classList.add('has-circle-cursor')
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

        const onOver = (e) => {
            const labelled = e.target.closest?.('[data-cursor]')
            if (labelled) setState({ kind: 'label', label: labelled.dataset.cursor })
            else if (e.target.closest?.('a, button')) setState({ kind: 'link', label: '' })
            else setState({ kind: 'dot', label: '' })
        }

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
            document.documentElement.classList.remove('has-circle-cursor')
        }
    }, [on])

    if (!on) return null

    const sizes = {
        dot: 'w-3 h-3 bg-accent',
        link: 'w-10 h-10 bg-accent/25',
        label: 'w-24 h-24 bg-accent/80'
    }

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={`fixed left-0 top-0 z-[80] pointer-events-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${sizes[state.kind]}`}
            >
                <span className={`text-paper text-sm transition-opacity duration-200 ${state.kind === 'label' ? 'opacity-100' : 'opacity-0'}`}>
                    {state.label}
                </span>
            </div>
        </div>
    )
}
