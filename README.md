# Tasks CRUD App

A React task manager with full create, read, update, and delete flows. Data is served by an in-memory mock API so you can run the app without a backend.

## Features

- **Create** tasks with validated titles (1–100 characters)
- **Read** a task list with loading and error states
- **Update** tasks inline (edit title, toggle complete/incomplete)
- **Delete** tasks with a confirmation prompt
- **Search** tasks by title
- **Toast notifications** for success and error feedback

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 19, CSS |
| Build | Vite 8 |
| Forms | react-hook-form |
| Validation | Zod |
| State | React Context + hooks |
| Data | In-memory mock service (axios-ready) |
| Utilities | date-fns, clsx, uuid, react-toastify |

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

## Getting Started

All commands below should be run from the `crud-app` directory:

```bash
cd crud-app
```

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Vite prints the local URL when the server is ready (default: [http://localhost:5173](http://localhost:5173)). Open that URL in your browser.

### 3. Build for production

```bash
npm run build
```

Output is written to `dist/`.

### 4. Preview the production build

```bash
npm run preview
```

### 5. Lint the codebase

```bash
npm run lint
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | Run ESLint on the project |

## Project Structure

```
crud-app/
├── public/              # Static assets (favicon, icons)
├── src/
│   ├── components/      # TaskForm, TaskList, TaskItem, SearchBar
│   ├── constants/       # Shared constants (e.g. title length limits)
│   ├── context/         # TaskContext provider
│   ├── data/            # Seed mock tasks
│   ├── hooks/           # useTasks hook
│   ├── pages/           # TasksPage
│   ├── services/        # taskService (mock CRUD API)
│   ├── utils/           # Validation and filtering helpers
│   ├── App.jsx          # Root layout and toast container
│   └── main.jsx         # App entry point
├── index.html
├── package.json
└── vite.config.js
```

## How Data Works

`src/services/taskService.js` simulates a REST API with a short delay (~600 ms). Tasks are stored in memory for the current browser session.

To connect a real backend later, replace the mock implementations in `taskService.js` with axios calls. The rest of the app (context, hooks, components) can stay the same.

## Usage Tips

- **Add a task:** Type a title in the form and click **Add task** (or press Enter).
- **Complete a task:** Use the checkbox next to the title.
- **Edit a task:** Click **Edit**, change the title, then **Save** (Enter) or **Cancel** (Escape).
- **Delete a task:** Click **Delete** and confirm in the dialog.
- **Search:** Use the search bar to filter tasks by title.

## Troubleshooting

**Blank page or invalid hook call errors**

Run the app from inside `crud-app`, not the parent `0g-test` folder. The Vite config deduplicates React to avoid duplicate copies when a parent `node_modules` exists.

**Port already in use**

Vite picks the next free port automatically (e.g. `5174`). Check the terminal output for the actual URL.

**Changes disappear on refresh**

Mock data lives in memory only. Refreshing the page reloads the seed data from `src/data/mockTasks.js`.
