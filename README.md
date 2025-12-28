# Focusfy (Frontend)

This repository contains the frontend for the Focusfy project — a productivity/focus monitoring web app built with React + Vite and Tailwind CSS.

This README helps contributors run the project locally, understand the structure, and deploy changes.

## Quick Links
- App entry: `src/main.jsx`
- Main layout + routing: `src/App.jsx`
- Components: `src/components/`
- UI primitives: `src/components/ui/`

## Architecture
Below is a simple architecture diagram showing how the frontend communicates with backend services (put the file at `docs/architecture.png` so it renders here):

<img width="672" height="268" alt="image" src="https://github.com/user-attachments/assets/148dd822-88e5-429d-9ea8-d2f532ec2be2" />


## Prerequisites
- Node.js 18+ recommended
- npm (or yarn/pnpm)
- A modern browser

## Install (frontend)
From the project root (`Focusfy/myProject`):

```powershell
npm install
```

This will install frontend dependencies (React, Vite, Tailwind, Radix UI primitives, lucide-react, framer-motion, etc.).

If you are running the combined project with a backend, ensure the backend services (API, database) are available and set environment variables accordingly.

## Run (development)

```powershell
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build (production)

```powershell
npm run build
npm run preview
```

## Environment variables
- This frontend expects any API endpoints or keys to be provided via environment variables (if used). Create a `.env` file with values as needed, e.g.:

```
VITE_API_URL=https://api.example.com
```

Restart the dev server after changing env values.

## Routing & Navigation
- The app uses `react-router-dom` for client-side routing. Routes are defined in `src/App.jsx`:
	- `/` → Dashboard
	- `/focus` → Focus Session
	- `/todo` → Todo List
	- `/leaderboard` → Leaderboard
	- `/profile` → Profile

The left sidebar (`src/components/Sidebar.jsx`) contains navigation links to these routes.

## Local data and storage
- The app stores lightweight user data and stats in `localStorage` under keys like `focusUser` and `stats_<userId>` for demo/persistence. Remove or replace this with API calls when connecting a backend.

## Notes for contributors
- I replaced `react-helmet` usage with small `useEffect` calls that set `document.title` and the meta description to avoid a dependency mismatch.
- UI primitives live in `src/components/ui/` and use Radix primitives. Install the Radix packages and other UI dependencies if you add new components.

## Common commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Lint (if configured): `npm run lint`

## Pushing to GitHub
1. Initialize repo (if not already):
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```
2. If your push is rejected because the remote has new commits, fetch and rebase or merge before pushing:
```powershell
git fetch origin
git pull --rebase origin main
git push -u origin main
```

## Developer checklist
- Add your feature branch from `main`.
- Run locally and add unit tests where appropriate.
- Keep UI changes responsive and test on different screen sizes.

## Troubleshooting
- If you see missing package errors, run `npm install` and check `package.json` for required packages.
- For peer dependency conflicts (e.g., React 19 vs library expecting older React), prefer updating/removing the incompatible package or use `--legacy-peer-deps` as a last resort.

## Contact
For questions, open a GitHub issue or contact the project maintainer.

---

Add the architecture image file to `docs/architecture.png` (or update the path above) so the diagram renders in this README.

Happy hacking! 🎯
