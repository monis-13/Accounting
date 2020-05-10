const express = require('express');

const movieRouter = express.Router();
const { getMovieDetails } = require('../Service/MovieCRUD');
movieRouter.route('/movieDetails')
      .get(async(req, res, next) => {
          try {
              const data = await getMovieDetails();
              res.status(200).json({
                  "status": "success",
                  "data": data,
              })
          } catch (error) {
              res.status(404).json({
                  "status": "failed",
                  "error": error,
              })
          }
      })
      .post((req, res, next) => {
          res.send('post a movie');
      })
      .put((req, res, next) => {
          res.send('It will update the mvoieDetails');
      });

module.exports = movieRouter;      