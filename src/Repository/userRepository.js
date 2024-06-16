const  User  = require('../Schema/userSchema');
const mongoose = require('mongoose')

async function findUserOne(parameters){
    try{
        // console.log("find the user one");
        const response = await User.findOne({ ...parameters });
        //console.log(response);  // null
        return response;
    }catch(error){
        console.log("this is the find user time error");
        console.log(error);
    }
}

async function createUser(userDetails){
    try{
        const response = await User.create(userDetails);
        return response;
    }catch(error){
        console.log("User Created error");
        console.log(error);
    }
}



module.exports = {
    createUser,
    findUserOne
}