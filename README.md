# LumaStudio Website

موقع إلكتروني تعريفي لاستوديو **Luma Studio** — عرض المشاريع والخدمات بتصميم عصري مع دعم `Light/Dark Mode` واللغتين العربية والإنجليزية.

## Tech Stack

- **Build:** Vite 6 + React 19 (TypeScript)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** `lucide-react`
- **Runtime:** pure static frontend — no backend

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Dev server on port 3000          |
| `npm run build`  | Production build to `dist/`      |
| `npm run lint`   | Type-check (`tsc --noEmit`)      |
| `npm run preview`| Preview the production build     |
| `npm run clean`  | Remove `dist/` (cross-platform)  |

## Folder Structure

```
lumastudio-main/
├── index.html                  # HTML shell + font loading
├── vite.config.ts              # Vite + Tailwind plugins, "@" alias → src/
├── tsconfig.json               # TS config, "@/*" → "./src/*"
├── public/
│   ├── assets/                 # Static brand assets (logo.svg / logo.png)
│   └── apps/<slug>/            # Per-product static files
│       ├── logo.png
│       └── screenshots/        # Place product screenshots here (see below)
└── src/
    ├── main.tsx                # React entry — mounts <App />
    ├── App.tsx                 # Root router (popstate-based) + /admin guard
    ├── index.css               # Design tokens (@theme) + light-mode overrides + shadow/aurora utils
    ├── types.ts                # Shared domain types (Project, SiteSettings, ...)
    ├── pages/                  # Route-level views
    │   ├── HomePage.tsx        # Hero + showcase + about + contact + footer
    │   ├── ProjectDetailPage.tsx
    │   └── NotFoundPage.tsx
    ├── admin/                  # Admin panel (hidden, /admin guard)
    │   ├── auth.ts             # Passcode gate (sessionStorage, 8h expiry)
    │   ├── AdminLogin.tsx      # Unlock screen at /admin/login
    │   ├── AdminPanel.tsx      # Dashboard: list + import/export/reset
    │   └── ProjectEditor.tsx   # Bilingual create/edit form
    ├── components/             # Reusable UI blocks used across pages
    │   ├── TopBar.tsx          # Wide glass top navigation bar (the "Top Bar")
    │   ├── LangThemeControls.tsx # Language + theme toggles
    │   ├── LivingAuroraBackground.tsx
    │   ├── LumaStudioLogo.tsx
    │   ├── GhostPill.tsx / BasaltHero.tsx
    │   ├── AboutSection.tsx / ContactSection.tsx / Footer.tsx
    │   └── ProductPhotoShowcase.tsx
    ├── i18n/
    │   ├── translations.ts     # en / ar dictionaries
    │   └── LocaleContext.tsx   # Lang + theme state, persisted to localStorage
    ├── data/
    │   ├── projects.json       # SINGLE source of truth for settings + projects
    │   ├── initialData.ts      # Loads + normalizes projects.json → typed Project[]
    │   └── projectsStore.ts    # localStorage CRUD + import/export + change events
    └── utils/
        ├── normalizeProject.ts # Raw JSON → Project (with slug/screenshot defaults)
        ├── localize.ts         # project → localized copy for current lang (En/Ar)
        ├── slugify.ts
        ├── driveUrlParser.ts   # Google Drive link → direct embed URL
        └── downloadProject.ts  # Triggers file download
```

## Conventions

### Data flow
`src/data/projects.json` is the seed data file. `initialData.ts` reads it and
runs each entry through `normalizeProject` (adds `slug`, resolves screenshot
paths, fills fallbacks). **Edit products in `projects.json` or via the admin
panel.**

The admin panel edits are persisted to `localStorage` (`lumastudio_projects_v1`)
on top of the seed, so the public site reflects them immediately (same tab and
across tabs via `lumastudio:projects-change` / `storage` events).

