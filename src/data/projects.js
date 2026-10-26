// Each image is its own tile in the grid.
// size: 'small' (1×1), 'wide' (2×1), 'tall' (1×2) or 'large' (2×2)
// position: optional CSS object-position, to choose which part of a cropped photo shows
export const projects = [
    {
        id: 'bowls',
        title: 'Skålar i stengods',
        images: [
            { src: 'images/bowl-1.jpeg', size: 'large' },
            { src: 'images/bowl-2.jpeg', size: 'small' },
            { src: 'images/bowl-3.jpeg', size: 'small' }
        ],
        description: '',
        tags: ['stengodslera', 'keramik']
    },
    {
        id: 'candleholders',
        title: 'Ljusstakar i keramik',
        images: [
            { src: 'images/candles.jpeg', size: 'tall' }
        ],
        description: '',
        tags: ['keramik']
    },
    {
        id: 'annie',
        title: 'Namnskylt i keramik',
        images: [
            { src: 'images/annie-1.jpeg', size: 'small' },
            { src: 'images/annie-2.jpeg', size: 'wide', position: 'center 60%' }
        ],
        description: '',
        tags: ['keramik']
    },
    {
        id: 'kudde',
        title: 'Tuftad kudde',
        images: [
            { src: 'images/kudde.jpeg', size: 'small' }
        ],
        description: '',
        tags: ['textil', 'tuftning']
    }
]
