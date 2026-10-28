# saysab website

Statische Website, zunächst ohne Build-Schritt und ohne Abhängigkeiten.

## Start
`python3 -m http.server 8000` im Projektordner, dann http://localhost:8000

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
