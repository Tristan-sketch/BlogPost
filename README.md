# BlogPost

A blog platform built during my internship at Titanom. Signed-in users can write blog posts, filter them by theme, and comment on posts. They can edit and delete their own posts and comments.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (e.g. Supabase)
- [react-hook-form](https://react-hook-form.com/) and [zod](https://zod.dev/) for forms and validation
- [@t3-oss/env-nextjs](https://env.t3.gg/) for type-safe environment variables

## Getting started

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` and fill in your database URL and Clerk keys.

3. Run the database migrations:

   ```bash
   pnpm db:migrate
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script             | Description                                       |
| ------------------ | ------------------------------------------------- |
| `pnpm dev`         | Start the development server                      |
| `pnpm build`       | Build for production                              |
| `pnpm start`       | Start the production server                       |
| `pnpm lint`        | Run ESLint                                        |
| `pnpm db:generate` | Generate SQL migrations from `src/db/schema.ts`   |
| `pnpm db:migrate`  | Apply the migrations to the database              |

## Project structure

```
src/
├── app/            # Pages and components (App Router)
│   ├── blog/       # Blog overview, detail page, create/edit, comments
│   └── personal/   # The user's own posts
├── db/             # Drizzle schema, queries, and migrations
├── env.ts          # Environment variable validation
└── middleware.ts   # Clerk route protection
```
