# Notes App API Documentation

This document specifies the backend API contract expected by the Notes Frontend React application, including authentication and note management endpoints. It is designed to guide backend implementers and for integration testing. Endpoints are prefixed by:

- **Base URL:** `${REACT_APP_API_URL}` or `http://localhost:5000/api` (default in development)

---

## Authentication Endpoints

### 1. User Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "plainTextPassword"
  }
  ```
- **Response:**
  - `200 OK`:
    ```json
    {
      "user": {
        "id": 1,
        "email": "user@example.com"
      },
      "token": "JWT or session token string"
    }
    ```
  - `400` or `401` (failure):
    ```json
    {
      "error": "Login failed"
    }
    ```
- **Notes:**
  - On success, frontend stores `user` and `token` in `localStorage`.

- **Example (cURL):**
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"password"}'
  ```

---

### 2. User Registration

- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "newuser@example.com",
    "password": "plainTextPassword"
  }
  ```

- **Response:**
  - `201 Created`:
    ```json
    {
      "user": {
        "id": 5,
        "email": "newuser@example.com"
      },
      "token": "JWT or session token string"
    }
    ```
  - `400` or `409` (failure):
    ```json
    {
      "error": "Registration failed"
    }
    ```
- **Notes:**
  - On success, frontend stores `user` and `token`.

- **Example (cURL):**
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"newuser@example.com","password":"pwd12345"}'
  ```

---

### 3. Logout

- **Method:** No API call; the frontend only clears local storage.
- **Effect:** Removes `user` and `token` from localStorage.

---

## Notes Management Endpoints

All notes endpoints require authentication via the header:

```
Authorization: Bearer <token>
```
where `<token>` is the JWT/session token returned on login or registration.

---

### 4. List Notes

- **URL:** `/notes`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`:
    ```json
    [
      {
        "id": 10,
        "title": "First note",
        "content": "Some text",
        "updatedAt": "2024-03-14T21:13:37.433Z"
      },
      ...
    ]
    ```
  - `401 Unauthorized` if token is missing/invalid.

- **Example (cURL):**
  ```bash
  curl http://localhost:5000/api/notes \
    -H "Authorization: Bearer <token>"
  ```

---

### 5. Create Note

- **URL:** `/notes`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "Shopping list",
    "content": "eggs\nmilk\nbread"
  }
  ```
- **Response:**
  - `201 Created`:
    ```json
    {
      "id": 15,
      "title": "Shopping list",
      "content": "eggs\nmilk\nbread",
      "updatedAt": "2024-03-14T22:01:00.002Z"
    }
    ```
  - `400` on validation error, `401` if not authenticated.

- **Example (cURL):**
  ```bash
  curl -X POST http://localhost:5000/api/notes \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"title":"Shopping list","content":"eggs\\nmilk\\nbread"}'
  ```

---

### 6. Update Note

- **URL:** `/notes/:id`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "Updated title",
    "content": "Updated content"
  }
  ```
- **Response:**
  - `200 OK`:
    ```json
    {
      "id": 10,
      "title": "Updated title",
      "content": "Updated content",
      "updatedAt": "2024-03-14T22:21:11.901Z"
    }
    ```
  - `400` on validation error, `401` if not authenticated, `404` if note not found.

- **Example (cURL):**
  ```bash
  curl -X PUT http://localhost:5000/api/notes/10 \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated title","content":"Updated content"}'
  ```

---

### 7. Delete Note

- **URL:** `/notes/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` or `204 No Content` (empty).
  - `401` if not authenticated, `404` if note not found.

- **Example (cURL):**
  ```bash
  curl -X DELETE http://localhost:5000/api/notes/15 \
    -H "Authorization: Bearer <token>"
  ```

---

## Status Codes and Error Handling

- Standard HTTP status codes are used.
- On error, response will include a JSON error message:
  ```json
  { "error": "Description of the failure" }
  ```

---

## Environment Variables

- The frontend expects the backend base URL as `REACT_APP_API_URL` in the environment configuration.

---

_Last updated: Auto-generated by DocumentationAgent_
