# Repertoire website

A static website for Repertoire — landing page with an interactive ranking demo and theme explorer — plus a separate privacy policy.

- Website: https://middleclicker.github.io/RepertoirePublic/
- Privacy: https://middleclicker.github.io/RepertoirePublic/privacy/
- Support: https://github.com/middleclicker/RepertoirePublic/issues
- Email: cxy20052008@gmail.com

No build step, dependencies, tracking scripts, cookies, or client-side storage. `site.js` only adds the demo, theme picker and scroll reveals; the page reads fully without it. Screenshots in `assets/screens` are resized copies of the app repo’s `docs/screenshots`.

Preview locally with `python3 -m http.server 4173`, then open http://localhost:4173.
Pushes to `main` publish the explicitly selected static files through GitHub Pages.

The policy reflects the app implementation reviewed October 17, 2026. Review it whenever data collection, publication, providers, or deletion behavior changes. App Store and TestFlight download links can be added when available.
