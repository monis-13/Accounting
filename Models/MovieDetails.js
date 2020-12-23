const mongoose = require("mongoose");


const movieScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is missing in your request, please enter the name of the movie because it is requested" ],
    },
    director: {
        type: String,
        required: [true, "Name is missing in your request, please enter the name of the movie because it is requested" ],
    },
    actors: {
        type: Array,
    },
    imdb: {
        type: Number, 
    }
})

module.exports = mongoose.model('movieDetails', movieScheme, 'movieDetails');
