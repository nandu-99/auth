## Overview

This project consists of a client and server application for user authentication. The client is a React application for handling user interactions, while the server is an Express application that manages authentication and user data storage with MongoDB.

---

## Client

### Overview

The client application is built with React and uses Axios for API requests. It provides signup, login, and protected routes for authenticated users.

### Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:nandu-99/auth.git
    ```

2. **Navigate to the client directory:**

    ```bash
    cd client
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the `client` directory and add the following:

    ```env
    url=http://localhost:3003
    ```

    This should match the URL where your server is running.

5. **Run the development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

### File Structure

- `src/`
  - `components/`
    - `auth.js` - Contains the `AuthForm` component for user authentication.
    - `protected.js` - Contains the `ProtectedPage` component for authenticated routes.
    - `api.js` - Contains functions for making API requests to the server.
  - `App.js` - Main application file that sets up routing and navigation.
  - `index.css` - Basic styling for the application.
  - `index.js` - Entry point for the React application.

### Components

- **AuthForm**: Handles both signup and login forms.
- **ProtectedPage**: Displays content for authenticated users.
- **Logout**: Allows users to log out and clears the JWT token from localStorage.

---

## Server

### Overview

The server application is built with Express and uses MongoDB for data storage. It handles user authentication, password hashing, and JWT token generation.

### Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:nandu-99/auth.git
    ```

2. **Navigate to the server directory:**

    ```bash
    cd server
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGODB_URL=<your-mongodb-url>
    JWT_SECRET=<your-jwt-secret>
    ```

5. **Start the server:**

    ```bash
    node index.js
    ```

    The server will be available at `http://localhost:3003`.

### File Structure

- `index.js` - Main server file that sets up routes and connects to the database.
- `jwt.js` - Contains functions for generating and verifying JWT tokens.
- `db.js` - Manages MongoDB connection and exports database references.
- `package.json` - Lists project dependencies and scripts.

### Endpoints

- **POST /signup**: Creates a new user with hashed password.
- **POST /login**: Authenticates the user and returns a JWT token.
- **GET /protected**: A protected route that requires a valid JWT token.

---
