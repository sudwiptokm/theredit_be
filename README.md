# Star Wars Character Explorer API

A NestJS backend service for exploring Star Wars characters, providing detailed information about characters from the Star Wars universe.

## Description

This API serves as the backend for the Star Wars Character Explorer application, fetching and enriching data from the Star Wars API (SWAPI). It provides endpoints for listing characters, searching by name, and retrieving detailed character information including their homeworld, species, films, vehicles, and starships.

## Features

- List all Star Wars characters with pagination
- Search characters by name
- Get detailed information about a specific character
- Caching system to improve performance and reduce load on the SWAPI
- Swagger API documentation

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v8 or later) or yarn (v1.22 or later) or pnpm (v8 or later) or bun (v1 or later)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sudwiptokm/theredit_be
cd theredit_be/
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=5501
SWAPI_URL=https://swapi.py4e.com/api
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:5501`.

## API Documentation

Swagger documentation is available at `http://localhost:5501/swagger` when the application is running.

### Endpoints

- `GET /characters` - Get a list of characters with optional search and pagination
- `GET /characters/search?name={name}` - Search characters by name
- `GET /characters/:id` - Get detailed information about a specific character

## Testing

### Running Unit Tests
```bash
npm run test
```

### Running E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Project Structure

- `src/app.module.ts` - Main application module
- `src/main.ts` - Application entry point
- `src/characters/` - Characters module containing controllers, services, and DTOs
  - `characters.controller.ts` - API endpoints for character operations
  - `characters.service.ts` - Business logic for character operations
  - `dto/` - Data Transfer Objects for request validation
  - `interfaces/` - TypeScript interfaces for data models

## Performance Considerations

- The application implements caching to reduce load on the SWAPI and improve response times
- Resources are fetched in parallel to optimize performance
- Responses are enriched with related data to reduce the number of API calls from the frontend

## Security Considerations

- CORS is configured to only accept requests from the frontend domain
- Input validation is implemented using class-validator
- Error handling is properly implemented to prevent information leakage

## License

This project is licensed under the MIT License.

## Acknowledgements

- [NestJS](https://nestjs.com/) - The framework used
- [SWAPI](https://swapi.py4e.com/) - The Star Wars API
