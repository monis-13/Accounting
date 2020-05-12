const movieModel = require('../Models/MovieDetails');

async function getMovieDetails(){
    const movieData = await movieModel.find({});
    return movieData; 
}

async function postMovieDetails(data) { 
    const movieData = await movieModel.insertMany([
        data
    ]);
    return movieData;
}

async function updateMovieDetails(id,rest) {
  const data = await movieModel.findOneAndUpdate(id,rest);
  return data;
}

async function deleteMovieDetails (name) {
    const data = await movieModel.deleteOne(name);
    return data;
}
module.exports = {
    getMovieDetails,
    postMovieDetails,
    updateMovieDetails,
    deleteMovieDetails,
}