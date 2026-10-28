# Portfolio

Sara Cedernaes portfolio, byggd med Vite, React och Tailwind. Live på https://zardan.github.io/portfolio/

## Köra lokalt

```bash
npm install
npm run dev       # utvecklingsserver med live-uppdatering
npm run build     # bygg, kolla att allt fungerar
npm run preview   # visa byggd version
```

## Publicera

Allt som hamnar på `main` byggs och publiceras automatiskt till GitHub Pages (`.github/workflows/main.yml`). Arbeta i en egen branch och merga via en pull request när det ser bra ut.

## Var ändrar jag vad?

| Vad | Fil |
| --- | --- |
| Intro (överst) | `src/components/Intro.jsx` |
| Om mig | `src/components/About.jsx` |
| Projekt i "på sistone" | `src/data/projects.js` + bilder i `public/images/` |
| Raden under projekten (beställningar) | `src/components/Portfolio.jsx` |
| CV | `src/data/cv.js` |
| Kontaktlänkar | `links` överst i `src/components/Contact.jsx` |
| Menyn i sidomenyn | `sections` i `src/App.jsx` |
| Färger och typsnitt | `tailwind.config.cjs` (`paper`, `ink`, `accent`, `display`) |

Rubriker skrivs alltid med gemener (sätts i CSS), så skriv dem som du vill att de ska läsas.

## CV

Varje del i `src/data/cv.js` har en rubrik och en lista med rader:

```js
{ years: '2026–2027', title: 'Nyckelviksskolan', detail: 'Färg, form och hantverk.' }
```

Lägg till en rad i rätt lista, nyast överst. En ny del (t.ex. "Utställningar") är ett nytt `{ heading, items }`-objekt.

## Projekt ("på sistone")

### 1. Bilder

Lägg bilderna i `public/images/`. Skala ner dem först (ca 1600 px på längsta sidan) och ta bort platsdata (GPS) som mobilen sparar i bilden.

### 2. Lägg till projektet

Lägg ett nytt objekt i `src/data/projects.js`. Ordningen i listan är ordningen på sidan (och siffran 1., 2. …).

```js
{
    id: 'skalar',                      // kort, unikt, utan å/ä/ö – blir länken #portfolio/skalar
    title: 'Skålar i stengods',
    layout: 'hero',                    // 'hero', 'split' eller 'gallery'
    cover: { src: 'images/bowl-1.jpeg', size: 'large' },
    images: ['images/bowl-2.jpeg', 'images/bowl-3.jpeg'],
    description: 'Valfri text som visas i projektvyn.',
    tags: ['stengodslera', 'keramik']
}
```

- `cover` är huvudbilden. Den visas i griden på sidan och i projektvyn.
- `images` är övriga bilder, som bara syns i projektvyn.
- `description` kan vara tom (`''`).

### 3. Storlek i griden på sidan

`cover.size` styr hur stor rutan blir på sidan: `'small'` (1×1), `'wide'` (2×1), `'tall'` (1×2) eller `'large'` (2×2). Blandningen avgör om griden går jämnt ut, så kolla att det inte blir hål.

Visar rutan fel del av bilden kan du flytta beskärningen med `cover.position`, t.ex. `position: 'center 60%'`.

### 4. Projektvyn (när man klickar på ett projekt)

`layout` väljer upplägg:

- **hero**: texten till vänster och huvudbilden till höger, övriga bilder bredvid och under.
- **split**: huvudbilden till vänster och texten till höger, med siffran nere i hörnet.
- **gallery**: titeln överst, bilderna i ett rutnät och texten i en smal kolumn bredvid.

Bilderna ligger i ett rutnät av kvadratiska rutor, och varje bild kan spänna över 1–3 kolumner och rader:

```js
images: [
    { src: 'images/yann-4.jpeg', cols: 1, rows: 2 },   // stående, två rader hög
    'images/yann-1.jpeg'                                // bara sökvägen = 1×1
]
```

- Huvudbilden är 2×2 om du inte anger `cols`/`rows` på `cover`.
- I `gallery` kan `cover.order` flytta huvudbilden längre in bland bilderna (`order: 1` = som bild nummer två).
- I `hero` och `split` tar texten bara en rad om projektet saknar description, så att bilderna fyller ut bredvid huvudbilden.
- På mobilen har rutnätet två kolumner, så större spann krymps till 2.
