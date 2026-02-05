# NoteNest (MERN Notes App)

A full-stack MERN notes application featuring CRUD operations, rate-limit handling, bulk actions, sorting, and a polished UI with an integrated full-view + edit workflow.

## Features
- Create, view, edit, and delete notes
- Full note view with a dedicated edit section
- Bulk select and delete notes
- Sort notes by newest or oldest
- Rate-limit UI state handling
- Polished UI with gradient background and consistent forms

## Tech Stack
- Frontend: React, Tailwind CSS, DaisyUI, Lucide Icons
- Backend: Node.js, Express
- Database: MongoDB

## Getting Started

### 1) Install dependencies
```bash
# frontend
cd frontend
npm install

# backend
cd ../backend
npm install
```

### 2) Configure environment variables
Create `.env` files in `backend` (and `frontend` if needed) using the keys below.

**backend/.env**
```
MONGO_URI=
PORT=
```

### 3) Run the app
```bash
# backend
cd backend
npm run dev

# frontend (new terminal)
cd frontend
npm run dev
```

## Scripts
- `npm run dev` — start development server
- `npm run build` — build for production (frontend)

## Project Structure
```
MERN-NotesApp/
  backend/
  frontend/
```

## Future Enhancements
- Search and tag notes
- Archive/restore workflow
- Markdown preview
- Autosave edits

## License
MIT
