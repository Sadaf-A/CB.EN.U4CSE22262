# Microservices

## Project Background

### Projects
1. Average Calculator HTTP Microservice
2. Stock Price Aggregation HTTP Microservice

### Design Philosophy
The microservices are designed with a focus on:
- High Performance
- Scalability
- Efficient Resource Utilization
- Robust Error Handling

## System Architecture

| Microservice | Primary Function | Key Technologies | Performance Characteristics |
|--------------|------------------|------------------|------------------------------|
| Number Average Calculator | Process and aggregate numeric sequences | Express.js, Node.js, Axios | Low-latency computation, 500ms timeout |
| Stock Price Aggregation | Real-time stock price analysis and correlation | Express.js, Node.js, Axios | Dynamic data retrieval, correlation processing |

## Detailed Design Considerations

### Average Calculator HTTP Microservice

#### Architectural Approach
The microservice implements a sophisticated sliding window algorithm with the following design principles:

**Window Management Strategy**
- Fixed window size of 10 unique numbers
- Intelligent number filtering mechanism
- Automatic state management

**Computational Workflow**
1. Receive number type request
2. Authenticate and retrieve token
3. Process number sequence
4. Calculate moving average
5. Manage window state

**Number Type Processing**
| Number Type | Processing Logic | Unique Characteristics |
|-------------|-----------------|------------------------|
| Prime (p) | Filter prime numbers | Mathematically rigorous selection |
| Fibonacci (f) | Generate Fibonacci sequence | Sequence-based generation |
| Even (e) | Select even numbers | Parity-based filtering |
| Random (r) | Generate random numbers | Unpredictable sequence generation |

#### Token Management
- Dynamic authentication mechanism
- Secure token retrieval and caching
- Minimized authentication overhead

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

### Stock Price Aggregation Microservice

#### Correlation Analysis Approach

**Correlation Calculation Methodology**
- Pearson Correlation Coefficient implementation
- Advanced statistical computation
- Handling data disparity between stocks

**Calculation Formula**
```
Correlation (ρ) = Cov(X,Y) / (σX * σY)

Where:
- Cov(X,Y): Covariance between stock prices
- σX, σY: Standard deviations of stock prices
```

**Data Retrieval Optimization**
- Parallel API calls
- Efficient data normalization
- Minimized computational complexity

#### Key Computational Challenges
1. Handling varying data availability
2. Time series alignment
3. Performance optimization
4. Cost-effective API usage

## Technical Specifications

### System Requirements
| Parameter | Number Calculator | Stock Price Aggregation |
|-----------|-------------------|-------------------------|
| Port | 9876 | 9876 |
| Request Timeout | 500 milliseconds | Dynamic |
| Authentication | Token-based | Token-based |
| Data Window | 10 unique numbers | Configurable time interval |

## API Endpoints

### Number Average Calculator
**Endpoint:** `GET /numbers/{type}`

**Supported Types:** 
- `p`: Prime Numbers
- `f`: Fibonacci Numbers
- `e`: Even Numbers
- `r`: Random Numbers

**Response Structure**
```json
{
  "windowPrevState": [],
  "windowCurrState": [1, 3, 5, 7],
  "numbers": [1, 3, 5, 7],
  "avg": 4.00
}
```

### Stock Price Aggregation HTTP Microservice
#### 1. Average Stock Price
**Endpoint:** `GET /stocks/:ticker`

**Query Parameters:**
- `minutes`: Time window
- `aggregation`: Calculation type

#### 2. Stock Price Correlation
**Endpoint:** `GET /stockcorrelation`

**Query Parameters:**
- `minutes`: Correlation time window
- `ticker`: Stock symbols to compare

## Output Screenshots

### Average Stock Price
<img width="1512" alt="Screenshot 1 (4)" src="https://github.com/user-attachments/assets/a3f58244-2b4b-4c6c-96c4-da711421f975" />

### Correlation 
<img width="1512" alt="Screenshot 1 (5)" src="https://github.com/user-attachments/assets/11c78191-e65a-4a9c-bb63-ebd4f323f91a" />
<img width="1512" alt="Screenshot 2 (3)" src="https://github.com/user-attachments/assets/150cf5fd-26e9-4f0b-b289-af17abe1a7fc" />


## Error Handling Strategy

### Comprehensive Error Management
- Graceful degradation
- Informative error responses
- Preservation of system state
- Minimal performance impact

### Error Response Categories
| Error Type | HTTP Status | Handling Mechanism |
|------------|-------------|---------------------|
| Authentication Failure | 401 | Token refresh |
| Invalid Request | 400 | Detailed error message |
| Server Error | 500 | Logging and fallback |

## Performance Optimization Techniques

### Computational Efficiency
- Memoization of token generation
- Parallel data retrieval
- Minimized API call overhead
- Intelligent caching mechanisms

### Resource Management
- Low memory footprint
- Non-blocking I/O operations
- Efficient data structures
- Minimal computational complexity

## Deployment Considerations

### Scalability Patterns
- Stateless service design
- Containerization ready
- Horizontal scaling support
- Cloud-native architecture

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js | JavaScript execution |
| Web Framework | Express.js | API routing |
| HTTP Client | Axios | External API communication |
| Authentication | JWT | Secure token management |


### Production Deployment
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline integration

## Future Enhancements
- Advanced caching mechanisms
- Machine learning integration
- Real-time analytics
- Enhanced error prediction

<img width="1018" alt="Screenshot 2025-05-12 at 7 34 25 PM" src="https://github.com/user-attachments/assets/452d12f6-8129-4808-8dd1-a182a1db96c9" />



