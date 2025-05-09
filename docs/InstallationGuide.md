# Star Wars Character Explorer - Installation Guide

This guide will walk you through the process of setting up the Star Wars Character Explorer application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v8 or later) or yarn (v1.22 or later) or pnpm (v8 or later) or bun (v1 or later)
- Git

## Clone the Repository

```bash
git clone https://github.com/your-username/star-wars-character-explorer.git
cd star-wars-character-explorer
```

## Backend Setup

### Navigate to the Backend Directory

```bash
cd theredit_be
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root of the backend directory with the following content:

```
PORT=5501
SWAPI_URL=https://swapi.py4e.com/api
```

### Start the Backend Server

For development:

```bash
npm run start:dev
```

For production:

```bash
npm run build
npm run start:prod
```

The backend server will be running at `http://localhost:5501`. You can access the Swagger API documentation at `http://localhost:5501/swagger`.

## Frontend Setup

### Navigate to the Frontend Directory

```bash
cd ../theredit_fe
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file in the root of the frontend directory with the following content:

```
API_URL=http://localhost:5501/characters
```

### Start the Frontend Development Server

```bash
npm run dev
```

The frontend development server will be running at `http://localhost:3000`.

## Accessing the Application

Open your browser and navigate to `http://localhost:3000` to access the Star Wars Character Explorer application.

## Building for Production

### Backend

```bash
cd theredit_be
npm run build
```

The compiled output will be in the `dist` directory.

### Frontend

```bash
cd theredit_fe
npm run build
```

The compiled output will be in the `.next` directory.

## Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting service. Make sure to set the environment variables as described in the Environment Configuration section.

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, or any other static site hosting service. Make sure to set the environment variables as described in the Environment Configuration section.

## Troubleshooting

### Backend Issues

- **CORS Errors**: Ensure that the frontend URL is correctly set in the CORS configuration in `main.ts`.
- **API Connection Issues**: Check that the SWAPI URL is correctly set in the environment variables.

### Frontend Issues

- **API Connection Issues**: Ensure that the API_URL environment variable is correctly set to point to your backend server.
- **Build Errors**: Make sure all dependencies are installed and that you're using a compatible Node.js version.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [SWAPI Documentation](https://swapi.py4e.com/documentation)