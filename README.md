# Project Overview

This project consists of two main parts: the frontend application and the backend API server.

---

## Frontend

The frontend application is built with [Next.js](https://nextjs.org). It provides the user interface and client-side logic for the project.

### Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Backend

The backend API server is built with Express and TypeScript, using Clerk for authentication, Drizzle ORM for database interactions, and PostgreSQL as the database.

### Setup

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Create a `.env` file in the `backend` directory with the necessary environment variables (e.g., database connection, Clerk keys, PORT).

4. Run the development server:

```bash
yarn dev
# or
npm run dev
```

5. To build the project:

```bash
yarn build
# or
npm run build
```

6. To start the built project:

```bash
yarn start
# or
npm start
```

### Scripts

- `build`: Compile TypeScript files to JavaScript.
- `start`: Run the compiled JavaScript from the `dist` directory.
- `dev`: Run the server in development mode with automatic restarts using nodemon.
- `migrate`: Run database migrations using Drizzle ORM.
- `generate`: Generate database types using Drizzle ORM.

### API Routes

- `/v1/users`: User-related endpoints.
- `/v1/tasks`: Task-related endpoints.

---

## Technologies Used

- Frontend: [Next.js](https://nextjs.org)
- Backend: [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Clerk](https://clerk.com/), [Drizzle ORM](https://orm.drizzle.team/), [PostgreSQL](https://www.postgresql.org/)
