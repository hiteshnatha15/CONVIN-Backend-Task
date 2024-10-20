# Daily Expenses Sharing Application

## Overview

This project is a backend service for a daily-expenses sharing application. Users can add expenses and split them based on three different methods: exact amounts, percentages, and equal splits. The application also manages user details, validates inputs, and generates downloadable balance sheets.

## Features

### User Management
- Create a user with email, name, and mobile number.
- Retrieve user details.

### Expense Management
- Add expenses.
- Split expenses using:
    1. **Equal**: Split equally among all participants.
    2. **Exact**: Specify the exact amount each participant owes.
    3. **Percentage**: Specify the percentage each participant owes (ensures percentages add up to 100%).

### Balance Sheet
- Show individual expenses for each user.
- Show overall expenses for all users.
- Provide a feature to download the balance sheet.

## API Endpoints

### User Endpoints
- **POST /api/users**: Create a new user.
- **GET /api/users/:id**: Retrieve user details.

### Expense Endpoints
- **POST /api/expenses**: Add a new expense.
- **GET /api/expenses/user/:userId**: Retrieve expenses for a specific user.
- **GET /api/expenses**: Retrieve all expenses.
- **GET /api/expenses/balance-sheet/:userId**: Download the balance sheet for a user.

## Data Validation
- User inputs are validated.
- Ensures percentages in the percentage split method add up to 100%.

## Authentication Implementation

The application includes an authentication system to secure certain API endpoints. However, the authentication middleware function is implemented but not explicitly called in the routes for ease of checking.

### Middleware
The authentication middleware verifies the JWT token provided in the request headers. If the token is valid, it allows access to the protected routes; otherwise, it responds with an unauthorized error.

### Route Protection
To secure the following endpoints, the authentication middleware should be applied:
- **POST /api/expenses** - Add a new expense
- **GET /api/expenses** - Retrieve all expenses
- **GET /api/expenses/user/:userId** - Retrieve expenses for a specific user
- **GET /api/expenses/balance-sheet/:userId** - Download the balance sheet for a user

**Note:** Ensure that the authentication middleware is properly integrated into these routes for full functionality.

## Installation

1. Clone the repository:
     ```bash
     git clone https://github.com/yourusername/daily-expenses-sharing.git
     cd daily-expenses-sharing
     ```

2. Install dependencies:
     ```bash
     npm install
     ```

3. Create a `.env` file in the root directory and add your environment variables:
     ```makefile
     PORT=5000
     MONGO_URI=your_mongo_db_uri
     JWT_SECRET=your_jwt_secret
     ```

4. Start the server:
     ```bash
     npm start
     ```

