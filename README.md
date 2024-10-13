## News Application API

It is the RESTful API for the News Application.

## Features:

- User Authentication
- Update and get User preferences for news like category,languages and country.
- Get news articles
- validations for all the endpoints

## Project Structure.

The project follows a typical Express.js application structure:

├── Middlewares/ │ └── CommonErrHandler.js | └── Validate.js | └── ValidateJWT.js ├── Routes/ │ └── News.js
| └── User_preferences.js | └── user.js ├── Models/ | └── Articles.js | └── User.js | ├── .env ├── app.js ├── server.js └── package.json

- user.js - This file is responsible for handling register and login the user.
- User_preferences.js - This file is responsible for handling the user's news preferences.

## Routes Defined.

The following routes are available in the `routes/News.js/User_preferences.js/user.js` file:

| Method                    | Path                   | Description                      | Authentication |
| ------------------------- | ---------------------- | -------------------------------- | -------------- |
| POST                      | `/api/v1/users/signup` | To Register the user (signup)    | Not Required   |
| POST                      | `/api/v1/users/login`  | To login the user (signin)       | Required       |
| GET                       | `/user/preferences`    | To Get all user news preferences | Required       |
| PUT                       | `/user/preferences`    | To Update any news preferences   | Required       |
| GET                       | `/api/v1/news`         | To get the Top Headlines with    | Required       |
| Based on user preferences |

## Middlewares Used:

`Validate.js` - this was used to validate for `register`,`login` and `user_preferences`with certain validation headers.

`ValidateJWT` - This is the main functionality to look after the authentication as well as authorization of valid tokens passed with respect to news API application.

`CommonErrHandler.js` - This was used to handle all the error messages in the application.

## Setup & Installation

- 1.Clone The Repository

  `git clone https://github.com/airtribe-projects/news-aggregator-api-pavankumar-ui.git`
  `cd  news-aggregator-api-pavankumar-ui`

- 2.Install Dependencies and certain packages in step by step process as required.
  `npm install`
  `npm install express`
  `npm install nodemon --save-dev`
  `npm install dotenv`
  `npm install mongoose`
  `npm install jsonwebtoken`
  `npm install bcryptjs`
  `npm install joi`
  `npm install newsapi --save`
- If we want the dependency of api for `newsapi` without passing HTTP request directly, pass the above command.

- 3.setup the `.env` file with the following variables:

`PORT=3000`
`MONGODB_URL=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`
`API_KEY=your_news_api_key`

- 4.Start The Server

`npm run dev`

## API Usage and Endpoints

To make usage of the API, please pass the headers information like `Content-type` and `Authorization` very effectively.

`Content-type: application/json`
`Authorization: Bearer <token>`

you can use the following endpoints:

- `POST /api/v1/users/signup` - Register a new user. - No need of Authorization Header for this endpoint.
- `POST /api/v1/users/login` - Login and get a JWT token.
- `GET /api/v1/news` - Get news articles based on user preferences.
- `GET /user/preferences` - Get user preferences.
- `PUT /user/preferences` - Update user preferences.

- Include the prefix like below for getting response:

- eg: `http://localhost:3000/api/v1/users/signup`.

## Dependencies Used:

- `express` - A fast and minimalist web framework for Node.js.
- `nodemon` - A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- `dotenv` - A zero-dependency module that loads environment variables from a .env file into process.env.
- `mongoose` - A MongoDB object modeling tool designed to work in an asynchronous environment.
- `jsonwebtoken` - A library for working with JSON Web Tokens (JWT) in Node.js.
- `bcryptjs` - To Generate the JSON Web Token Randomly , once the user is registered.
- `joi` - A library for validating and sanitizing user input.
- `newsapi` - A library for accessing the News API.
- `axios` - A library for making HTTP requests.
