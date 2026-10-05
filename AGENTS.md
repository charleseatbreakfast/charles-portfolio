# AGENTS.md — Charles Chau Portfolio

## Frontend source of truth

Before making ANY visual, layout, typography, interaction, or responsive change:

1. Read `DESIGN_SYSTEM.md`.
2. Reuse existing tokens from `styles/tokens.css`.
3. Reuse existing site components/patterns before creating new ones.
4. Inspect the current portfolio implementation before interpreting a new visual reference.

The existing portfolio design system has higher priority than any screenshot, mood board, AI-generated image, or third-party reference supplied later.

## Reference-image rule

A reference image is NOT permission to copy its visual system.

When a screenshot/image is provided:
- Treat it as reference for composition, content hierarchy, mood, or a specific interaction only.
- Translate it into the Charles Chau portfolio design system.
- Do not adopt a new font, color palette, radius, shadow, nav style, button style, spacing system, or motion language just because it appears in the reference.
- If the reference conflicts with `DESIGN_SYSTEM.md`, keep the portfolio system.
- If a genuinely new pattern is needed, explain it and update the design system/tokens first rather than creating an undocumented one-off style.

## Text must stay live

Never bake portfolio UI copy into raster artwork.

All of the following must be real HTML/text:
- navigation
- page titles
- role/title
- headings
- body copy
- project names
- labels
- CTAs
- buttons
- stats
- captions
- hotspot labels

AI-generated or photographic artwork may be used as:
- background/environment imagery
- decorative imagery
- project imagery

Environmental signage inside an artwork may remain part of the image only when it is decorative and not required for navigation, comprehension, accessibility, or key portfolio messaging.

If a supplied reference image contains both background artwork and text:
- use/extract/recreate the background as an image layer;
- rebuild the text as live HTML using the portfolio typography tokens.

## Typography lock

Do not introduce a new font family without explicit approval.

Use:
- Display / editorial: `var(--font-display)` = Georgia, "Times New Roman", serif
- UI / body / metadata: `var(--font-ui)` = Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

Personal role/title is:
**Product Designer**

Do not change it back to UI/UX Designer.

## Color lock

Use design tokens. Do not introduce arbitrary page-specific colors when an existing semantic token applies.

Core palette:
- background: `--color-bg`
- primary text: `--color-text`
- muted text: `--color-text-muted`
- dividers: `--color-line`
- dark floating panel: `--color-panel`
- warm header scrim: `--color-scrim-top`

## Shared components

The following are global components and should look/behave consistently on every page:
- site header / brand
- primary navigation
- top header scrim
- page gutters
- typography hierarchy
- project panel language
- hotspot language
- divider treatment
- motion easing
- focus-visible treatment

Do not recreate a page-specific version of the global header.

Active navigation state may change by page; geometry, typography and interaction should not.

## Visual character

The portfolio should feel:
- cinematic
- editorial
- warm
- nostalgic Hong Kong
- modern product design
- human
- premium
- quiet rather than flashy

Avoid:
- glassmorphism-heavy UI
- generic SaaS cards
- random gradients
- oversized rounded cards
- game-like hotspots
- bouncing/pulsing UI
- excessive glow
- multiple unrelated type styles
- page-specific visual systems

## Motion

Motion should reinforce place, depth, and discovery.

Prefer:
- opacity
- transform
- subtle brightness
- restrained parallax
- short staggered reveals

Do not animate a physical object by placing a misaligned duplicate image over a copy baked into the background.

If an object itself must move, use a properly isolated asset and a clean plate behind it.

Respect `prefers-reduced-motion`.

## Layout

Use shared page gutters and header geometry from tokens.
Do not eyeball a new left margin for each page.

Desktop pages should align to the same left/right page grid as the homepage.

## Before finishing any frontend task

Check:
- Does this page look like the same portfolio as the homepage?
- Did I reuse the same header rather than recreate it?
- Did I use only approved fonts?
- Is all meaningful text live HTML?
- Did I use tokens rather than arbitrary values?
- Did I accidentally copy a reference image's design system?
- Are contrast and readability sufficient over imagery?
- Does it work at desktop and mobile breakpoints?
- Does `prefers-reduced-motion` remain usable?
- If I introduced a new reusable pattern, did I document it in `DESIGN_SYSTEM.md`?

If any answer is no, fix it before finishing.
