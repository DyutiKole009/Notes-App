# Notes App – Full Stack MERN Application

A full-stack Notes Management application built using **React (Vite)** on the frontend and **Node.js, Express, and MongoDB** on the backend.  
The application implements **JWT-based authentication**, supports complete **CRUD operations**, and is deployed using modern cloud platforms.

---

## Live Deployment

- **Frontend**: https://notes-p34exgews-dyutikole009s-projects.vercel.app  
- **Backend API**: Deployed as a separate service (URL not exposed)

---

## Overview

This project demonstrates the design and deployment of a secure, scalable, and production-ready MERN application.  
It focuses on clean architecture, environment-based configuration, and real-world deployment practices.

---

## Features

- User registration and authentication using JWT
- Secure access to protected routes
- Create, read, update, and delete notes
- Pin and search notes
- Persistent authentication using local storage
- Responsive and user-friendly interface
- Fully deployed frontend and backend

### Advanced Features
- **Voice Notes**: Create notes using voice input for faster and hands-free note creation
- **OCR (Optical Character Recognition)**: Extract and save text from uploaded images
- **Insights Dashboard**: Visual insights and analytics based on user notes and activity
- **Recent Activity**: Quick access to recently created or modified notes

---

## Technology Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- CORS
- dotenv

### Deployment & Infrastructure
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Backend API

The application uses a dedicated backend REST API responsible for authentication, authorization, and note management.  
The frontend communicates with the backend using Axios and JWT-based authentication.

### Backend Responsibilities
- User authentication and authorization
- Token generation and validation using JWT
- CRUD operations for notes
- Data persistence using MongoDB
- Request validation and error handling

> Backend endpoints are configured via environment variables and are not hardcoded.

---

## Deployment Notes

- The backend is deployed as an independent Node.js service.
- The frontend is deployed as a static React application.
- Client-side routing issues on page refresh were resolved using Vercel rewrite rules.
- Environment variables are managed securely through hosting platform dashboards.

---

## Key Learnings

- End-to-end MERN application development
- JWT-based authentication and protected routes
- Secure environment-based configuration
- Resolving SPA routing issues in production
- Cloud deployment using modern platforms

---

## Author

**Dyuti Kole**  
Student, IIEST Shibpur

## License

This project is licensed under the MIT License.
