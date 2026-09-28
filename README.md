# Hello Sunshine

olá

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee26d379-28c1-4057-90a0-350d203f28a8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Dozoi implementation

The home page uses confirmed business data in `src/lib/dozoi.ts`. All order CTAs
use the business WhatsApp link. The original logo and legible burger menu were
not included with the design references: `logoUrl` stays null (plain business
name fallback), and `confirmedBurgers` stays empty until these are supplied.
No product names, ingredients, prices, reviews, address or closing time are invented.

`BurgerScene` accepts transparent `layers` with open/closed vertical offsets,
or a `video: { src, poster }`. A final seekable video should progress from the
exploded burger to the assembled burger. Scroll updates use passive listeners
and one requestAnimationFrame, with no scroll locking. Reduced motion shows the
assembled state and removes the extra scroll distance. Current food visuals are
illustrative, labeled in the page and served locally as optimized WebP assets.

Local display/body fonts are Nimbus Sans (URW), with license in
`public/fonts/LICENSE.txt`. No runtime font or image CDN is required.
