// Picks which projects fit in the overview on a wide screen and where each tile goes.
// The overview is one screen high: COLS × ROWS square cells, the heading takes the
// top-left 2×1 and the projects fill the rest, in the order of projects.js as far as
// they fit. If some don't fit, the last free cell is kept for the "…" tile.
export const COLS = 5
export const ROWS = 2
const HEADING = { col: 1, row: 1, w: 2, h: 1 }

export const spanOf = (size) => ({
    small: { w: 1, h: 1 },
    wide: { w: 2, h: 1 },
    tall: { w: 1, h: 2 },
    large: { w: 2, h: 2 }
}[size] ?? { w: 1, h: 1 })

const emptyGrid = () => {
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(false))
    mark(grid, HEADING, true)
    return grid
}

function mark(grid, { col, row, w, h }, value) {
    for (let r = row; r < row + h; r++)
        for (let c = col; c < col + w; c++) grid[r - 1][c - 1] = value
}

function fits(grid, { col, row, w, h }) {
    if (col + w - 1 > COLS || row + h - 1 > ROWS) return false
    for (let r = row; r < row + h; r++)
        for (let c = col; c < col + w; c++) if (grid[r - 1][c - 1]) return false
    return true
}

// Places the spans in order, trying cells row by row and backtracking when a later
// tile has no room. Returns one position per span, or null if they can't all fit.
function place(spans, grid = emptyGrid(), i = 0) {
    if (i === spans.length) return []
    for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
            const pos = { col, row, ...spans[i] }
            if (!fits(grid, pos)) continue
            mark(grid, pos, true)
            const rest = place(spans, grid, i + 1)
            mark(grid, pos, false)
            if (rest) return [pos, ...rest]
        }
    }
    return null
}

const cells = (spans) => spans.reduce((sum, { w, h }) => sum + w * h, 0)
const free = COLS * ROWS - HEADING.w * HEADING.h

export function overviewLayout(projects) {
    const spans = projects.map((p) => spanOf(p.cover.size))
    const all = cells(spans) <= free && place(spans)
    if (all) return { tiles: projects.map((project, i) => ({ project, pos: all[i] })), more: null }

    // Not everything fits: take projects in order while they fit, leaving one cell for "…"
    let chosen = []
    for (let i = 0; i < projects.length; i++) {
        const next = [...chosen, i]
        if (cells(next.map((j) => spans[j])) <= free - 1 && place(next.map((j) => spans[j]))) chosen = next
    }
    const positions = place(chosen.map((j) => spans[j]))
    const grid = emptyGrid()
    positions.forEach((pos) => mark(grid, pos, true))
    let more = null
    for (let row = ROWS; row >= 1 && !more; row--)
        for (let col = COLS; col >= 1 && !more; col--)
            if (!grid[row - 1][col - 1]) more = { col, row, w: 1, h: 1 }

    return {
        tiles: chosen.map((j, k) => ({ project: projects[j], pos: positions[k] })),
        more
    }
}

export const heading = HEADING
