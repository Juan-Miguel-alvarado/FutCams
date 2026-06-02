# Tu Camisa Pal' Mundial

Storefront for a football (soccer) jersey shop based in Montería, Córdoba, Colombia.
Customers browse national-team jerseys, pick size and fit, and place the order
through WhatsApp. Deliveries go out every Thursday.

> _"La del mundo, a tu puerta."_

## Features

- **Catalog** with live filtering by country, type (`1.1` / `Conjunto AAA`) and sex,
  a results counter and removable active-filter chips.
- **Product detail** page with image zoom, size/fit selection and a one-tap
  **WhatsApp** order (the message is prefilled with the jersey, size and price).
- **Realtime** catalog — any insert/update/delete in the database updates the UI
  without a reload (Supabase Realtime).
- **Dark, minimalist UI** using the canonical shadcn/ui theme (Rhea preset) with
  subtle scroll-reveal animations that respect `prefers-reduced-motion`.
- Fully responsive, SEO/Open Graph tags, and a floating WhatsApp button.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + **shadcn/ui** (style: `radix-rhea`, base color: neutral)
- **Base UI** primitives + **lucide-react** icons
- **React Router** for routing
- **Supabase** (Postgres + Realtime) as the backend

## Getting started

Requirements: Node.js 18+ and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production (outputs to dist/)
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Configuration

The Supabase URL and anonymous (public) key live in
[`src/supabase.ts`](src/supabase.ts). The anon key is safe to expose in the
client; access is controlled by Row Level Security on the database.

Shop-wide constants (WhatsApp number, brand name, location, price formatting and
the WhatsApp message template) live in [`src/lib/constants.ts`](src/lib/constants.ts).

## Data model

The catalog reads from a single `camisetas` table:

| Column        | Type       | Notes                                   |
| ------------- | ---------- | --------------------------------------- |
| `id`          | `uuid`     | Primary key                             |
| `pais`        | `text`     | Country / national team                 |
| `tipo`        | `text`     | `1.1` or `Conjunto AAA`                 |
| `tallas`      | `text[]`   | Available sizes (e.g. `S`, `M`, `L`)    |
| `sexo`        | `text`     | `Masculino` or `Femenino`               |
| `horma`       | `text`     | Fit (e.g. Slim, Regular, Oversized)     |
| `precio`      | `numeric`  | Price in COP                            |
| `foto_url`    | `text`     | Image URL (falls back to a placeholder) |
| `disponible`  | `boolean`  | In stock                                |
| `destacado`   | `boolean`  | Featured (sorted first)                 |
| `created_at`  | `timestamp`| Creation date                           |

## Project structure

```
src/
├── components/        # Navbar, Footer, cards, marquee, reveal, icons, ui/ (shadcn)
├── pages/             # Home (hero, catalog, delivery, FAQ) and Detalle (product)
├── lib/               # constants, the useCamisetas hook and utils
├── supabase.ts        # Supabase client + Camiseta type
├── index.css          # Tailwind + theme tokens + animations
└── main.tsx           # app entry
public/
└── hero-jerseys.jpg   # hero background mosaic
```

## Ordering flow

Each "Pedir por WhatsApp" button builds a `wa.me` link with a prefilled message
containing the country, type, size, sex, fit and price, so the customer just hits
send and the shop replies to confirm availability and arrange Thursday delivery.
