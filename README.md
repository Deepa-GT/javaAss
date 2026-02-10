# Item Management API

A simple RESTful API for managing items built with Spring Boot and Java. This application provides CRUD operations for item management with in-memory data storage.

## Features

- **Item Management**: Create, read, update, and delete items
- **Search Functionality**: Search items by name or category
- **Input Validation**: Comprehensive validation for all item fields
- **In-Memory Storage**: Uses ArrayList for data storage (no database required)
- **RESTful Design**: Follows REST conventions and best practices
- **Error Handling**: Global exception handling with meaningful error messages

## Technology Stack

- **Java 17**
- **Spring Boot 3.1.0**
- **Spring Web** - For REST API
- **Spring Validation** - For input validation
- **Maven** - Dependency management

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Project Structure

```
item-management-api/
├── src/
│   ├── main/
│   │   ├── java/com/example/itemmanagement/
│   │   │   ├── ItemManagementApplication.java
│   │   │   ├── controller/
│   │   │   │   └── ItemController.java
│   │   │   ├── model/
│   │   │   │   └── Item.java
│   │   │   ├── service/
│   │   │   │   └── ItemService.java
│   │   │   └── exception/
│   │   │       └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Setup and Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd item-management-api
   ```

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file directly:
   ```bash
   java -jar target/item-management-api-1.0.0.jar
   ```

4. **Verify the application is running**:
   - Open your browser and navigate to: `http://localhost:8080/api/items`
   - You should see a JSON array with sample items

## API Endpoints

### Base URL
```
http://localhost:8080/api/items
```

### 1. Get All Items
- **Endpoint**: `GET /api/items`
- **Description**: Retrieves all items
- **Response**: JSON array of items
- **Example**:
  ```bash
  curl -X GET http://localhost:8080/api/items
  ```

### 2. Get Item by ID
- **Endpoint**: `GET /api/items/{id}`
- **Description**: Retrieves a specific item by ID
- **Path Parameter**: `id` (Long) - Item ID
- **Response**: Single item object or 404 if not found
- **Example**:
  ```bash
  curl -X GET http://localhost:8080/api/items/1
  ```

### 3. Add New Item
- **Endpoint**: `POST /api/items`
- **Description**: Creates a new item
- **Request Body**: JSON object with item details
- **Validation**: All fields are required and validated
- **Response**: Created item with generated ID
- **Example**:
  ```bash
  curl -X POST http://localhost:8080/api/items \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Smartphone",
      "description": "Latest model with 5G support",
      "price": 699.99,
      "category": "Electronics",
      "stockQuantity": 25
    }'
  ```

### 4. Update Item
- **Endpoint**: `PUT /api/items/{id}`
- **Description**: Updates an existing item
- **Path Parameter**: `id` (Long) - Item ID
- **Request Body**: JSON object with updated item details
- **Response**: Updated item or 404 if not found
- **Example**:
  ```bash
  curl -X PUT http://localhost:8080/api/items/1 \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Updated Laptop",
      "description": "Updated description",
      "price": 899.99,
      "category": "Electronics",
      "stockQuantity": 30
    }'
  ```

### 5. Delete Item
- **Endpoint**: `DELETE /api/items/{id}`
- **Description**: Deletes an item
- **Path Parameter**: `id` (Long) - Item ID
- **Response**: 204 No Content if successful, 404 if not found
- **Example**:
  ```bash
  curl -X DELETE http://localhost:8080/api/items/1
  ```

### 6. Search Items by Category
- **Endpoint**: `GET /api/items/category/{category}`
- **Description**: Retrieves items by category
- **Path Parameter**: `category` (String) - Item category
- **Response**: JSON array of matching items
- **Example**:
  ```bash
  curl -X GET http://localhost:8080/api/items/category/Electronics
  ```

### 7. Search Items by Name
- **Endpoint**: `GET /api/items/search?name={name}`
- **Description**: Searches items by name (case-insensitive partial match)
- **Query Parameter**: `name` (String) - Search term
- **Response**: JSON array of matching items
- **Example**:
  ```bash
  curl -X GET "http://localhost:8080/api/items/search?name=laptop"
  ```

## Item Model

```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop for work and gaming",
  "price": 999.99,
  "category": "Electronics",
  "stockQuantity": 50
}
```

### Field Descriptions

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | Long | No | Auto-generated |
| `name` | String | Yes | Cannot be blank |
| `description` | String | Yes | Cannot be blank |
| `price` | Double | Yes | Must be positive |
| `category` | String | Yes | Cannot be blank |
| `stockQuantity` | Integer | No | Can be null |

## Error Handling

The API provides comprehensive error handling with meaningful error messages:

### Validation Errors (400 Bad Request)
```json
{
  "name": "Name is required",
  "price": "Price must be positive"
}
```

### Not Found Errors (404 Not Found)
- Returned when an item with the specified ID doesn't exist

### Generic Errors (500 Internal Server Error)
```json
{
  "error": "An unexpected error occurred",
  "message": "Detailed error message"
}
```

## Sample Data

The application comes pre-loaded with sample items:

1. **Laptop** - High-performance laptop for work and gaming ($999.99)
2. **Coffee Mug** - Ceramic coffee mug with handle ($12.99)
3. **Wireless Mouse** - Ergonomic wireless mouse with USB receiver ($29.99)

## Testing

Run the tests using Maven:
```bash
mvn test
```

## Development

### Adding New Features
1. Follow the existing package structure
2. Use Spring Boot conventions
3. Add appropriate validation annotations
4. Update this README with new endpoints

### Configuration
Application configuration can be modified in `src/main/resources/application.properties`:
- Server port
- Logging levels
- Jackson serialization settings

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the project repository.