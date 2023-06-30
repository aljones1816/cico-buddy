# CicoBuddy

CicoBuddy is a macro and weight-tracking app that is built to be simple and intuitive to use. 

## Table of Contents

Project Description

Features

Demo

Getting Started

Prerequisites

Built With

License

## Project Description

CicoBuddy was built as an easy logging experience for people who log their fitness tracking like me: I want a simple interface to track only calories and macros eaten, calories burned through exercise, and my bodyweight. I also want to be able to view a history of my weight change and to be able to go back through my logs quickly to update or edit them.
CicoBuddy is a full stack MERN app, written in TypeScript, using Vite as a build tool and development server, with Chakra UI components. This project was build for my every day use as well as being a learning project. As such, it is actively being developed and new improvements are coming all the time.

## Features

* Log meals using a simple interface that only cares about calories consumed and protein intake.
* Add daily weight logs and view a history of weight gain or loss in a dynamic data visual.
* View a history of daily logs and edit or delete them

## Demo

A live version of the app is available [here](https://cico-buddy.com).

## Getting Started

To run this project locally, clone the repository to your local machine by executing 

$
```
 git clone https://github.com/aljones1816/cico-buddy.git
```

in your terminal. Then ```cd cico-buddy``` and run ```npm install``` in the project root (to install Typescript), in the server directory, and in the frontend directory.

You will then need to create a .env file in the top level of the server folder to contain the following secrets (these will be loaded via dotenv in development mode):

* ATLAS_URI: The URI for your MongoDB Atlas instance (see [here](https://www.mongodb.com/docs/atlas/getting-started/) to set up an Atlas database).
* PORT: the port number the server app will listen on (default is 80 - if you change this you will need to change the port in the frontend/.env.development configuration file).
* SECRET: a secret phrase that will be used by JSON Web Tokens to encrypt user tokens.

Execute ```npm run dev``` in the server and frontend directories to spin up development servers.

### Prerequisites
You will need to have [Node](https://nodejs.org/) installed on your local machine to run the above steps.

## Built With

### Frontend
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Chakra UI](https://chakra-ui.com/)

### Server
* [Node.js](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
  
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

