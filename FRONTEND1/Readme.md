# Central Perk Café — Landing Page Clone

A static, multi-page website clone built with plain HTML and CSS — no frameworks, no CSS libraries, no build tools.

Live site: https://centralparkcafe.netlify.app/

## What this is

A Friends-themed coffee shop landing page, built to a Figma reference as a frontend fundamentals exercise. The goal was pixel-accurate layout, clean semantic markup, and responsive behavior across screen sizes — not interactivity or backend logic.

## Pages

- `index.html` — Landing page: hero section, category bar, product grid, promo banner, testimonials, footer
- `login.html` — Login page markup
- `signup.html` — Signup page markup

Login and signup are markup only. There's no form validation or authentication logic — submitting either form does nothing, by design at this stage.

## Stack

- HTML5 (semantic elements: `header`, `nav`, `footer`)
- Plain CSS3 — no preprocessor, no framework
- CSS custom properties (`:root` variables) for the color palette and typography scale
- [Lucide](https://lucide.dev/) icon library, loaded via CDN script tag
- Layout built with Flexbox throughout (no CSS Grid)

## Structure

```
FRONTEND1/
├── index.html
├── login.html
├── signup.html
└── style.css
```

All styling lives in a single `style.css` file, organized by section with comment headers (global styles, navigation, hero, product grid, testimonials, footer).

## Responsive behavior

One breakpoint at `768px` handles the mobile layout. Desktop and tablet share the same layout above that width.

## Known gaps
- Nav links other than "Home" and "Login" point to `#` and don't route anywhere yet.
- Images are hotlinked from Unsplash rather than self-hosted.

## Running locally

No build step required — open `index.html` directly in a browser, or serve the folder with any static server (e.g. VS Code Live Server).
