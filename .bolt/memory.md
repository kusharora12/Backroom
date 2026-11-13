# Project memory

## Product intent & audience

- Portfolio or creative-agency style website showcasing "Work" and "Services" sections.
- Production-quality, visually distinctive, not template-looking.

## Brand personality & voice

- Premium, polished, design-forward presentation of work/services.

## Visual design & UX direction

- Accent color: teal (used for service-number hover and likely other accents).
- Services cards: unified template — identical dimensions, spacing, image treatment, content placement, white numbers with teal hover. No mixed accents/styles.
- Work section: controlled center-high arc/curve layout matching a user-provided reference image; consistent image sizes, balanced spacing. Avoid unpredictable per-card offsets/tilts that cause clipping.
- Hero: curve animation must exactly match the reference image (centered arc geometry).
- Desktop: content-sized pinned sections (ScrollTrigger-style pinning) rather than forcing content into a single clipped viewport height.
- Mobile: native horizontal scrolling instead of desktop pinning math; do not trap mobile in desktop scroll/pin calculations.
- Layout priority: even spacing, no content cutoff, consistent cards, eye-pleeling alignment across Work and Services.

## Decisions, constraints & rationale

- Stack: Vite + React + JSX, Tailwind CSS, Lucide React icons. Do not add UI/icon packages unless explicitly requested.
- Import alias: `@/` → `src/`.
- A unified layout system was chosen over fragile mixed card offsets to fix clipping and inconsistency.
- Verification includes type-check, build, and browser diagnostics after layout/geometry changes.
- Reference image(s) provided by user are authoritative for curve/arc geometry in Work and hero animation.

## Open questions & assumptions

- Hero curve animation reference is known to the user but not stored here; exact path data may need re-confirmation if revisited.
- ScrollTrigger/GSAP presence inferred from pinning/scrubbing behavior; confirm library if extending animations.