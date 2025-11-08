# Task Manager API

A simple RESTful API for managing tasks using Node.js and Express.js.  
This API supports creating, reading, updating, and deleting tasks with in-memory storage.

---

## Features

- Get all tasks
- Get a task by ID
- Create a new task
- Update an existing task
- Delete a task
- Input validation and proper HTTP status codes

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/airtribe-projects/task-manager-api-amandubey-01.git
cd task-manager-api-amandubey-01
```

2. Install dependencies:

```bash
npm install
```

---

## Running the Server

```bash
node app.js
```

The server will run on:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | /tasks     | Get all tasks           |
| GET    | /tasks/:id | Get a task by ID        |
| POST   | /tasks     | Create a new task       |
| PUT    | /tasks/:id | Update an existing task |
| DELETE | /tasks/:id | Delete a task by ID     |

---

## Request & Response Examples

### Create Task (POST /tasks)

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

**Response (201 Created):**

```json
{
  "id": 3,
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

---

## Input Validation

- `title` is required
- `completed` must be boolean
- `description` is optional (defaults to empty string if not provided)
- Invalid input returns `400 Bad Request`

---

## Running Tests

```bash
npm run test
```

All tests are written using **tap** and cover all API endpoints, including validation.

---

## Results
It passed all the 19 test cases.

## Notes

- Tasks are stored in-memory, so data resets on server restart.
- Uses `nextId` to generate unique IDs for new tasks.

---

## Author

Aman Dubey