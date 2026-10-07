# DESIGN_SYSTEM.md — Charles Chau Portfolio

## 1. Design intent

The portfolio combines **Old Hong Kong atmosphere** with a **modern Product Designer portfolio**.

The environmental artwork can be rich, cinematic and nostalgic.
The interface layered on top must remain controlled, editorial, legible and consistent.

The design system is intentionally small:
- one display serif
- one UI/body sans-serif
- one warm dark palette
- one shared grid
- one shared header
- restrained motion

The goal is not for every page to use the same Hong Kong street scene.
The goal is for every page to feel authored by the same designer.

### Frontend design freedom
The system defines a shared visual language, not a fixed page template.

- New pages and case studies reuse the shared typography, colors, grid, spacing, navigation, motion and accessibility rules without mechanically repeating an earlier page composition.
- Choose hierarchy and layout from the idea that a section must communicate. Prefer thoughtful editorial composition to generic card grids.
- Every project should establish its own storytelling rhythm and may introduce at least one project-specific visual or interaction pattern when it improves understanding.
- New compositions must remain recognizably part of the Charles Chau portfolio; references inform composition, mood or interaction and are never copied literally.
- Before introducing a section, identify its main idea, hierarchy, content-fit, interaction value and relationship to the shared portfolio language.

---

## 2. Typography

### Display / Editorial
`Georgia, "Times New Roman", serif`

Use for:
- major page titles
- large editorial statements
- project titles
- key numeric/stat values when appropriate

The global header brand is an image asset, not typeset display text.

Characteristics:
- elegant
- human
- editorial
- relatively tight tracking

### UI / Body
`Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Use for:
- navigation
- body copy
- labels
- eyebrows
- metadata
- categories
- project summaries
- UI controls
- hotspot labels

### Rules
- Never use more than these two families without explicit approval.
- Do not use a third font just because it appears in a reference screenshot.
- Large serif text may use negative letter-spacing.
- Small uppercase labels may use generous tracking.
- Body copy should prioritize readability and should normally be sans-serif.

### Suggested scale
- Header logo: `clamp(150px, 11vw, 190px)` wide, intrinsic aspect ratio, `height: auto`
- Hero/Page H1: `clamp(52px, 5.15vw, 82px)`, 500, line-height ~0.98–1.04, `-0.05em`
- Section H2: `clamp(34px, 3.2vw, 56px)`, 400–500, line-height `1.08`
- Body large: `clamp(16px, 1.15vw, 19px)`, line-height 1.5–1.6
- Body: `clamp(14px, 0.95vw, 16px)`, line-height 1.5–1.6
- Eyebrow: `8–11px`, uppercase, tracking `0.20–0.24em`
- Metadata: `9–12px`, tracking `0.02–0.10em`

### Case-study typography hierarchy
- **Eyebrow:** use the shared `.section-kicker` pattern only—UI font, `var(--type-eyebrow)`, weight 600, uppercase, `0.22em` tracking, `1.4` line-height and project accent color. Do not enlarge or restyle an eyebrow for an individual section.
- **Editorial section title:** use `.case-section-title` with the display font, `var(--type-section-h2)`, `var(--case-title-leading)` and `var(--case-title-max)`. The default title line-height is `1.08`: expressive, but never tight enough for adjacent lines to collide.
- **Supporting description:** use `.case-section-description`. It belongs to and aligns with the title content column, never the eyebrow label. In a split header its top aligns with the title, while the eyebrow spans above both columns.
- **Index number:** use `.case-index` in small UI-font utility typography. An index is navigation metadata, not a display-serif title or metric.
- **Numbered content row:** use `.case-numbered-row` with the shared `--case-index-column` and `--case-index-gap`. Keep the number close to and top-aligned with its child title and copy.
- **Parent versus child hierarchy:** the section eyebrow and editorial title establish the chapter. Child problem titles, decision details and deliverables must remain visibly subordinate in size and weight.
- **Width:** use the shared title and description maxima before adding a narrower constraint. Do not force arbitrary line breaks when the grid has available width.
- Do not create section-specific typography values when these shared primitives express the same role. A one-off is acceptable only for a genuinely different content role and must be documented here first.

Personal role/title:
**Product Designer**

---

## 3. Core colors

Use semantic tokens from `styles/tokens.css`.

Primary:
- Background: `#120f0d`
- Ivory text: `#f5efe6`
- Muted ivory: `rgba(245, 239, 230, 0.68)`
- Divider: `rgba(255, 244, 230, 0.20)`
- Panel: `rgba(23, 19, 16, 0.93)`
- Archival paper: `#d8c9b4`
- Archival ink: `#241b16`

