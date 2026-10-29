// Each project shows its cover as one tile in the grid. Clicking it opens the
// project view with the cover, the description (if any) and the other images.
// layout: how the project view is arranged, 'hero' (default), 'split' or 'gallery'
// cover.size: 'small' (1×1), 'wide' (2×1), 'tall' (1×2) or 'large' (2×2)
// cover.position: optional CSS object-position, to choose which part of a cropped cover shows
// In the project view the cover and images sit in a grid of square cells (4 columns in 'hero' and
// 'split', 3 beside the text in 'gallery', 2 on mobile) and can span columns and rows: the cover
// defaults to cols: 2, rows: 2; an image can be a path (1×1) or { src, cols, rows }.
// An image can also be a short video ('videos/name.mp4', or { src, poster, cols, rows }): it plays
// muted and on a loop. The cover must be an image, since it is also the tile on the page.
// In 'gallery', cover.order places the cover among the images (0 = first, the default)
// specs: material, teknik and år, shown as a short datasheet under the title
export const projects = [
    {
        id: 'lerstudie',
        title: 'Formtagning på lerstudie',
        layout: 'gallery',
        cover: { src: 'images/lerstudie-1.jpeg', size: 'wide', cols: 2, rows: 1, position: 'center 65%' },
        images: [
            { src: 'videos/lerstudie.mp4', poster: 'images/lerstudie-2.jpeg', cols: 1, rows: 2 },
            'images/lerstudie-5.jpeg',
            { src: 'images/lerstudie-3.jpeg', position: 'center 30%' }
        ],
        description: 'Lerstudie efter modell, formtagen i gips med förlorad form. Mitt första arbete med gips som material. Nyckelviksskolan.',
        specs: { material: 'keramik, gips', teknik: 'förlorad form', år: 2026 }
    },
    {
        id: 'yann',
        title: 'YANN pottery gathering',
        layout: 'gallery',
        cover: { src: 'images/yann-3.jpeg', size: 'large', cols: 2, rows: 2, order: 1 },
        images: [
            { src: 'images/yann-4.jpeg', cols: 1, rows: 2 },
            'images/yann-1.jpeg',
            'images/yann-2.jpeg',
            'images/yann-5.jpeg'
        ],
        description: 'Naturlera från platsen, formad för hand och bränd i en vedeldad ugn som vi byggde och eldade tillsammans. Chiang Dao, Thailand.',
        specs: { material: 'naturlera', teknik: 'handbyggd, vedbränd', år: 2026 }
    },
    {
        id: 'bowls',
        title: 'Skålar i stengods',
        layout: 'hero',
        cover: { src: 'images/bowl-1.jpeg', size: 'wide' },
        images: ['images/bowl-2.jpeg', 'images/bowl-3.jpeg'],
        description: '',
        specs: { material: 'stengodslera', teknik: 'drejade', år: 2026 }
    },
    {
        id: 'candleholders',
        title: 'Ljusstakar i keramik',
        layout: 'split',
        cover: { src: 'images/candles.jpeg', size: 'small' },
        images: [],
        description: '',
        specs: { material: 'stengodslera', teknik: 'handbyggda, transparent glasyr', år: 2025 }
    },
    {
        id: 'annie',
        title: 'Namnskylt i keramik',
        layout: 'hero',
        cover: { src: 'images/annie-2.jpeg', size: 'wide', position: 'center 60%' },
        images: ['images/annie-1.jpeg'],
        description: '',
        specs: { material: 'stengodslera (pricklera)', teknik: 'handbyggd', år: 2026 }
    },
    {
        id: 'kudde',
        title: 'Tuftad kudde',
        layout: 'hero',
        cover: { src: 'images/kudde.jpeg', size: 'small' },
        images: [],
        description: '',
        specs: { material: 'ull', teknik: 'tuftning, öglelugg', år: 2025 }
    }
]
