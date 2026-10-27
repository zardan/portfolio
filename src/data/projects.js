// Each project shows its cover as one tile in the grid. Clicking it opens the
// project view with the cover, the description (if any) and the other images.
// layout: how the project view is arranged, 'hero' (default), 'split' or 'gallery'
// cover.size: 'small' (1×1), 'wide' (2×1), 'tall' (1×2) or 'large' (2×2)
// cover.position: optional CSS object-position, to choose which part of a cropped cover shows
// In the 'gallery' layout the cover and images sit in a grid of square cells and can span
// 1–3 columns and rows: cover defaults to cols: 2, rows: 2; an image can be a path (1×1)
// or { src, cols, rows }. cover.order places the cover among the images (0 = first, the default)
export const projects = [
    {
        id: 'yann',
        title: 'YANN pottery gathering, 2026',
        layout: 'gallery',
        cover: { src: 'images/yann-3.jpeg', size: 'large', cols: 2, rows: 2, order: 1 },
        images: [
            { src: 'images/yann-4.jpeg', cols: 1, rows: 2 },
            'images/yann-1.jpeg',
            'images/yann-2.jpeg',
            'images/yann-5.jpeg'
        ],
        description: 'Naturlera från platsen, formad för hand och bränd i en vedeldad ugn som vi byggde och eldade tillsammans. Chiang Dao, Thailand.',
        tags: ['keramik', 'naturlera']
    },
    {
        id: 'bowls',
        title: 'Skålar i stengods',
        layout: 'hero',
        cover: { src: 'images/bowl-1.jpeg', size: 'large' },
        images: ['images/bowl-2.jpeg', 'images/bowl-3.jpeg'],
        description: '',
        tags: ['stengodslera', 'keramik']
    },
    {
        id: 'candleholders',
        title: 'Ljusstakar i keramik',
        layout: 'split',
        cover: { src: 'images/candles.jpeg', size: 'small' },
        images: [],
        description: '',
        tags: ['keramik']
    },
    {
        id: 'annie',
        title: 'Namnskylt i keramik',
        layout: 'hero',
        cover: { src: 'images/annie-2.jpeg', size: 'wide', position: 'center 60%' },
        images: ['images/annie-1.jpeg'],
        description: '',
        tags: ['keramik']
    },
    {
        id: 'kudde',
        title: 'Tuftad kudde',
        layout: 'hero',
        cover: { src: 'images/kudde.jpeg', size: 'small' },
        images: [],
        description: '',
        tags: ['textil', 'tuftning']
    }
]
