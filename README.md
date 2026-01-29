# Seattle Independent Bookstore Showcase

An interactive web app showcasing Seattle's independent bookstores with a map, blog, newsletter signup, and admin dashboard.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** SQLite + Prisma ORM
- **Map:** Leaflet + react-leaflet + OpenStreetMap tiles
- **Styling:** Tailwind CSS
- **Newsletter:** Buttondown
- **Blog:** Markdown content with react-markdown + remark-gfm
- **Testing:** Vitest (unit) + Playwright (e2e)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd seattle-bookstores
npm install
```

### Database Setup

```bash
npx prisma db push
npm run seed
```

### Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL="file:./prisma/dev.db"
ADMIN_PASSWORD="your-admin-password"
NEXT_PUBLIC_BUTTONDOWN_USERNAME="your-buttondown-username"
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    page.tsx              # Homepage with interactive map
    bookstores/           # Bookstore listing and detail pages
    blog/                 # Blog listing and post pages
    newsletter/           # Newsletter signup page
    admin/                # Admin dashboard (login, blog/bookstore management)
    api/                  # REST API routes
  components/
    BookstoreMap.tsx       # Leaflet map with markers, search, filters
    MapWrapper.tsx         # Client-side wrapper for dynamic import
    Header.tsx             # Site header with navigation
    Footer.tsx             # Site footer with newsletter signup
    NewsletterSignup.tsx   # Newsletter subscription form
    BlogEditor.tsx         # Blog post editor with markdown preview
    BookstoreEditor.tsx    # Bookstore entry editor
  lib/
    prisma.ts             # Prisma client singleton
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Seed data (12 bookstores, 3 blog posts)
```

## Features

- **Interactive Map:** Leaflet map centered on Seattle with markers for each bookstore, popup details, search bar, and neighborhood filter
- **Bookstore Directory:** Browse bookstores by neighborhood with detail pages
- **Blog:** Markdown-rendered blog posts about Seattle's bookstore scene
- **Newsletter:** Buttondown-powered email signup (in footer and dedicated page)
- **Admin Dashboard:** Password-protected admin area for managing bookstores and blog posts with live markdown preview
- **SEO:** Dynamic metadata, sitemap.xml, robots.txt
- **Error Handling:** Custom loading, error, and 404 pages

## Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests (requires dev server)
npm run test:e2e
```

## Admin Access

Navigate to `/admin` and enter the password set in `ADMIN_PASSWORD`.

## Notes

- Leaflet is dynamically imported with `ssr: false` to avoid SSR crashes
- Uses `leaflet-defaulticon-compatibility` for marker icon fixes under Webpack
- Prisma client uses a singleton pattern to avoid connection pool issues during HMR
- SQLite is used for development; switch to PostgreSQL for serverless deployment
