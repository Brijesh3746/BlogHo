// const { log, error } = require("console");
const mongoose = require("mongoose");

require("dotenv").config();

exports.connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
    .then(console.log("Database connection successfully"))
    .catch((error) =>{
        console.log("Error in Database Connection");
        console.log(error);
        process.exit(1);
    });
}