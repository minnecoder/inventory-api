# Inventory API
This is a REST API that can be used for the backend of an e-commerce site or store

## Getting Started
Clone the repo:
```
git clone git@github.com:minnecoder/inventory-api.git
cd inventory-api
```
Install dependencies:
```
npm install
```
Setting Environment Variables
````
Rename config.example.env to config.env
Fill in all of the fields with your information
````

## Working on the Project
Running the project in development
```
npm run dev
```
To check for TypeScript errors
```
npm run type-check
```

## API Documentation
Swagger is used on the API for documentation. The Swagger documentation can be viewed at `/api-docs`.
If changes are made to the Swagger files, the command `npm run swagger` needs to be run to compile the `swagger-compiled.json` file.

## Deployment to Heroku
This project is setup to be deployed to Heroku
Steps to deploy to Heroku:
```
Add a new project to Heroku
On the Deploy tab, under the Deployment method select GitHub
On the Settings tab, under Config Vars, click on the "Add Config Var" button
Fill in the name of the config var
Fill in the value of the config var
```