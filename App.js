const express = require("express");
const app = express();
require('colors');
require("dotenv").config();
//Getting Port From Environment File..
const PORT = process.env.PORT || 5000 ;
//Getting the Utility Connection Function...
const { connectionBridge } = require('./Utils/MongoDbConnection');

connectionBridge(process.env.MONGO_URI);


app.use(express.json());



//MainRouter
const router = require('./Routes');

app.use(router);

app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`.green.bold);
})





function errorHandlerTester (a) {
    const success = a === 5 ? true : false ;
    return new Promise((resolve , reject) =>
    {
      if(!success){
          resolve("ok");
      }
      else{
          reject("error Occured");
      }
    })
}

const data = {
    "status": "success",
    "data": {
        "n": 0,
        "opTime": {
            "ts": "6826056802740731905",
            "t": 4
        }
    }
};
console.log(data.data.n);