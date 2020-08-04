# Walk4Health
<img src="https://user-images.githubusercontent.com/54332765/89233708-fe868800-d59e-11ea-8770-dda697e9f7b7.png" width=300 height=475 align="right">
Walk4Health is a user-style mobile app, to help people find walking partners in their community/neighborhood

# Motivation
Covid-19 have exposed us to social isolation and physical decline. The goal of this project is to help people get outside and walk for their own health and social interaction.


# Features
Compared to the existing competitors, the uniqueness of walk4health is that it provides a 2 sided marketplace for our users. Clients can choose to be a provider giving others a walk or be a consumer looking for someone to go on a walk.

- Sign up/ Log in (completed)
- Search/Filter (in progress)
- Reviews/History (not started)

# Tech/framework used

Built with 
 - ES6
 - Node.js
 - React Native
 - PostgreSQL
 - Sequelize 

# Code Style
https://google.github.io/styleguide/jsguide.html

# Installation
After clone the master branch, follow steps below.
 - Database(Postgres)  
  `$ brew install postgres`  
  `$ initdb /usr/local/var/postgres`  
  `$ createuser postgres -s`  
  `$ psql -U postgres`  
    `$ \l`                     to list all roles  
    `$ \c postgres`            to connect database "postgress" as user "postgres"  
    `$ \dt`                    to see relations in the databade "postgres"  
    
    Then, copy codes in the walk4health.sql to create the walk4health database and 2 tables  
  
   `$ pg_ctl -D /usr/local/var/postgres -l logfile start`  
   can start the database if the database is stopped  
  
  
    
 - Backend(Node)  
  `$ brew install node`  
  `$ npm install nodemon -g --save`  
  `$ npm install express`  

   To start running backend, into the server file  
   `$ nodemon index`  
  
  
- Frontend(React Native & expo)  
  `$ npm install -g expo-cli`  
  into the mobileClient file:  
  `$ npm install expo`  
         
  - Befor start running:
    Go to mobileClient/node_modules/react-native-star-view/index.js  
    Modified line 2: `module.exports = StarView` 
    To: `export default StarView;`  
     
     
  - To start running:  
    `$ npm start`  

- iOS simulator  
  - Please go to APP Store to download Xcode  

  - If there are some error running on iOS simulator, try  
    1. Go to expo's own node_modules, remove the react-native-safe-area-context from there
    2. Remove react-native-safe-area-context from package.json for expo's folder in node_modules
    3. Run again using npm start


# API Reference
The Walk4Health API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
## Users
This is an object representing a Walk4Health account. You can retrieve it to see user personal information.
### Attributes
  - id (Serial primary key): Unique identifier for the object
  - email (String): the account's email
  - password (String): the account's hashedpassword
  - gender (String): the user's gender
  - age (Integer): the user's age
  - name (String): the user's name
 
### Endpoints
  - create an account
    - Post /signup
  - Log in an account
    - Post /login
  - log out an account
    - Post /users/logout
  - change password
    - Put /users/changepassword/:id
  - get user info
    - Get /users/myprofile
  - get one user
    -Get /users/:id
  - update user name, age and gender at the same time
    - Put /users/:id
  - update one specific field of user
    - Put /users/specificupdate/:id
  
    

  ## Posts
### Attributes
  - id (Serial primary key): Unique identifier for the object
  - time (time): the planned start time of the walking
  - zipcode (Integer): the user's age
  - price (Integer): the price of walking with(per 30 minutes)
  - distance(Number): the walking distance
  - done (Boolean): the state of the order, true represents completed, false indicates in progress
  - creator_id (Integer): the order creator's id
  - receiver_id (Integer): the id of the user accpeting the order 
  - creator_name (String): order's creator name
  - receiver_name (String): the name of the user accpeting the order 
 
 ### Endpoints
  - create a post
    - Post /posts/
  - retrive all posts created by others and states are incomplete
    - GET /posts/
  - retrieve all completed posts the user created
    - Post /posts/mycompletedposts
  - retrieve all in-progress posts the user created
    - Post /posts/mycompletedposts
  - retrieve all rated orders
    - Post /posts/ratings

  ## Search
    This is a feature that users can search orders by zipcode from the closest to the most distant

    Endpoints
    - search zipcode and sort orders by zipcode distance
      - GET /search/byzipcode


  ## Filter
  
      Endpoints
    - filter orders by conditionally combination of age range, distance range, price range, gender, and start time
      - Post /filter/
    - filter by gender and age
      - Get /filter/gender

# Screens
## Explore Screen 
### List of Acceptable Orders
  - Show time, zipcode, price, creator name of orders
  - Click to get more details of an order
### Filter and Search Order
  - Search orders by a zipcode user input and sort orders by distances to the zipcode
  - Fiter orders by some conditions including start time, price, distance, age and gender
### <img src="https://user-images.githubusercontent.com/54332765/89234812-ac933180-d5a1-11ea-97e4-c104643464ef.png" alt="explore" width=300 height=475><img src="https://user-images.githubusercontent.com/54332765/89235723-9ab28e00-d5a3-11ea-965b-6fb7e63193be.png" alt="filter" width=300 height=475 > 

## New Post Screen
  - Create a new post by inputting start time, distance, zipcode, and price
### <img src="https://user-images.githubusercontent.com/54332765/89235948-21676b00-d5a4-11ea-8999-239712482206.png" alt="neworder" width=300 height=475 align="center">  

## Orders Screen
  - Check and edit orders created or partnered by user
### <img src="https://user-images.githubusercontent.com/54332765/89236134-a3f02a80-d5a4-11ea-8842-56ec001b1082.png" alt="orders" width=300 height=475><img src="https://user-images.githubusercontent.com/54332765/89236244-ddc13100-d5a4-11ea-9ca4-ecca9b7ba2c3.png" alt="updateorder" width=300 height=475><img src="https://user-images.githubusercontent.com/54332765/89236361-3395d900-d5a5-11ea-9db2-a903b5a5a108.png" alt="editorder" width=300 height=475>


## My Profile Screen
  - Check and edit personal profile and account information
### <img src="https://user-images.githubusercontent.com/54332765/89236049-64c1d980-d5a4-11ea-82c3-be7e27eaf3bd.png" alt="profilepage" width=300 height=475><img src="https://user-images.githubusercontent.com/54332765/89236595-dea69280-d5a5-11ea-8a5f-29790752216d.png" alt="editpersonalinfo" width=300 height=475><img src="https://user-images.githubusercontent.com/54332765/89236708-29280f00-d5a6-11ea-925e-b7f673f7afcb.png" alt="resetpassword" width=300 height=475>


# Existing Bugs
- Crash when user input wrong email or password on login page
- Can not jump to partner walk page after accept order
- Can not filter if missing some condition
- Failure to check the validity email or password on signup page and reset email & password page





















