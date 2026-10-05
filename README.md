# Interactive Portfolio Hero

A dependency-free visual prototype built directly from the supplied Hong Kong hero image.

The hero uses the visible browser viewport exactly (`100dvh`, with `100svh` and `100vh` fallbacks) and has no minimum-height override.

The desktop scene is split into independently moving sky, background, tram, grocery shop, and foreground layers. The current layer isolation uses documented temporary masks until final transparent production assets are supplied. See `assets/scene/README.md` for the replacement contract.

## Run locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Interactions

- Move the pointer for subtle scene parallax.
- Hover or keyboard-focus the billboard, grocery shop, or radio to reveal its live hotspot.
- Click a hotspot to focus the camera and open its project panel.
- Press `Escape` or use the close button to reset the scene.
- On mobile, use the three project controls at the bottom of the hero.
- `prefers-reduced-motion` disables ambient motion, flicker, parallax, pulsing, and cinematic zoom.

The document remains vertically scrollable; only the hero scene clips its internal artwork.
