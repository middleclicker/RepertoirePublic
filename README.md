# Repertoire website

A static website for Repertoire — landing page with an interactive ranking demo and theme explorer — plus a separate privacy policy.

- Website: https://middleclicker.github.io/RepertoirePublic/
- Privacy: https://middleclicker.github.io/RepertoirePublic/privacy/
- Support: https://github.com/middleclicker/RepertoirePublic/issues
- Email: cxy20052008@gmail.com
- Android: https://github.com/middleclicker/RepertoirePublic/releases/tag/android-v1.0.0 (signed APK, version 1.0.0, Android 8.0+)

No build step, dependencies, tracking scripts, cookies, or client-side storage. `site.js` only adds the demo, theme picker and scroll reveals; the page reads fully without it. Screenshots in `assets/screens` are resized copies of the app repo’s `docs/screenshots`.

Preview locally with `python3 -m http.server 4173`, then open http://localhost:4173.
Pushes to `main` publish the explicitly selected static files through GitHub Pages.

The policy reflects the app implementation reviewed October 20, 2026, including Android authentication, backups, notifications, and account deletion. Review it whenever data practices change. Android downloads use public GitHub release assets; signing keys and App Bundles are not part of this website. App Store and TestFlight download links can be added when available.

Published policies now include `/terms/`, `/community/`, `/support/`, and the updated `/privacy/` describing private Firebase cloud sync and public content moderation. The deployment workflow explicitly copies these directories.