Header scrim:
- warm near-black at top
- long fade to transparent
- no hard edge
- not a solid navbar
- not glassmorphism

Accent color should usually come from environmental artwork rather than generic bright UI colors.

---

## 4. Grid and spacing

All pages should share the homepage horizontal grid.

Desktop page gutter:
`clamp(30px, 6.6vw, 100px)`

Shared content width:
`min(calc(100% - (var(--page-gutter) * 2)), var(--content-max))`

Header top offset:
`clamp(20px, 2.8vh, 32px)`

Use a consistent spacing rhythm:
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

Do not invent arbitrary one-off margins when an existing spacing step works.

### Shared alignment rules
- The header brand, page hero and major section content share the same left start line: `var(--page-gutter)` on desktop and the documented mobile gutter at the mobile breakpoint.
- A readable max-width may constrain content toward the right, but it must not recenter the content and break the shared left start line.
- In split editorial sections, keep the eyebrow and title grouped in the left column. The right-column content aligns to the top of the large title, not the top of the eyebrow.
- A blue section label is always an eyebrow above its title. Never treat the label as a separate left-column equivalent while shifting the title into a second column.

---

## 5. Header

The site header is global and must be reused.

Structure:
- left: canonical `assets/brand/charles-design-logo.png` mark, linked to Home
- center: Work / About / Journal / Contact
- right: “Design a more / human tomorrow”
- warm top scrim behind it

Typography, positions, hover state and underline treatment should remain identical across pages.

The logo is always the Home action. “Home” is not included in primary navigation.

Only Work, About, Journal or Contact may receive the active navigation state. No primary navigation item is active on the homepage.

Do not recreate “Charles Chau” or “CHARLES.DESIGN” as text in future headers. Do not substitute a different logo treatment based on page references.

Every page must reuse the same shared header and logo implementation.

Do not recreate the header from a page reference image.

---

## 6. Image / reference policy

### Background artwork
AI-generated images are allowed for cinematic environmental scenes.

However:
- user-facing UI text must not be baked into them;
- page copy must be live HTML;
- nav must be live HTML;
- accessibility-relevant content must be live HTML;
- backgrounds should be treated as art direction, not as a finished webpage screenshot.

### When given an image that looks like a full webpage
Split the concept into:
1. background/decorative artwork;
2. live typography;
3. live navigation;
4. live controls/interactions;
5. shared site components.

Never simply use the full screenshot as a webpage background with its text baked in.

### Environmental text
Old Hong Kong signs may exist within artwork when decorative.
If a sign is important to interaction or portfolio meaning, prefer a controlled asset or live layer.

---

## 7. Motion language

Motion is cinematic and restrained.

Use:
- `180–240ms` for UI hover/focus
- `380–480ms` for local state changes
- `650–750ms` for camera/project focus
- `1.6–2.0s` for the homepage cinematic entrance

Preferred easing:
`cubic-bezier(0.2, 0.72, 0.18, 1)`

Ambient motion:
- irregular rather than synchronized
- subtle but perceptible
- never game-like
- never continuous pulsing unless extremely restrained

Physical-object rule:
Do not animate a duplicate of an object already baked into the background.
Use an isolated asset + clean plate when actual object motion is required.

### Editorial Summary / Result Pattern

