# Tigerhall Kittens

Goal of this project is to build an API to track tigers & sight seeings of the tigers

## Development

### Getting started

Install following dependencies before being able to get development server started

1. Install Node.js (version >=16) on your system
2. Install yarn (version >3) on your system
3. Install Postgresql (version >=14) on your system. Please change all database settings to .env file or apply your settings in .env file
4. Create databse tigerhall_kittens or specify your preferred name in .env file
5. Run yarn install to install package dependencies
6. Run yarn migration:run command to create database tables

#### Running the app

After running all above mentioned stpes, type `yarn dev` to run the server

#### Accessing the app on dev

You can use http://localhost:3000/graphql to play with the API
