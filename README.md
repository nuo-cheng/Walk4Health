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
 
### Endpoints
  - create an account
    - Post /users/signup
  - Log in an account
    - Post /users/login
  - log out an account
    - Post /users/logout

  ## Posts
### Attributes
  - id (Serial primary key): Unique identifier for the object
  - time (String): the planned start time of the walking
  - zipcode (Integer): the user's age
  - price (Integer): the price of walking with(per 30 minutes)
  - distance(Number): the walking distance
  - done (Boolean): the state of the order, true represents completed, false indicates in progress
  - creator_id (Integer): the order creator's id
  - receiver_id (Integer): the id of the user accpeting the order 
 
 ### Endpoints
  - create a post
    - Post /posts/
  - retrive all other posts
    - GET /posts/
  - retrieve all completed posts the user created
    - Post /users/mycompletedposts
  - retrieve all in-progress posts the user created
    - Post /users/mycompletedposts
  - 

  ## Search
    This is a feature that users can search spicific information

    Endpoints
    - search zipcode - users input a zipcode, then get posts listing by distance to the zipcode
        GET/search/byzipcode/

    - search users - users input a username, then get the entry of that person's profile page
        GET/search/user


  ## Filter


# Credits





















