import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'

// An open project has its own address, #portfolio/<id>, so a link to it opens it,
// refresh keeps it open and the browser's back button closes it
const prefix = '#portfolio/'

const idFromHash = () => {
    const { hash } = window.location
    if (!hash.startsWith(prefix)) return null
    const id = decodeURIComponent(hash.slice(prefix.length))
    return projects.some((p) => p.id === id) ? id : null
}

export function useProjectView() {
    const [openId, setOpenId] = useState(idFromHash)
    // True while the open project's history entry was added by us, so closing can step back
    const pushed = useRef(false)

    // Back, forward and links to another section (#cv etc.) all change the hash
    useEffect(() => {
        const sync = () => {
            const id = idFromHash()
            if (!id) pushed.current = false
            setOpenId(id)
        }
        window.addEventListener('hashchange', sync)
        window.addEventListener('popstate', sync)
        return () => {
            window.removeEventListener('hashchange', sync)
            window.removeEventListener('popstate', sync)
        }
    }, [])

    const open = useCallback((id) => {
        window.history.pushState(null, '', prefix + id)
        pushed.current = true
        setOpenId(id)
    }, [])

    // Switching project inside the view replaces the address, so back still leaves the view
    const show = useCallback((id) => {
        window.history.replaceState(null, '', prefix + id)
        setOpenId(id)
    }, [])

    const close = useCallback(() => {
        if (pushed.current) {
            window.history.back()
            return
        }
        // Opened straight from a link: leave the view for the grid
        window.history.replaceState(null, '', '#portfolio')
        setOpenId(null)
        document.getElementById('portfolio')?.scrollIntoView()
    }, [])

    return { openId, open, show, close }
}
