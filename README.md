# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9ac56d22-9105-475b-a712-3569e3f9d87a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9ac56d22-9105-475b-a712-3569e3f9d87a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9ac56d22-9105-475b-a712-3569e3f9d87a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


## Local Development
1. Install Node.js 18+ and pnpm/npm.
2. Install deps: `npm install`
3. Run locally: `npm run dev` then open http://localhost:8080/

## Deploying to GitHub Pages
This repo is configured for GitHub Pages under the path `/Mahmoud-Yassin-Portfolio/`.

1. In `vite.config.ts`, ensure `REPO_NAME` matches your repository name.
2. Ensure Router uses `basename={import.meta.env.BASE_URL}` (already set in `src/App.tsx`).
3. A `404.html` is included to handle SPA refresh routing on GitHub Pages.
4. Build: `npm run build` (outputs to `dist/`).
5. Deploy `dist/` to the `gh-pages` branch (e.g., via `gh-pages` npm package or Actions).

### One-time gh-pages setup (optional)
- `npm i -D gh-pages`
- Add scripts to package.json:
  ```json
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
  ```
- Run `npm run deploy`.
