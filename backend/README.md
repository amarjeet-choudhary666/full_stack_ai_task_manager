# Backend API

This is the backend API server for the project. It is built with Express and TypeScript, using Clerk for authentication, Drizzle ORM for database interactions, and PostgreSQL as the database.

## Setup

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Create a `.env` file in the `backend` directory with the necessary environment variables (e.g., database connection, Clerk keys, PORT).

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. To build the project:

```bash
yarn build
# or
npm run build
```

5. To start the built project:

```bash
yarn start
# or
npm start
```

## Scripts

- `build`: Compile TypeScript files to JavaScript.
- `start`: Run the compiled JavaScript from the `dist` directory.
- `dev`: Run the server in development mode with automatic restarts using nodemon.
- `migrate`: Run database migrations using Drizzle ORM.
- `generate`: Generate database types using Drizzle ORM.

## API Routes

- `/v1/users`: User-related endpoints.
- `/v1/tasks`: Task-related endpoints.

## Technologies Used

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript.
- [Clerk](https://clerk.com/) - Authentication and user management.
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe ORM for database access.
- [PostgreSQL](https://www.postgresql.org/) - Relational database.
