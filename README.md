# User Account Register and Login Using Jsonwebtoken
> simple user account registering and login app using nodejs, expressjs and mongodb using jsonwebtoken for authentication.

## Prerequisite:
- [x] npm latest version
- [x] REST Client Extension for Visual Studio (for checking api end points)

## Technologies used:
### 1. Backend
- Nodejs
- ExpressJs
- MongoDb
### 2. For Api testing
- Rest Client

## Dependency install
```
npm install --save
```
Dependencies are:
> express, bcrypt, cors, jsonwebtoken, mongoose, dotenv, cookie-parser

## Dev Dependency install
```
npm install --save-dev
```
Dev Dependency is:
> nodemon

## Run Project
```
npm run devStart
```
Or
```
nodemon app.js
```

## Rest Client Api testing
#### Creating User Account
```rest
POST http://localhost:4000/api/create-user
Content-Type: application/json

{
    "fullName": "Abraham Mitiku",
    "email": "abraham@gmail.com",
    "password": "123"
}
```
#### Login user account
```rest
POST http://localhost:4000/api/create-user
Content-Type: application/json

{
    "email": "abraham@gmail.com",
    "password": "123"
}
```

#### Reading authorized resources
```rest
GET http://localhost:4000/api/read-user-info
```
> You can add authorized resource end points