Use the canonical `.editorial-summary` component for important concluding content only:
- key takeaways;
- results and outcome summaries;
- impact summaries;
- final insights, conclusions and strategic takeaways.

Do not use it for ordinary body copy, section introductions, metadata, evidence captions, Problem / Intervention / Strategy content or an in-progress hypothesis.

Structure:
1. one thin horizontal rule aligned to the shared content grid;
2. a small uppercase UI-font eyebrow in the project accent;
3. a centered display-serif statement sized below the page hero hierarchy;
4. an optional single accent phrase or meaningful metric;
5. a narrower centered UI-font supporting description in muted ivory.

Layout and spacing:
- the component stays inside the normal global page grid;
- the rule uses the full component width while the statement and support use controlled readable max-widths;
- use generous section spacing without a floating card, bordered box or full-width banner;
- keep all content live HTML and preserve a clear heading hierarchy;
- use the project accent for meaning, not decoration, and do not highlight multiple competing phrases.

Motion:
- reveal the eyebrow first, then the statement with a small upward fade, followed by the support copy with a short stagger;
- use the shared cinematic easing and restrained travel distance;
- never bounce, zoom dramatically or loop;
- under `prefers-reduced-motion`, show the complete component without staged movement.

All project pages reuse this component for equivalent result content. Do not introduce alternative result or callout styles on an individual project page unless the content has a clear structural need and the new pattern is deliberately documented here first.

---

## 8. Panels and overlays

Project panels:
- dark warm panel
- high text contrast
- serif title
- sans-serif metadata/body
- subtle divider/border
- no generic white SaaS card treatment

Overlay/scrim:
- use gradients to protect readability over rich imagery
- maintain the environmental image
- avoid opaque blocks unless functionally necessary

---

## 9. Hotspots

Default:
- visible small point
- clear enough to discover
- no label until hover/focus

Hover/focus:
- point grows subtly
- label appears
- text remains readable over complex artwork

Click:
- open/focus project content
- avoid object bounding-box outlines

Hotspots belong in a dedicated interaction layer above artwork.

---

## 10. Page-specific guidance: About / Profile page

The About page may use a different Old Hong Kong environment, such as an interior/old television scene.

Keep the same system:
- same global header
- same page gutters
- same fonts
- same ivory/muted palette
- same header scrim
- same motion language

Recommended hierarchy:
- eyebrow: Inter uppercase
- major statement: Georgia
- supporting paragraph: Inter, not a new serif/body font
- stats: Georgia value + Inter label
- divider: shared `--color-line`

If an AI-generated About reference contains its own typography, remove/bypass that typography and rebuild it as live HTML.

The TV/background image is decorative unless made interactive.

---

## 11. Project case-study pages

Case studies reuse the global header, page gutters, typography, warm palette and motion tokens.

The reading experience should be calmer than the homepage: approximately 70% clarity and 30% portfolio personality.

Reusable structure:
- live-HTML project hero and metadata;
- concise overview followed by an early editorial metric row;
- evidence-led challenge and strategic reframing;
- numbered solution chapters with large product imagery;
- live-HTML funnel strategy comparison;
- impact conclusion and shared next-project navigation.

