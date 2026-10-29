// Makes smaller WebP copies of the photos in public/images and notes each photo's main colour,
// so the site can load a size that fits the screen and show the colour while the photo loads.
// Runs on its own before `npm run dev` and `npm run build`; the output is not committed.
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const imagesDir = path.join(root, 'public/images')
const outDir = path.join(imagesDir, 'opt')
const metaFile = path.join(root, 'src/data/images.json')
const widths = [640, 1280]

const newer = async (file, than) => {
    try {
        return (await stat(file)).mtimeMs >= (await stat(than)).mtimeMs
    } catch {
        return false
    }
}

await mkdir(outDir, { recursive: true })
const meta = {}

for (const name of (await readdir(imagesDir)).sort()) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue
    const file = path.join(imagesDir, name)
    const image = sharp(file).rotate()
    const { width, height } = await image.metadata()
    const { dominant } = await image.stats()
    const base = name.replace(/\.[^.]+$/, '')

    // Only widths below the original, plus the original width itself
    const sizes = [...widths.filter((w) => w < width), width]
    const webp = []
    for (const w of sizes) {
        const out = path.join(outDir, `${base}-${w}.webp`)
        if (!(await newer(out, file))) {
            await sharp(file).rotate().resize({ width: w }).webp({ quality: 78 }).toFile(out)
        }
        webp.push([`images/opt/${base}-${w}.webp`, w])
    }

    meta[`images/${name}`] = { width, height, color: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`, webp }
}

await writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
console.log(`optimize-images: ${Object.keys(meta).length} photos`)
