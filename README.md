# CST - 218 Homesteading Project

Summary:
 This project was meant to be an API for data regarding homesteading. To be more specific, knowledge to maintain, cultivate and thrive with your home.

## Features
 - The ability to post data
 - The ability to delete data

## Tech stack

 - Node
 - Express
 - MongoDB

## Routes
- POST /register
- POST /login   -> returns token
- GET  /profile (protected)
- CRUD: /entries (all protected, ownership enforced)
- /auth

## Setup
1. Install dependencies:
   npm install
2. Paste your MongoDB connection string into `.env`
3. Start:
   node server.js

## Endpoints to test

- POST /auth/register
- POST /auth/login
- GET /profile (protected)
- GET /entries (protected)
- POST /entries (protected)