# Scene compositing guide

The hero uses the updated clean background plate. The existing sky, billboard, tram, shop, and foreground scene-coordinate layers remain intact; project hotspots now live together in an interaction layer above the artwork.

## Active supplied assets

- `background/hero-clean.png` — 1453 × 1083 scene background, without the foreground newspaper or inserted lamp.

The old `composite/` WebP files are retained only as archived prototype assets and are no longer referenced by `index.html`.

## Remaining masked scene layers

Sky, billboard, tram, shop, and radio/railing depth still use CSS masks over `hero-clean.png` because dedicated exports for those layers were not supplied. If those assets are prepared later, export them on the full 1453 × 1083 canvas with transparent padding so hotspot and focus coordinates remain unchanged.

For responsive production delivery, export the clean background at 1440, 1920, and 2560 widths.

## Interaction layer

All three project buttons are direct children of `.interaction-layer`, which sits after the six visual layers and above them at z-index 10. Each button retains its own normalized scene coordinates and parallax depth: Dashboard 0.28, PARKnSHOP 0.50, and FORTRESS 1.00. The interaction layer remains inside `.scene-world` and `.scene-camera`, so camera focus and zoom apply to visuals and hotspots together.

## Project panel images

Replace the files in `../projects/` or update the `image.src` field for each project in `app.js`:

- `parknshop-placeholder.svg`
- `fortress-placeholder.svg`
- `dashboard-placeholder.svg`

## Ambient overlay coordinates

Ambient overlays use normalized coordinates relative to the 1453 × 1083 source artwork. Their `data-x`, `data-y`, `data-w`, and `data-h` values live in `index.html`; `positionSceneElement()` in `app.js` converts them into the current cover-rendered scene coordinates.

| Overlay | Layer | x | y | width | height |
| --- | --- | ---: | ---: | ---: | ---: |
| Tram headlight — left | tram | 0.337 | 0.584 | 0.019 | 0.025 |
| Tram headlight — right | tram | 0.393 | 0.584 | 0.019 | 0.025 |
| Hong Kong red-character dim + glow | tram | 0.435 | 0.116 | 0.092 | 0.082 |
| Intro billboard light | billboard | 0.188 | 0.365 | 0.102 | 0.246 |
| Vertical red neon glow | shop | 0.490 | 0.322 | 0.020 | 0.135 |
| Wet street reflection | background | 0.255 | 0.560 | 0.390 | 0.440 |

Headlight events are randomized between 7–12 seconds and neon events between 3.5–6 seconds in `app.js`. The Hong Kong effect inversely animates a multiply dim layer and a screen/additive glow layer over the red characters only. The street reflection drift (14.2 seconds) is defined in `styles.css`.

## Opening sequence

The one-time 1.95-second intro is driven by the initial `html.is-intro` class. `styles.css` sequences the black reveal, scene exposure, red Hong Kong character glow, tea sign, billboard, nearby sign, warm shop/tram light, typography/navigation, and hotspot entrance. The baked Hong Kong sign is never duplicated, transformed, blurred, or resized. `app.js` removes the class after the sequence and makes a best-effort Web Audio tram-chime attempt; autoplay rejection is intentionally silent. Reduced-motion mode skips the staged motion and reveal.
