# Blaze

Welcome to Blaze, your go-to solution for seamless meal bookings and efficient restaurant management. Blaze offers a user-friendly platform that allows customers to effortlessly book meals, manage their baskets, and check out, while providing administrators with powerful tools to manage the menu, create special offers, and track daily earnings. Whether you’re a diner or an admin, Blaze ensures a smooth and enjoyable experience from start to finish.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Running the Project](#running-the-project)
6. [Authors](#authors)
7. [License](#license)

## Features

### MVP Features

### User Authentication

#### Sign Up


- **Form Validation**: The sign-up form ensures the correct format for username, email, and password.
- **Account Creation**: Users can create an account with validated details.

#### Log In

- **User Authentication**: Users can log in with their registered credentials.
- **Welcome Dashboard**: Upon successful login, users are welcomed to the dashboard, detailing what the app is about.

### Dashboard
-**Category Selection**:Users can select the category of the meal that they are intrested in.
-**Meal Selection**:Users can select meals from the menu of the category that they choose.
-**Admin Permission**:In this page an admin has the ability to create a meal which will automatically be stored under that category.The admin is required to input a name ,description,price and an image link to be used in the meal presentation.

### Meal information
-**Meal Details**:Users as well as admins can view the information on individual meals including their name,their brief description and the price in dollars.
-**Admin Permissions**:In this page and admin has the ablity to either edit or delete a meal

### Booking Process
-**Booking Meals**:A user can book a meal either throught the meal page or through the offers page.
-**Total Daiy Earnings**:When a user books a meal the price of that meal is saved and added to the total earnings of the admin on that day.
-**Booking Confirmation**:When a user succesfuly books a meal, a pop up is shown that confirms to the user that the meaal specifically has been booked.
### Basket
-**View and Edit**:A user can see the meals they have booked in their basket and can alter the quantity.
-**CHeckout**:Once finished,A user can checkout from the basket.This will require the user to input a name in which the transaction will be recorded under.
 
### Offers
-**View and book**:In this page clients can view offers baased on the dates and can book meals from this page as well
-**Admin Permisions**:The admin here has the ability to select a date and put a meal up as one that is on offer by providing a date and a meal id.The admin must do this for each individual meal for that day.
### Strech features.
-**Transaction History**:A user can view their transaction history as they checkout on the basket page.

## Project Structure

### Client side
```
├──client
|       ├──node_modules/
|       ├──public/
|       ├──src/
|           ├──components/
|               ├──authentication/
|                   ├──AuthContext.js
|                   ├──loginpage.js
|                   ├──PrivateRoute.js
|                   ├──Registerpage.js
|                   ├──loginpage.css
|                   ├──registerpage.css
|               ├──basketpage.js
|               ├──categorypage.js
|               ├──dailyoffer.js
|               ├──errorpage.js
|               ├──mealcard.js
|               ├──mealpage.js
|               ├──menu.js
|               ├──navbar.js
|               ├──transactioncotext.js
|               ├──transaction.js
|               ├──welcomepage.js
|           ├──styles/
|               ├──basket.css
|               ├──categorypage.css
|               ├──dailyoffer.css
|               ├──mealcard.css
|               ├──mealpage.css
|               ├──menu.css
|               ├──navbar.css
|               ├──productpage.css
|               ├──transaction.css
|               ├──welcomepage.css
|           ├──App.css
|           ├──App.js
|           ├──App.test.js
|           ├──index.css
|           ├──index.js
├──node_modules
├──package-lock.json
├──package.json
├──README.md

```
### Server side
```
├──Server
|    ├──_pyache_
|    ├──instance
|        ├──app.db
|    ├──migrations
|    ├──testing
|        ├──app_test.py
|        ├──conftest.py
|        ├──models_test.py
|    ├──app.py
|    ├──config.py
|    ├──debug.py
|    ├──models.py
|    ├──pipfile
|    ├──pipfile.lock
|    ├──seed.py
```
### Key Directories and Files

- `client/`: Contains the React frontend application
  - `src/components/`: React components
  - `src/css/`: CSS stylesheets
  - `src/pics/`: Image assets
- `server/`: Contains the Flask backend application
  - `instance/`: Instance-specific configurations
  - `migrations/`: Database migration files
  - `app.py`: Main application file
  - `models.py`: Database models
  - `seed.py`: Database seeding script
- `CONTRIBUTING.md`: Guidelines for contributing to the project
- `LICENSE.md`: Project license information
- `Pipfile` and `Pipfile.lock`: Python dependency management
- `package.json`: Node.js dependency management

## Technologies Used

### Languages

<p align="center">
  <img src="https://media.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif" alt="JavaScript" width="70" height="70"/>
  <img src="https://media.giphy.com/media/LMt9638dO8dftAjtco/giphy.gif" alt="Python" width="70" height="70"/>
  <img src="https://media.giphy.com/media/XAxylRMCdpbEWUAvr8/giphy.gif" alt="HTML5" width="70" height="70"/>
  <img src="https://media.giphy.com/media/fsEaZldNC8A1PJ3mwp/giphy.gif" alt="CSS3" width="70" height="70"/>
</p>

### Frameworks

<p align="center">
  <img src="https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif" alt="React" width="70" height="70"/>
  <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="Flask" width="70" height="70"/>
</p>

### Database

<p align="center">
  <img src="https://media.giphy.com/media/W71QxkQgCDM1WJYdFz/giphy.gif" alt="MySQL" width="70" height="70"/>
</p>

### Tools

<p align="center">
  <img src="https://media.giphy.com/media/kH1DBkPNyZPOk0BxrM/giphy.gif" alt="Git" width="100" height="70"/>
  <img src="https://media.giphy.com/media/IdyAQJVN2kVPNUrojM/giphy.gif" alt="VS Code" width="70" height="70"/>
</p>
- Frontend:  React
- Backend: Flask
- Database: MySQL
- Other: Git, npm


#### CSS3
- Application: Custom CSS stylesheets are applied to components like Navbar, Categories, Meals, ensuring consistent branding and responsive design across different screen sizes.
- Documentation: [CSS Documentation](https://devdocs.io/css/)

#### React
- Application: Components such as Navbar, Welcome Page, Categories, Meal, Basket, etc., leverage React's lifecycle methods, hooks, and context API for dynamic data handling and UI updates.
- Documentation: [React Documentation](https://react.dev/)

#### Flask
- Application: Backend routes (/categories, /signup, /meals, /transactions, etc.) are implemented using Flask, with Flask-SQLAlchemy for managing MySQL database models (Meal,Category, Transaction, etc.).
- Documentation: [Flask Documentation](https://flask.palletsprojects.com/en/3.0.x/)

#### MySQL
- Application: Flask-SQLAlchemy ORM is used to define database models (Meal, Category, Transaction, etc.), establish relationships between entities, and perform CRUD operations.
- Documentation: [MySQL Documentation](https://dev.mysql.com/doc/)

#### Git
- Application: GitHub repository (/levisrabah/Client) is used for hosting the project, managing commits, branches, and merging pull requests from all the authors on the client side and (/levisrabbah/Server) for the server side.
- Documentation: [Git Documentation](https://git-scm.com/doc)

#### npm
- Application: npm is used to install and manage React dependencies (react, react-dom, etc.) and build tools (webpack, babel, etc.) required for frontend development.
- Documentation: [npm Documentation](https://docs.npmjs.com/)

## Setup Instructions

##### Step 1.Clone the Repository

    -git clone https://github.com/levisrabbah/Client.git for the client side.
    -git clone https://github.com/levisrabbah/Server.git for the backend/server side.

#### Step 2.Install Dependencies

        -Install required dependencies by running Pipenv install

#### Step 3.Activate Virtual Environment
        -Activate virtual environment by running 
        
            pipenv shell
    
#### Step 4.Set up the database
    - Initialize the database, apply migrations, and upgrade the database schema by running the following commands:

    python3 manage.py db init
    python3 manage.py db migrate
    python3 manage.py db upgrade

#### Step 5: Seed the Database

 Seed the database with initial data by executing:

    python3 seed.py


#### Step 6: Run the Flask Server
        -Start the Flask development server to begin serving the application:

            flask run

## Frontend Setup

To set up the frontend part of the FreightX project, proceed with the following instructions:

#### Step 1: Navigate to the Client Directory

Change your current working directory to the client folder located at the root of the project:

    cd ../client

#### Step 2: Install Dependencies

Install the necessary Node.js packages for the frontend development:

    npm install

#### Step 3: Start the React Development Server

Launch the React development server to view the application in your web browser:

    npm start

After completing these steps:

- The backend server should be running on [http://localhost:5555](http://localhost:5555)
- The frontend should be accessible at [http://localhost:3000](http://localhost:3000)

## Authors

- [Levis Rabbah](https://github.com/levisrabbah)
- [All3n0](https://github.com/All3n0)
- [Elvis Moses](https://github.com/7Unfazed)
- [Meshack Orina](https://github.com/meshackmesto)
- [Arnold Maina](https://github.com/atarnold)

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
