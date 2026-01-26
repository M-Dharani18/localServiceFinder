# AI Coding Agent Instructions

## Project Overview

This repository contains a full-stack application with the following structure:

- **Backend**: A Java Spring Boot application located in the `backend/` folder. It handles authentication, service bookings, and provider management.
- **Frontend**: A React application built with Vite, located in the `frontend/` folder. It provides the user interface for customers and service providers.

### Key Components

#### Backend
- **Controllers**: Handle HTTP requests and route them to the appropriate services. Examples include `AuthController` and `BookingController`.
- **Services**: Contain business logic. Service implementations are in `service/impl/`.
- **Repositories**: Interface with the database using Spring Data JPA.
- **DTOs**: Define data transfer objects for request and response payloads.
- **Configuration**: Security and application-specific configurations are in the `config/` folder.

#### Frontend
- **Pages**: Represent top-level views, such as `LandingPage.jsx` and `CustomerDashboard.jsx`.
- **Components**: Reusable UI elements, such as `ListingCard.jsx`.
- **API**: Centralized API calls using Axios, located in `src/api/`.
- **Context**: Manages global state, such as authentication, in `AuthContext.jsx`.
- **Routes**: Define navigation and access control, including `PrivateRoute.jsx` and `RoleRoute.jsx`.

## Developer Workflows

### Backend
- **Build**: Use Maven to build the project:
  ```bash
  ./mvnw clean install
  ```
- **Run**: Start the Spring Boot application:
  ```bash
  ./mvnw spring-boot:run
  ```
- **Test**: Run unit tests:
  ```bash
  ./mvnw test
  ```

### Frontend
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Run Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Lint**:
  ```bash
  npm run lint
  ```

## Project-Specific Conventions

- **Backend**:
  - Use DTOs for all API request and response payloads.
  - Follow the `service-repository-controller` pattern for business logic.
  - Place configuration files in the `config/` folder.

- **Frontend**:
  - Use `src/api/` for all API calls to ensure consistency.
  - Manage global state using React Context API.
  - Use Tailwind CSS for styling.

## Integration Points

- **Backend-Frontend Communication**:
  - The frontend communicates with the backend via REST APIs. API endpoints are defined in `src/api/`.
  - Authentication uses JWT tokens stored in local storage.

- **External Dependencies**:
  - Backend: Spring Boot, Spring Security, Spring Data JPA.
  - Frontend: React, Vite, Axios, Tailwind CSS.

## Examples

### Backend: Adding a New API Endpoint
1. Create a new DTO in `backend/src/main/java/com/quickserve/backend/dto/`.
2. Add a method in the appropriate service interface and implementation.
3. Create a new endpoint in the relevant controller.

### Frontend: Adding a New Page
1. Create a new file in `src/pages/`.
2. Add a route in `src/routes/`.
3. Use `src/api/` for any backend communication.

---

This guide is a starting point. Update it as the project evolves.