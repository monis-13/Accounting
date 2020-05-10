const movieModel = require('../Modules/MovieDetails');

async function getMovieDetails(){
    const movieData = await movieModel.find({});
    return movieData; 
}

module.exports = {
    getMovieDetails,
}