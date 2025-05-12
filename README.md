# Average Calculator Microservice

## Project Overview

### Microservice Description
The Average Calculator is a robust Express.js microservice designed to fetch, process, and calculate averages of unique numbers from various number sequences.

### Supported Number Types
- `p`: Prime Numbers
- `f`: Fibonacci Numbers
- `e`: Even Numbers
- `r`: Random Numbers

### Technical Specifications
| Parameter | Configuration |
|-----------|----------------|
| Port | 9876 |
| Request Timeout | 500 milliseconds |
| Window Size | 10 numbers |

## Endpoint Details
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
