const express = require('express');
const mainRouter = express.Router();

mainRouter.use('/accounts',require('./AccounstRoute'));

module.exports = mainRouter;
