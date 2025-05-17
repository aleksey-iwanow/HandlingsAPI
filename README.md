# API Service for Handling Requests

## Project Structure
src/
├── controllers/
├── services/
│ └── handlings.service.ts
├── routes/
│ └── handlings.routes.ts
├── types/
│ └── handlings.types.ts
├── utils/
├── app.ts
└── server.ts
tests/
├── integration/
└── unit/


## API Endpoints

### Requests Collection

| Method | Endpoint             | Description                | Parameters               | Request Body            |
|--------|----------------------|----------------------------|--------------------------|-------------------------|
| GET    | `/handlings`         | Get all requests           | `date`, `startDate`, `endDate` | - |
| POST   | `/handlings`         | Create new request         | -                        | `{ text, theme }`       |

### Single Request

| Method | Endpoint                  | Description                | Parameters | Request Body            |
|--------|---------------------------|----------------------------|------------|-------------------------|
| GET    | `/handlings/:id`          | Get request by ID          | `id`       | -                       |
| PATCH  | `/handlings/work/:id`     | Set status to "in_progress"| `id`       | -                       |
| PATCH  | `/handlings/complete/:id` | Complete request           | `id`       | `{ solution_text }`     |
| PATCH  | `/handlings/cancel/:id`   | Cancel request             | `id`       | `{ cancel_reason }`     |

### Bulk Operations

| Method | Endpoint           | Description                     | Parameters | Request Body            |
|--------|--------------------|---------------------------------|------------|-------------------------|
| PATCH  | `/handlings/cancel`| Cancel all "in_progress" requests| -          | `{ cancel_reason }`     |

## Status Flow

```mermaid
stateDiagram-v2
    [*] --> new
    new --> in_progress: /work
    in_progress --> completed: /complete
    in_progress --> cancelled: /cancel
    new --> cancelled: /cancel
Example Requests
Create Request
http
POST /handlings HTTP/1.1
Content-Type: application/json

{
  "text": "Login page not working",
  "theme": "Technical issue"
}
Filter Requests
http
GET /handlings?startDate=2023-01-01&endDate=2023-01-31 HTTP/1.1
Response Examples
Success
json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Login page not working",
    "status": "new"
  }
}
Error
json
{
  "success": false,
  "error": "Invalid date format"
}
Development
bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run tests
npm test

# Test coverage
npm run test:coverage