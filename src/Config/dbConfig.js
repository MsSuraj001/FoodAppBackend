const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

async function connectedDB(){
    try{
       await mongoose.connect(serverConfig.DB_URL)
        console.log("Database connection successfully");
    }catch(error){
        console.log("Databse connection error");
        console.log(error);
    }
}

module.exports = {
    connectedDB
}