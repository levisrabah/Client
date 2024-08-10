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
├──
