const express = require('express');
const movieRouter = express.Router();
const { check, validationResult } = require('express-validator');

//Getting the Service Layer function for Reading updating posting and deleting data..
const { getMovieDetails, postMovieDetails, updateMovieDetails, deleteMovieDetails } = require('../Service/MovieCRUD');

//Routes for Movies
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
      .post([
          check('name')
          .not().isEmpty()
          .isLength({ min: 1, max: 40 })
          .withMessage("Check The Following things please:\n Your entered Name should be four character longs \n And it should be a non empty string")
          .trim(),
          check('director').not().isEmpty()
          .isLength({ min: 1, max: 40 }).
          withMessage("Check The Following things please:\n Your entered Name should be four character longs \n And it should be a non empty string"),
          check('actors').isArray().trim(),
      ], async (req, res, next) => {
          const errors = validationResult(req).array();
          if(errors.length>0){
              res.status(405).json({"req":errors})
          }
          else{
          try {
              const data = await postMovieDetails(req.body);
              res.status(200).json({
                  "status": "success",
                  "data": data,
              })
          } catch (error) {
            res.status(404).json({
                "status": "failed",
                "error": error,
            })
          }}
      })
      movieRouter.put('/movieDetailsUpdate/:name',async (req, res, next) => {
          try {
             const data = await updateMovieDetails({ name: req.params.name.toString() },{name: req.body.name}); 
             res.status(200).json({"status": "success", "data": data});
          } catch (error) {
            res.status(200).json({"status": "error", "data": error});
          }
      });

      movieRouter.delete('/movieDetailsDelete/:name', async (req,res,next) => {
        try {
            const data = await deleteMovieDetails({ name: req.params.name});
            if(data.n === 0){
                res.send("Database does not contain any documnet related to your name ");
            }
            else{
            res.status(200).json({
                "status": "success",
                "data": data,
            })
        }
        
        } catch (error) {
            res.status(404).json({
                "status": "error",
                "data": error,
            })
        }
    
      });

module.exports = movieRouter;      
