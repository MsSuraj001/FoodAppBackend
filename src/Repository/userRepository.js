const  User  = require('../Schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');
// const mongoose = require('mongoose')

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
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message;
            });
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
    }
}



module.exports = {
    createUser,
    findUserOne
}