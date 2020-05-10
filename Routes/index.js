const express = require('express');
const mainRouter = express.Router();

mainRouter.use('/movies',require('./MovieRoutes'));

module.exports = mainRouter;
