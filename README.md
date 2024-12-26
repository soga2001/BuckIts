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
- Create tables, triggers, and functions from `/database/` directory. Paste the sql from the following files into the editor and run
  - `user_profile.sql` - Creates user profile on sign up. When user is created, username has to be assigned as well
  - `follow_table.sql` - Creates follow tables, functions, triggers.
    - Function to increase follower/following count
    - Function to decrease follower/following count
    - Triggers that are triggered when row gets inserted/deleted from the follow table and increases/decreases follower/following count
  - `get_user_profile.sql` - Creates a function that returns 
    - user info - id, username, full_name, etc
    - is_following - Indicates whether the current user follows this user
    - is_follower - Indicates whether this user follows the current user
    - is_owner - Indicates whether the current user is the same as this user
  - `sessions.sql` - Grants permissions, creates rls policies, and create functions
    - Grants authenticated user permission to select and delete sessions
    - Creates rls policy to select sessions when user is authenticated and session.user_id and user id is the same
    - Creates rls policy to delete sessions when user is authenticated and session.user_id and user id is the same and passed session id is the same as session.id
    - Creates a function to delete a single session when user is authenticated and session.user_id and user id is the same and passed session id is the same as session.id
    - Creates a function to get all the user's session when user is authenticated and session.user_id and user id is the same


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