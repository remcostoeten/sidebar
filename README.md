# Sidebasr

A modern Next.js app with a dark-themed sidebar and command palette.

## Features

- **Command Palette**: `⌘K` / `Ctrl+K` global search with keyboard navigation
- **Dark Theme**: Consistent neutral color palette throughout
- **Feature Flags**: Toggle features via environment variables
- **Route Config**: Centralized route management
- **Vercel Analytics**: Built-in analytics tracking

## Configuration

### Feature Flags

Set in `.env.local` (copy from `.env.example`):

```bash
NEXT_PUBLIC_FF_COMMAND_PALETTE=true
NEXT_PUBLIC_FF_RIGHT_SIDEBAR=true
NEXT_PUBLIC_FF_ANALYTICS_TAB=true
NEXT_PUBLIC_FF_PROJECTS_TAB=true
```

### Routes

Import routes from `src/config/routes.ts`:

```ts
import { getRoute, isRoute } from '@/config/routes'

getRoute('dashboard') // '/'
isRoute('analytics')   // true
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Structure

```
src/
├── app/           # Next.js app directory
├── components/    # React components
├── config/        # Routes & feature flags
└── lib/          # Utilities
```