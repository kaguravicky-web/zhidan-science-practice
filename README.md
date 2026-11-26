# P3–P4 Science Practice

Home practice pages for a Primary 3 pupil going into P4 (Singapore primary science syllabus). Everything is tapped, nothing is typed.

- `index.html` — the science site: all P3–P4 units, learn cards with photos, sort games, practice sets in four levels, a mistake book.
- `topics/*.js` — one data file per unit. How to write one: `tools/AUTHORING.md`. Check them with `node tools/check.js`.
- `mrt/` — the phone page for short rounds on the MRT: English spelling words (from the spelling site) + these science questions, at most 10 per round, works offline once opened.
  - The science questions are read straight from `topics/`.
  - The English words are copied from the spelling site: run `node tools/sync_english.js` after a list is added there, then bump the version (`2026-11-26-1`) in `mrt/index.html`.
- Progress is kept in the browser's localStorage (`sci-v3-*` for science, shared by both pages; `mrt-en-*` for English on the phone page).
- Photos are Wikimedia Commons thumbnails (credits on the parent tab). All questions are written for these pages.