### Case-study hierarchy patterns
- Section headings use one sequence: project-accent eyebrow, then display-serif title directly below it.
- Use `.case-section-heading`, `.case-section-title` and `.case-section-description` for standard case-study headers. On desktop, the eyebrow spans the header and the description aligns to the title row; on narrow screens they collapse into normal reading order.
- Numbered solution chapters use a small fixed index column beside a grouped eyebrow-and-title block. The index and eyebrow are supporting metadata; the title remains dominant. Reuse the same index width, gap and vertical alignment for every chapter on the page.
- Introduce a group such as **Core Design Decisions** once at parent level. Individual child decisions use their index, title, description and evidence without repeating the same category eyebrow.
- When a split section includes explanatory content beside the heading, align that content with the title top rather than the eyebrow.
- Strategic, editorial and framing sections—including Key Observations, Strategic Reframing and Working Hypothesis—reuse one horizontal split pattern on desktop: the eyebrow spans the component above a left-column statement and a right-column explanation. Do not alternate between stacked and split arrangements for equivalent content. Collapse the same hierarchy into normal reading order on narrow screens.
- Large strategic statements use a controlled readable max-width within their grid column. Do not create arbitrary narrow containers that force awkward line breaks, or allow a statement to run so wide that its hierarchy becomes unclear.
- Delivery or scope lists use secondary UI-font headings and small index markers. They support the main editorial outcome title and must not compete with it in display type.
- Meaningful numerical outcomes use the restrained project accent for emphasis. Apply it to primary metrics, percentages and decision-step indices only; do not color every number in prose or routine metadata.
- Preserve a substantive **Key trade-off** section whenever the project includes meaningful cross-team negotiation. Show stakeholder perspectives, how the conflict was resolved, what was accepted and what the decision unlocked; do not collapse strategic reasoning into a single summary sentence.
- Trade-off sections use spacing and hierarchy before rules. Keep only dividers that clarify the outer structure or a true column boundary; do not add horizontal lines between every resolution, cost, benefit or outcome block.
- Editorial metrics may use a restrained hover treatment: a slight brightness increase, up to `2px` upward movement and a small accent-rule enhancement. Avoid bounce, counters or persistent motion.
- Funnel strategy content remains semantic, live HTML. When three funnel moments would create a dense always-visible table, use quiet text-button controls for PDP / PLP / Cart and progressively disclose the selected synthesis, such as user intent and the role of the intervention. Controls must be keyboard accessible, preserve mobile usability and never flatten structured content into an image. The shared panel uses fixed column tracks and a stable minimum height so switching states never causes visible page reflow. When the heading already states the summary idea, do not repeat it in adjacent introductory copy.
- Result statements—including decision outcomes, trade-off conclusions and final impact summaries—use the canonical **Editorial Summary / Result Pattern** in section 7. Do not introduce page-specific bars, cards or alternative callouts for equivalent content.

### Project hero pattern
- Project heroes use a two-column desktop composition: left for eyebrow, title, description and metadata; right for project media.
- **My Role** is an extension of the hero metadata, not a separate full section. Keep it inside the same metadata group, with its label and contribution statement aligned to the metadata grid; do not introduce a separate section divider above it.
- The media remains visually secondary to the title, aligns vertically with the title-and-description zone and shares the global page grid’s right edge.
- Preserve the overall hero height while balancing the columns through proportional media sizing rather than oversized artwork.
- Media always retains its intrinsic ratio with `height: auto` or `object-fit: contain`; never stretch or distort product screens.

### Evidence modules
- Evidence modules separate explanation from imagery. Section titles, observations, descriptions and accessibility-critical meaning remain live HTML outside the image canvas.
- Hypotheses and inference statements appear as independent supporting callouts at the end of the relevant evidence section; never bake them into screenshots.
- Paired supporting and validation evidence shares one outer grid, matched heading rhythm, consistent image-canvas logic and aligned caption baselines.
- The image canvas, live caption and inner content frame share the same width and visual edges. Every evidence canvas clips overflow cleanly; no absolute crop or background layer may protrude outside it.
- Evidence imagery may contain authentic product UI annotations or diagram labels when they are part of the source artifact, but portfolio section hierarchy and narrative copy must remain live HTML.

