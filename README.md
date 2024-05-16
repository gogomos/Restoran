# Resto Project

Resto Project is a web application that manages restaurant information, meal menus, employee details, and newsletter subscriptions. This project uses Node.js, Express, Prisma, EJS, and Nodemailer.

## Features

- **Restaurant Management**: Add, update, delete, and view restaurants.
- **Meal Management**: Add, update, delete, and view meals.
- **Employee Management**: Add, update, delete, and view employees.
- **Category Management**: Add, update, delete, and view meal categories.
- **Newsletter Subscription**: Subscribe to the newsletter and receive email notifications.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web application framework for Node.js.
- **Prisma**: Database ORM for interacting with the database.
- **EJS**: Embedded JavaScript templates for server-side rendering.
- **Nodemailer**: Module for sending emails.
- **CSRF Protection**: Middleware for protecting against Cross-Site Request Forgery attacks.
- **Joi**: Data validation library for JavaScript.

## Prerequisites

- Node.js (v12.x or higher)
- npm (v6.x or higher)
- A MySQL database

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/gogomos/Restoran.git
    cd resto_project
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory with the following variables:

    ```env
    DATABASE_URL="mysql://user:password@localhost:5432/resto_project"
    GMAIL_USER="your_gmail_username@gmail.com"
    GMAIL_PASS="your_gmail_password"
    PORT=3000
    ```

4. Migrate the database schema using Prisma:

    ```sh
    npx prisma migrate dev --name init
    ```

5. Seed the database (optional):

    If you have a seed script, run it to populate the database with initial data:

    ```sh
    npx prisma db seed
    ```

## Running the Application

1. Start the server:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **Restaurants**
  - `GET /api/restaurants` - Get all restaurants
  - `GET /api/restaurants/:id` - Get a single restaurant by ID
  - `POST /api/restaurants` - Create a new restaurant
  - `PUT /api/restaurants/:id` - Update a restaurant by ID
  - `DELETE /api/restaurants/:id` - Delete a restaurant by ID

- **Meals**
  - `GET /api/repas` - Get all meals
  - `GET /api/repas/:id` - Get a single meal by ID
  - `POST /api/repas` - Create a new meal
  - `PUT /api/repas/:id` - Update a meal by ID
  - `DELETE /api/repas/:id` - Delete a meal by ID
  - `POST /api/repas/upload/:id` - Upload an image for a meal

- **Employees**
  - `GET /api/employes` - Get all employees
  - `GET /api/employes/:id` - Get a single employee by ID
  - `POST /api/employes` - Create a new employee
  - `PUT /api/employes/:id` - Update an employee by ID
  - `DELETE /api/employes/:id` - Delete an employee by ID

- **Meal Categories**
  - `GET /api/categorierepas` - Get all meal categories
  - `GET /api/categorierepas/:id` - Get a single meal category by ID
  - `POST /api/categorierepas` - Create a new meal category
  - `PUT /api/categorierepas/:id` - Update a meal category by ID
  - `DELETE /api/categorierepas/:id` - Delete a meal category by ID

- **Newsletter Subscriptions**
  - `POST /api/abonnenewsletters` - Subscribe to the newsletter

- **Contact Us**
  - `POST /api/sendEmail` - Send a contact email

## Project Structure
├── public/
│ ├── css/
│ ├── js/
│ ├── images/
├── server/
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ ├── views/
│ ├── helpers/
├ └── prisma/
│    |── migrations/
│    |── schema.prisma
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
## Acknowledgements

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [EJS](https://ejs.co/)
- [Nodemailer](https://nodemailer.com/)
