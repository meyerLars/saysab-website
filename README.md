# saysab website

## Lokal starten

```bash
cd ~/Projekte/saysab-website
npm install      # einmalig
npm run dev
```

Dann im Browser öffnen: http://localhost:5173
Beenden mit `Ctrl+C` im Terminal.

## Build

```bash
npm run build    # erzeugt dist/
npm run preview  # dist/ lokal ansehen
```

## Dateien

- `src/lib/catalog.ts` Preise, Tiere, Farben, Abos, Kontakt
- `src/components/` Seitenbereiche (Hero, Lineup, Pricing, Preorder, Contact …)
- `src/components/ui/` shadcn/ui-Komponenten
- `src/index.css` Markenfarben und Schrift
- `public/img/` Produktbilder