### Case Study Vertical Rhythm
- All top-level case-study sections use the shared spacing tokens from `styles/tokens.css`: `--case-section-y`, `--case-section-inner-gap` and `--case-section-content-gap`.
- The canonical outer section padding is `--case-section-y: clamp(120px, 9vw, 152px)` on desktop and `clamp(80px, 20vw, 96px)` on mobile. At the standard validation viewports this resolves to approximately `144px` and `80px` respectively.
- Every top-level `.case-section` uses the same `--case-section-y` value for both `padding-top` and `padding-bottom`. This applies equally to Overview, Challenge, Observations, Strategic Reframing, Design Principles, Architecture, Design Decisions, Trade-offs, Impact and Results. There is no compact outer-section variant.
- A section divider marks the outer boundary; the distance from that boundary to the first content group, and from the last content group to the next boundary, is governed by the parent section padding. Decorative rules and child wrappers must not introduce a second layer of section-sized vertical padding.
- Use `--case-section-inner-gap` between a section heading, its main content and primary evidence. Use `--case-section-content-gap` for tighter relationships such as evidence-to-caption, evidence-to-inference and adjacent subcomponents.
- The canonical section sequence is: section padding → eyebrow/title group → explanation → evidence/supporting content → optional conclusion → section padding. The parent `.case-section` controls spacing above and below; use the two shared inner-gap tokens for relationships inside that sequence.
- On desktop, target roughly `144px` at both the top and bottom of every top-level section. On mobile, target roughly `80px` at both edges. Within a section, use approximately `24px` from eyebrow to title, `32–40px` from title to description, `48–64px` from description to primary evidence and `16–20px` from media to caption.
- Let the parent section control chapter-level spacing. Reset or avoid child margins that duplicate section padding; headings, image wrappers and callouts must not create an additional section-sized gap.
- A scroll-linked, full-screen chapter handoff is the major exception. It may use `min-height: 100svh` or its existing finite sticky corridor, but must not stack standard `.case-section` padding on top of the full-screen transition.
- Shared tokens define a predictable rhythm, not identical section heights. Content may grow naturally while section starts, internal gaps and endings remain consistent across projects and breakpoints.
- Do not introduce arbitrary project-specific section margins. If a recurring spacing need is not covered, extend the shared token system before adding one-off values.

### Case-study transition and media rules
- Reusable media placeholders preserve the final asset ratio before source media arrives. Keep them visually neutral, label their intended content with live HTML and avoid large play controls. Future video replacements use the same container with `muted`, `autoplay`, `loop` and `playsinline` where appropriate, retain a poster or fallback state, and switch between `object-fit: contain` and `cover` without changing layout.
- A **Key Design Decisions** intro may use a scroll-linked full-screen handoff before the detailed solutions. Pin the outgoing chapter only within a finite scroll corridor, gently scale/soften/darken it, move its heading upward and let the incoming chapter rise from the bottom until it owns the viewport. Normal document scrolling resumes immediately afterward. The motion must be continuous, non-snapping and implemented without scroll-jacking; reduced-motion uses a normal-flow fade or static chapter break.
- Within every solution chapter, the fixed index column, eyebrow/title group, three-part metadata row and product-image canvas share one repeatable content structure. Metadata and media start at the same content line after the index column; do not introduce arbitrary image offsets.
- Project hero media aligns intentionally to the global page grid. Its right edge relates to the right-side header grid, while its width and controlled visual height keep it secondary to the editorial title. The actual artwork—not only its outer frame—should normally occupy roughly 85–95% of the available media width. Scale it proportionally, reduce accidental dead space and allow only a small intentional crop when necessary to preserve the composition.
- Hero and solution imagery always preserve intrinsic proportions. Fixed or maximum visual heights are allowed only with `height: auto` / `object-fit: contain`; never stretch device mockups.

Project colors may be introduced as restrained local accents. They must not replace the global warm dark/ivory system.

Case-study art direction may connect a project to the homepage through a heavily darkened environmental crop. Product evidence may sit on an archival-paper surface, and strategy documents may use a full warm-paper band with dark ink. These treatments stay restrained: no new typeface, decorative retro copy or large project-color atmosphere.

Images retain their intrinsic proportions with `height: auto` and `object-fit: contain` unless an image is explicitly decorative. Scroll reveals use small opacity/translate transitions and are removed under `prefers-reduced-motion`.

Avoid generic dashboard cards, decorative process artifacts and page-specific navigation. Product screenshots are supporting evidence; meaningful headings, descriptions, metrics and table content remain live HTML.
