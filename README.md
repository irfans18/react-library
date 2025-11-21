# Booky – Library Web MVP

Modern React + TypeScript frontend that follows `docs/instruction_wph_library_web_app.md` and consumes the REST contract in `docs/swagger.json`.

## Assumptions

- The provided REST API respects the swagger paths (e.g. `/api/books`, `/api/me`).
- JWT tokens are issued on login and accepted via `Authorization: Bearer <token>`.
- For this pure frontend MVP the token lives in memory + `localStorage` (documented security trade-off).
- Tailwind + shadcn/ui primitives are already configured (see `components.json`).

## Quick Start (≈10 min)

1. **Install deps (bun preferred)**
   ```bash
   bun install
   ```
2. **Copy envs**
   ```bash
   cp env.example .env
   ```
   Update `VITE_API_BASE_URL` to point at your REST server.
3. **Run dev server**
   ```bash
   bun run dev
   ```
4. **Build for production**
   ```bash
   bun run build && bun run preview
   ```

## Tech Stack

- React 19 (Vite) + TypeScript
- Tailwind CSS 4 + shadcn/ui atoms
- Redux Toolkit (`authSlice`, `uiSlice`)
- TanStack Query for data fetching + optimistic borrow mutation
- Axios API client, Day.js formatting, React Router v7

## Folder Structure

```
src/
├── components/            # Layout, navigation, reusable widgets
├── features/              # Redux slices (auth, ui)
├── hooks/                 # Toast + query helpers
├── pages/                 # Route-level views (auth, books, loans, profile, cart, admin)
├── services/              # axios client, query keys, API wrapper
├── store.ts               # Redux store setup
└── types/                 # Swagger-aligned interfaces
```

## Environment Variables

| Name               | Description                          | Example                         |
| ------------------ | ------------------------------------ | ------------------------------- |
| `VITE_API_BASE_URL`| Base URL for the Library REST API    | `https://api.yourlibrary.com`   |

## Available Scripts

| Script        | Description                        |
| ------------- | ---------------------------------- |
| `bun run dev` | Start Vite dev server              |
| `bun run build` | Type-check + build for production |
| `bun run preview` | Preview built bundle locally      |
| `bun run lint` | ESLint across the project        |

## Implementation Guide

1. **State & networking**
   - `src/services/api.ts` centralizes Axios base URL + auth header injection.
   - `src/services/libraryApi.ts` wraps every swagger endpoint with typed helpers.
   - `src/services/queryKeys.ts` provides stable TanStack keys.
   - `src/hooks/useLibraryQueries.ts` exposes reusable hooks (`useBooksQuery`, `useBorrowBookMutation`, etc.) including optimistic cache updates when borrowing.
2. **Global store**
   - `authSlice` keeps `token` + `user`, persists JWT to `localStorage`.
   - `uiSlice` toggles cross-app UI (sidebar, future modals).
   - `ProtectedRoute` guards authenticated sections.
3. **Screens**
   - Auth: `LoginPage`, `RegisterPage` reuse the Booky brand from the provided design and push to `/`.
   - Books: `BookListPage` implements search + category/author filters, grid cards, and inline borrow CTA.
   - `BookDetailPage` shows hero, stats, latest reviews, and 7-day borrow action with optimistic update.
   - `MyLoansPage`, `ProfilePage`, `CartPage`, and `AdminDashboardPage` cover the remaining MVP pages + placeholders.
4. **UI/UX**
   - Navbar exposes navigation + logout.
   - Toast feedback via `sonner`.
   - Day.js renders friendly dates, badges highlight loan states.

## Security Note

For this MVP the JWT lives in Redux + `localStorage`. Before shipping to production move the token into HTTP-only cookies or another secure storage strategy.

## Follow-up Prompt Skeleton

```
You are an expert React designer. Given the existing Booky MVP, produce Tailwind-compliant component markup for the following screen:
- Screen:
- Required data:
- Interaction states:
Ensure compatibility with the current component structure (`BookCard`, `StatCard`, etc.) and keep props typed with existing interfaces from `src/types`.
```
