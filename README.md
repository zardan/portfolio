# Portfolio

Sara Cedernaes' portfolio, built with Vite, React and Tailwind. Live at https://zardan.github.io/portfolio/

The site copy is in Swedish.

## Run locally

```bash
npm install
npm run dev       # dev server with live reload
npm run build     # production build, checks that everything compiles
npm run preview   # serve the production build
```

## Publish

Everything that lands on `main` is built and deployed to GitHub Pages automatically (`.github/workflows/main.yml`). Work on a branch and merge through a pull request when it looks right.

## Where to edit what

| What | File |
| --- | --- |
| Intro (top of the page) | `src/components/Intro.jsx` |
| About ("om mig") | `src/components/About.jsx` |
| Projects ("på sistone") | `src/data/projects.js`, images in `public/images/` |
| The line under the projects (commissions) | `src/components/Portfolio.jsx` |
| CV | `src/data/cv.js` |
| Contact links | `links` at the top of `src/components/Contact.jsx` |
| Sidebar menu | `sections` in `src/App.jsx` |
| Colours and fonts | `tailwind.config.cjs` (`paper`, `ink`, `accent`, `display`) |

Headings are always shown in lowercase (set in CSS), so write them however you like.

## CV

Each part of `src/data/cv.js` has a heading and a list of rows:

```js
{ years: '2026–2027', title: 'Nyckelviksskolan', detail: 'Färg, form och hantverk.' }
```

Add a row to the right list, newest first. A new part (e.g. "Utställningar") is a new `{ heading, items }` object.

## Projects ("på sistone")

### 1. Images

Put the images in `public/images/`. Scale them down first (about 1600 px on the longest side) and strip metadata, since phone photos carry GPS location. For example with ImageMagick:

```bash
magick input.jpg -auto-orient -resize "1600x1600>" -strip -quality 85 public/images/name-1.jpeg
```

Nothing else is needed for the smaller versions: `npm run dev` and `npm run build` first run `scripts/optimize-images.mjs`, which makes WebP copies at 640 px, 1280 px and full width in `public/images/opt/` and notes each photo's main colour in `src/data/images.json` (both generated, not committed). The site loads the size that fits the screen and shows the colour until the photo has loaded. Run `npm run images` to make them by hand.

#### Short video clips

A project can also show short clips that play silently on a loop, like a moving image. Put them in `public/videos/` and use them in `images` like any image (the cover has to be an image, since it is also the tile on the page). Keep them short and small: a few seconds, no sound, about 720 px on the longest side, ideally under 2–3 MB. iPhone `.mov` files are best converted to `.mp4` (H.264), which plays in every browser, e.g. with ffmpeg:

```bash
ffmpeg -i clip.mov -an -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart -map_metadata -1 public/videos/name.mp4
ffmpeg -i public/videos/name.mp4 -frames:v 1 -q:v 3 public/images/name-poster.jpeg   # still shown while it loads
```

```js
images: [
    { src: 'videos/name.mp4', poster: 'images/name-poster.jpeg', cols: 1, rows: 2 }
]
```

A clip counts as an image when choosing a layout and spans. Visitors who have reduced motion turned on get the clip paused, with play controls.

### 2. Add the project

Add an object to `src/data/projects.js`. The order of the list is the order on the page (and the numbers 1., 2. …).

```js
{
    id: 'bowls',                       // short, unique, lowercase a–z and hyphens; becomes the link #portfolio/bowls
    title: 'Skålar i stengods',
    layout: 'hero',                    // 'hero', 'split' or 'gallery', see "Choosing a layout"
    cover: { src: 'images/bowl-1.jpeg', size: 'large' },
    images: ['images/bowl-2.jpeg', 'images/bowl-3.jpeg'],
    description: 'Optional text shown in the project view.',
    specs: { material: 'stengodslera', teknik: 'drejade', år: 2026 }   // shown under the title; leave out any you don't need
}
```

- `cover` is the main image. It is the tile on the page and the largest image in the project view. It does not have to be the finished piece; pick the strongest image.
- `images` are the other images, shown only in the project view.
- `description` can be empty (`''`).

### 3. Tile size on the page

`cover.size` sets the tile in the grid on the page: `'small'` (1×1), `'wide'` (2×1), `'tall'` (1×2) or `'large'` (2×2). The overview on the page is one screen high on desktop: three rows of 5 columns, with the heading in the top-left 2×1. Projects are taken in list order as long as they fit (a project whose tile has no room is skipped, and a later one that fits takes its place), cells left over stay empty, and when some projects are left out the last cell becomes a "…" tile that opens the first hidden project (the project view's arrows step through all of them). On a low screen the cells shrink so the grid still fits. The logic is in `src/components/overviewGrid.js`. On mobile the grid has 2 columns and shows the same projects. Put the projects you want in the preview first, and check the overview after adding one.

If the tile shows the wrong part of the image, move the crop with `cover.position`, e.g. `position: 'center 60%'`.

### 4. The project view

Clicking a tile opens the project view. Every layout places the images in a grid of square cells, and each image can span 1–3 columns and rows:

```js
images: [
    { src: 'images/yann-4.jpeg', cols: 1, rows: 2 },   // portrait, two rows tall
    'images/yann-1.jpeg'                                // a plain path is 1×1
]
```

- The cover is 2×2 unless `cols`/`rows` are set on `cover`.
- On mobile the grid has 2 columns, so larger spans shrink to 2.

| Layout | Arrangement |
| --- | --- |
| `hero` | 4 columns. Text on the left, cover on the right, other images beside and below. Without a description the text takes one row and the images fill the space under it, next to the cover. |
| `split` | 4 columns. Cover on the left, text on the right with the project number in the bottom corner, other images below. Without a description the text takes one row, as in `hero`. |
| `gallery` | Title on top, then a 3-column image grid with the specs and description in a narrow column beside it. `cover.order` moves the cover further into the image list (`order: 1` = second image). |

## Choosing a layout

Pick from the content you have. The first rule that fits wins.

1. **3 or more images besides the cover, or a project about a place, event, course or process** (a workshop, residency, trip, a series of steps): use **`gallery`**. No single image has to carry it, and mixed orientations work well with spans.
2. **A description of more than a couple of sentences, with 0–2 other images**: use **`split`**. The text gets a full half of the view, so it suits a project with a story.
3. **Otherwise (a single object or a small series, little or no text, 0–3 other images)**: use **`hero`**. This is the default and suits a finished piece that the cover photo shows well.

### Spans by image shape

- Portrait image: `cols: 1, rows: 2`
- Landscape image: `cols: 2, rows: 1`
- Square or detail shot: 1×1 (just the path)
- The image that should dominate: 2×2 (the cover by default)

### Fill the grid without holes

Count the cells. The total should fill whole rows: 4 columns in `hero` and `split`, 3 in `gallery`.

- **`hero` / `split` with a 2×2 cover**: the text fills the other two columns beside the cover. With no description, two 1×1 images fill the row under the text. Further images go in rows of four 1×1 (or two 2×1).
- **`gallery` with a 2×2 cover**: one portrait (1×2) beside the cover fills the first two rows. After that, add images in threes (three 1×1, or a 2×1 plus a 1×1).

Example (`gallery`, from the YANN project): one portrait 1×2 first, then the 2×2 cover (`order: 1`), then three 1×1 images. That is 2 + 4 + 3 = 9 cells, three full rows.
