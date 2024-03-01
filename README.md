# Massage Reservation System

The Massage Reservation System is a comprehensive solution designed to facilitate the booking and management of massage services. This system allows users to browse available massage services, make reservations, and manage their bookings with ease. It's built with a focus on simplicity, security, and efficiency, making it an ideal choice for massage parlors looking to digitize their reservation process.

## Tech Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for the server-side logic.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database used to store application data in a flexible, JSON-like format.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- **JWT (JSON Web Tokens)**: Used for secure user authentication.
- **Bcrypt.js**: A library to help hash passwords.
- **Swagger**: Used for API documentation and design.

## Design

The system is designed with a modular approach, separating concerns into different layers for better maintainability and scalability. The main components include:

- **Models**: Define the schema for the database collections and handle data validation.
- **Controllers**: Handle incoming requests and return responses to the client.
- **Routes**: Define the endpoints of the API and map them to the controller functions.
- **Middlewares**: Provide functions to handle authentication, error handling, and other cross-cutting concerns.
- **Configurations**: Store configuration settings and database connection details.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB account and database setup.

### Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/wiraphatys/Massage-Reservation-System.git
   ```
2. Navigate to the project directory:
   ```
   cd Massage-Reservation-System
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and populate it with your MongoDB URI and other environment variables as specified in `config/config.env`.
5. Config setup
    ```
    # default config
    PORT = 3000
    NODE_ENV = development
    # database config
    MONGO_URI = your_mongodb_connection_string
    # JWT config
    JWT_SECRET = your_jwt_secret
    JWT_EXPIRE = 30d
    JWT_COOKIE_EXPIRE = 30
    ```


### Running the Application

1. Start the server in development mode:
   ```
   npm run dev
   ```
2. The server should now be running and accessible at `http://localhost:3000`.

3. Use the provided Swagger documentation to test the API endpoints.

### API Usage

- **Create a Reservation**: Send a POST request to `/api/reservations` with the reservation details.
- **Get All Reservations**: Send a GET request to `/api/reservations`.
- **Update a Reservation**: Send a PUT request to `/api/reservations/:id` with the updated details.
- **Delete a Reservation**: Send a DELETE request to `/api/reservations/:id`.

For more detailed API usage, refer to the Swagger documentation configured in the project.