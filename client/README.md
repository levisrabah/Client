# Book-A-Meal

## Group Members: Levis Rabah, Elvis Moses, Meshack Orina, Allan Too, Arnold Maina

## Date 29/07/2024

# Introduction

Book-A-Meal aims to facilitate food ordering by customers and assist caterers in managing their meal options and tracking orders. The platform supports multiple caterers, offering functionalities for meal management, menu setup, and order tracking.

## Problem Statement

Chefs face challenges in managing their meal options, setting up daily menus, and tracking orders. Customers need an efficient way to view daily menus and place orders.

## Solution

This project develops a web-based meal management system that addresses these challenges by providing an intuitive platform for both caterers and customers. The system includes functionalities for meal management, menu setup, order tracking, and customer notifications.


## User Stories

# Admin (Caterer)

1. Meal Management:
    Create: Add, modify, and delete meal options (e.g., Beef with rice, Beef with fries).
    Read: View list of meal options.
    Update: Edit meal details.
    Delete: Remove meal options.

2. Menu Setup:
    Create: Set up a menu for a specific day.
    Read: View the daily menu.
    Update: Modify the daily menu.
    Delete: Remove items from the daily menu.

3. Order Tracking:
    Create: Record orders made by users.
    Read: View order history and revenue details.
    Update: Update order statuses.
    Delete: Remove orders from the system.

4. Revenue Tracking:
    Read: View the amount of money made by the end of the day.
    Read: View order history.

## User (Customer)

1. Account Management:
   Create: Create an account and log in.

2. Menu Interaction:
    Read: View the menu for a specific day.
    Create: Select a meal option from the menu. 
    Update: Change meal choice.
    Read: View order history.

3. Notifications:
    Read: Receive notifications when the menu for the day is set.


## Getting Started



### Prerequisites

- Python 3.x
- Pip (Python package installer)
- Node.js and Npm (for React frontend)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/levisrabah/Client

## Installation

1. Get a free API Key at:
```
https://github.com/levisrabah/Client```
2.Clone the repo
```
git clone https://github.com/levisrabah/Client
3.And Lastly in the terminal, install relevent files with:
```
 npm install --prefix client
 pipenv install
 pipenv install sqlalchemy alembic
 ```

## Setup

1. After installation, run this command in your terminal in the server directory to get backend running :

```
  pipenv shell
  python app.py
```
2. Then run this command in your terminal  to get frontend running using React:

```
  npm start --prefix client
```

## Technologies used
1. Python    
2. SqlAlchemy
3. React
4. Flask


## Installation Requirements
1. Git
2. React
3. Flask
4. Npm

## Licenses
MIT License

Copyright (c)  BOOK A MEAL (GROUP 6) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.