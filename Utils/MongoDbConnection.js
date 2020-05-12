const mongoose = require('mongoose');
require('colors');

function connectionBridge (URI) {
    mongoose.connect(URI,{
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then((result) => {
        console.log("Connected Successfully to the desired MONGODB Database".green)
    }).catch((err) => {
        console.log(`Error occured while connecting to Database ${err}`.red);
    });
    
}

module.exports = {
    connectionBridge
}