# IdeasGPTrue

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the following installed on your local development machine:

- Node.js (version 14.x.x or higher)
- NPM (version 6.x.x or higher)

### Installation

1. Clone the repository:

```
    git clone https://github.com/oguzgezginci/ideasGPT.git
    cd ideasGPT
```

2. Install the dependencies in both backend and frontend directories:

```
   npm install
   cd frontend
   npm install
   cd ..
```

3. Create a `.env` file in the root directory, use the variable in our discord server channel #env-variables.

4. Start the development server:

The server should now be running at `http://localhost:5000`, and the frontend should be accessible at `http://localhost:3000`.

## Scripts

- `npm run server`: Start the backend server in development mode with nodemon.
- `npm run client`: Start the frontend React development server.
- `npm run dev`: Start both backend and frontend development servers concurrently.

## Backend Structure

- `config`: Contains the database connection configuration.
- `models`: Contains the Mongoose schema and models for ideas and users.
- `routes`: Contains the API routes for ideas.

## Frontend Structure

- `components`: Contains reusable components like Header and Footer.
- `screens`: Contains the main screens of the application, such as HomeScreen, LoginScreen, MostLiked, and MyAccount.

## Built With

- MongoDB
- Express
- React
- Node.js
- Mongoose
- React-Bootstrap

## Database Configuration

To set up the database, make sure you have `MONGO_URI=` in your `.env` file. The connection string for the MongoDB Atlas cluster will be required to connect to the database.

To access the database outside of the code, you can use MongoDB Atlas Compass. The connection string URI for Atlas Compass will be provided in our Discord server.
