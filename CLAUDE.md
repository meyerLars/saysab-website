# saysab website

React-Website (Vite, Tailwind, shadcn/ui, Framer Motion). Sprache der Seite: Englisch.

## Start
`npm install` (einmalig), dann `npm run dev` und http://localhost:5173 öffnen.
Build: `npm run build` (Ausgabe in `dist/`). Vite 6, weil Node 22.11 installiert ist (Vite 8 braucht ≥ 22.12).
Preise, Tiere, Farben, Abos und Kontakt stehen zentral in `src/lib/catalog.ts`.

## Regeln
- Keine neuen Abhängigkeiten oder Frameworks ohne Rückfrage.
- Vor größeren Änderungen committen.
- # Visual & Design Guidelines (Impeccable & Kowalski Style)

- **Layout:** NO generic card/bento layouts. Use intentional asymmetry, large typography, and generous whitespace.
- **Interactions:** Every interactive element must have a tailored fluid animation (Framer Motion). Prefer spring physics over linear easings.
- **Components:** Use shadcn/ui primitives. Execute `npx shadcn@latest add [component]` via terminal if a UI element is missing.
- **Quality Check:** Review code for "AI-Slop" (e.g., unnecessary borders, generic gradients, repetitive structures) before finalizing.


## Ziel und Umfang
(von Lars auszufüllen)
