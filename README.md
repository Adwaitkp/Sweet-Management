# Sweet Management
Admin login details - 
email - admin@example.com 
password - admin123
Live link - https://sweet-management.onrender.com/
A full‑stack sweets inventory and user management app built with a Node.js/Express backend and a React (Vite) frontend. It supports authentication, CRUD operations for sweets, and a clean, reusable UI.

## Features
- Authentication: Register/Login with JWT protection
- Sweets Management: Create, read, update, delete sweets
 
- Search & Filter: Quickly find sweets via a search bar
- Reusable UI Components: Modal for adding sweets, shared header, and inputs
- TDD-Friendly Backend: API routes covered by Jest supertest suites

## Tech Stack
- Backend: Node.js, Express, Mongoose (MongoDB), JWT
- Frontend: React, Vite, Axios
- Testing: Jest, Supertest

## Project Structure
```
backend/
  src/
    server.js
    config/
      db.js
      seedAdmin.js
    middleware/
      auth.js
    models/
      Sweet.js
      User.js
    routes/
      auth.routes.js
      sweets.routes.js
    tests/
      auth.login.test.js
      auth.test.js
      sweets.test.js
frontend/
  public/
  src/
    api/axios.js
    components/
      AddSweetModal.jsx
      Header.jsx
      SearchBar.jsx
    pages/
      Login.jsx
      Register.jsx
      Sweets.jsx
    App.jsx
    main.jsx
```

## Prerequisites
- Node.js 18+
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- Windows PowerShell or a Unix-like shell

## Backend Setup (API)
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment (create `.env` in `backend`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sweet_management
   JWT_SECRET=your-strong-secret
   ```
3. Seed an admin user (optional, if supported):
   ```bash
   node src/config/seedAdmin.js
   ```
4. Start the server:
   ```bash
   npm run start
   ```
5. API base URL (default): `http://localhost:5000`

## Frontend Setup (Web)
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. App runs at the Vite dev URL shown in the terminal (usually `http://localhost:5173`).

## Environment Variables
- Backend `.env`: `PORT`, `MONGO_URI`, `JWT_SECRET`
- Frontend config uses `src/api/axios.js` to set the API base URL. Adjust it if your backend runs on a different port or host.

## Running Tests (Backend)
- The project uses Jest + Supertest for API TDD.
- To run tests:
  ```bash
  cd backend
  npm test
  ```
- Tests are located under `backend/src/tests/` and include `auth.test.js`, `auth.login.test.js`, and `sweets.test.js`.

## Common API Endpoints
- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Sweets:
  - `GET /api/sweets`
  - `POST /api/sweets`
  - `PUT /api/sweets/:id`
  - `DELETE /api/sweets/:id`



## My AI Usage
- Used guidance to understand and apply TDD.
- Used GitHub Copilot to clean up the UI and build reusable components.
- Used AI to speed up development and manage time effectively, helping build the project faster and within the time limit.
- The AI used: ChatGPT and GitHub Copilot.
<img width="1920" height="1080" alt="Screenshot (766)" src="https://github.com/user-attachments/assets/6045ee85-8fa7-4698-a33a-e9e6a2482310" />
<img width="1920" height="1080" alt="Screenshot (763)" src="https://github.com/user-attachments/assets/6fc02e49-6574-4a9a-ba9a-45a8213a924a" />
<img width="1920" height="1080" alt="Screenshot (764)" src="https://github.com/user-attachments/assets/f5ad421f-1b59-4f29-aa00-e1a77c61cea6" />
<img width="1920" height="1080" alt="Screenshot (768)" src="https://github.com/user-attachments/assets/4b3d16d6-4ac6-4dfc-bcff-096c28f04c15" />
<img width="1920" height="1080" alt="Screenshot (765)" src="https://github.com/user-attachments/assets/4913c41b-7b20-45d4-b43a-845978f70a96" />
<img width="1920" height="1080" alt="Screenshot (769)" src="https://github.com/user-attachments/assets/d3144d38-4252-4f22-bd92-54123fba6e10" />


