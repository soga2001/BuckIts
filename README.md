# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# Supabase #
### Getting Started ###

- Create a supabase account via [signup page](https://supabase.com/dashboard/sign-up)
- Create a new project
- Create a `.env` file in the root directory of the project
- Add the following environment variables to the `.env` file
  ```
  SUPABASE_KEY=<api_key>
  SUPABASE_URL=<project_url>
  ```
- Go to `SQL Editor` on the left vertical navbar
- Create tables and triggers
  - Paste `user_profile.sql` from `/database` directory into the editor and run
  - Paste `follow_table.sql` from `/database` directory into the editor and run


### Generate Supabase Database types ###

Instal supabase cli
```
# brew 
brew install supabase/tap/supabase

# npm
npm install supabase --save-dev
```

Sign in to supabase
```
supabase login
```

Generate supabase database types for a project
```
supabase gen types typescript --project-id <project_id> > types/database.types.ts
```
`project_id` is located in the project settings of a given project


----