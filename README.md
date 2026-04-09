# Spring Boot + React Starter Structure

This repository contains a basic full-stack structure:

- `backend/`: Spring Boot REST API with controller/service/repository layers.
- `frontend/`: React app that calls the backend on localhost.

## Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080` and exposes:

- `GET /api/greetings`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and fetches backend data from:

- `http://localhost:8080/api/greetings`