To publish admin edits to the repository: use **Export JSON** in the panel to
download a fresh `projects.json`, drop it over `src/data/projects.json`, and
commit. **Import JSON** accepts the same file back.

Projects have optional bilingual fields (`titleEn/Ar`, `descriptionEn/Ar`,
`detailedDescriptionEn/Ar`) — `utils/localize.ts` resolves them for the active
language with graceful fallback to the English/default value.

To ship a product file, place it in `public/apps/<slug>/` and reference it via
the `"file"` field — the download URL resolves to `/apps/<slug>/<file>`.

For screenshots, put images in `public/apps/<slug>/screenshots/` and list the
file names in `projects.json` under `"screenshots": []`.

### Theming (`dark` → `light`)
- All colors are **design tokens** defined once in `src/index.css` under `@theme`
  (semantic utilities like `bg-surface`, `text-muted`, `border-line`).
- Light mode only overrides the token variables inside
  `[data-theme='light']` — every component using token utilities follows
  automatically. Do **not** hardcode hex colors in `className` strings.
- Prefer token utilities everywhere; keep literal `#fff`/`text-white` only on
  dark overlays that stay dark in light mode (e.g. the photo lightbox).
- `text-white` on themed surfaces is treated as a bug: use `text-ink` instead.

### i18n
All user-facing copy must come from `t('key')` (see `useLocale`). Add keys to
**both** `en` and `ar` dictionaries in `src/i18n/translations.ts`.

### `/admin` isolation & security
- **Public visitors get a 404** for `/admin` and all `/admin/*` paths — the
  dashboard is never linked from the TopBar or Footer, so it's invisible.
- The only unlock door is `/admin/login` (also linked nowhere). It asks for a
  passphrase configured via env `VITE_ADMIN_PASSPHRASE` (default
  `luma-admin-2026`) and opens an 8-hour session in `sessionStorage`.
- This is a **client-side gate** suitable for the current static scope. Real
  authorization requires the future backend; the choke point stays in
  `src/App.tsx`.
- The panel uses the same design tokens as the site (Light/Dark aware).

**Working in dev:** open `http://localhost:3000/admin/login`, unlock, then
`/admin` shows the dashboard. A fresh `vite-env.d.ts` ships `vite/client`
types so `import.meta.env` is typed.

## Adding a Product

```jsonc
// src/data/projects.json → "projects": []
{
  "id": "my-app",
  "slug": "my-app",             // optional; defaults to slugified title
  "title": "My App",            // default fallback title (English)
  "titleEn": "My App",          // optional per-language overrides
  "titleAr": "تطبيقي",
  "category": "Desktop",        // Mobile | Desktop | Web
  "description": "Short pitch",
  "descriptionEn": "Short pitch",
  "descriptionAr": "وصف قصير",
  "detailedDescription": "Longer overview shown on the detail page",
  "detailedDescriptionAr": "نظرة أعمق تظهر في صفحة التفاصيل",
  "screenshots": ["shot-1.png"], // resolved to /apps/my-app/screenshots/shot-1.png
  "icon": "/apps/my-app/logo.png",
  "file": "Setup.zip",          // optional; enables download button
  "downloadLabel": "Setup.zip",
  "isFeatured": true,           // featured products show on the homepage
  "techStack": ["React", "C#"],
  "liveUrl": "https://example.com", // "#" or "" hides the live-preview button
  "createdAt": 1700000000000
}
```

> Tip: The admin panel's **Edit / Add Project** form fills all of these fields
> (bilingual) and **Export JSON** produces exactly this shape to commit.

## Polish & Extend

- Top Bar lives in `src/components/TopBar.tsx` — a wide, comfortable glass bar
  (max-width 1400px, rounded-2xl, soft `topbar-shadow`) with center links
  (Products dropdown / Explore / About / Contact) and a responsive mobile menu.
- Theme/language state lives in `LocaleContext` and persists to `localStorage`
  (`lumastudio_theme`, `lumastudio_lang`).