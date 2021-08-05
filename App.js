const express = require("express");
const app = express();
require('colors');
require("dotenv").config();
//Getting Port From Environment File..
const PORT = process.env.PORT || 5000 ;
//Getting the Utility Connection Function...
const { connectionBridge } = require('./Utils/MongoDbConnection');

connectionBridge(process.env.MONGO_URI);

// Swagger documentation

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
  ...require('./Documents/servers'),
  ...require('./Documents/Components'),
  ...require('./Documents/Tags')
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


app.use(express.json());
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



//MainRouter
const router = require('./Routes');

app.use(router);

app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`.green.bold);
});