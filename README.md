# WalkingApp


# Walk4Health
Walk4Health is a user-style mobile app, to help people find walking partners in their community/neighborhood

# Motivation
Covid-19 have exposed us to social isolation and physical decline. The goal of this project is to help people get outside and walk for their own health and social interaction.


# Features
Compared to the existing competitors, the uniqueness of walk4health is that it provides a 2 sided marketplace for our users. Clients can choose to be a provider giving others a walk or be a consumer looking for someone to go on a walk.

- Sign up/ Log in (completed)
- Search/Filter (in progress)
- Reviews/History (not started)

# Screenshots

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

# Credits





















