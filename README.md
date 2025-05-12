# Average Calculator Microservice

## Project Overview

### Microservice Description
The Average Calculator is a robust Express.js microservice designed to fetch, process, and calculate averages of unique numbers from various number sequences.

## Technical Specifications
| Parameter | Configuration |
|-----------|----------------|
| Port | 9876 |
| Request Timeout | 500 milliseconds |
| Window Size | 10 numbers |

## Supported Number Types
- `p`: Prime Numbers
- `f`: Fibonacci Numbers
- `e`: Even Numbers
- `r`: Random Numbers

## Endpoint
**Endpoint:** `GET /numbers/{type}`

### Response Structure
```json
{
  "windowPrevState": [],
  "windowCurrState": [1, 3, 5, 7],
  "numbers": [1, 3, 5, 7],
  "avg": 4.00
}
```

## Output Screenshots

### Prime Numbers Request (`/numbers/p`)
<img width="1512" alt="Screenshot 2 (2)" src="https://github.com/user-attachments/assets/8dde0cf1-bdf2-4083-ac56-fe8c89fae5ca" />
<img width="1512" alt="Screenshot 1 (2)" src="https://github.com/user-attachments/assets/4fa606d6-6af9-4ade-8cd4-12a5e15c9e8c" />



### Fibonacci Numbers Request (`/numbers/f`)
<img width="1512" alt="Screenshot 1 (1)" src="https://github.com/user-attachments/assets/13040996-0558-483d-8161-ab1ea297d228" />
<img width="1512" alt="Screenshot 2 (1)" src="https://github.com/user-attachments/assets/e74257df-02a4-475d-8dd1-a40b038e56d8" />

### Even Numbers Request (`/numbers/e`)

<img width="1512" alt="Screenshot 2" src="https://github.com/user-attachments/assets/3aaaa216-20a1-47ca-9a32-c26e86119119" />
<img width="1512" alt="Screenshot 1" src="https://github.com/user-attachments/assets/45e1f3e8-7589-484e-a2d8-ba1ac79328ec" />

### Random Numbers Request (`/numbers/r`)
<img width="1512" alt="Screenshot 1 (3)" src="https://github.com/user-attachments/assets/b585aead-0fa3-40db-9ad9-998838935d89" />


## Key Features
- Sliding Window Management
  * Fixed window size of 10 unique numbers
  * Automatic number storage and replacement
  * Unique number filtering

- Authentication Mechanism
  * Token-based authentication
  * Dynamic token caching and refreshing

## Error Handling
- 400 Error for invalid number types
- Automatic rejection of requests exceeding 500ms
- Preservation of previous window state during failures

## Technology Stack
- Express.js
- Node.js
- Axios

## Dependencies
- express
- axios

## Architecture Highlights
- Immutable Sliding Window Implementation
- Secure Token Management
- High-Performance Number Processing
- Intelligent Number Filtering

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the microservice: `node app.js`
4. Access via `http://localhost:9876/numbers/{type}`

## API Usage
Use Postman or cURL to make requests:
```bash
curl http://localhost:9876/numbers/p
curl http://localhost:9876/numbers/f
curl http://localhost:9876/numbers/e
curl http://localhost:9876/numbers/r
```
