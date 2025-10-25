This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Command Palette (Global Search Menu)

A modern, keyboard-driven command palette/search menu similar to Vercel, Linear, and VS Code.

**How to use:**
- Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the search menu
- Click the search icon in the left sidebar
- Type to filter through pages, settings, and actions
- Use arrow keys to navigate
- Press Enter to select an item
- Press Escape to close

**Features:**
- Fast keyboard navigation with ⌘K / Ctrl+K shortcut
- Real-time search filtering
- Categorized results (Pages, Settings, Actions)
- Click to open functionality
- Beautiful dark mode UI with smooth animations
- Fake data included for demonstration

The command palette is implemented in `components/ui/command-palette.tsx` and is fully integrated with the sidebar.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
