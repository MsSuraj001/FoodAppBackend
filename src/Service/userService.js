const {findUserOne, createUser} = require('../Repository/userRepository')

async function registerUser(userDetails){

    // 1. We need to check if the user with this email and mobile number already exists or not
    const user = await findUserOne({
        email : userDetails.email,
        mobileNuber : userDetails.mobileNumber
    });

    if(user){
        throw { reson: "User with the given Mobile Number & Email id already exist", status: 400}
    }

    // 2. If not then create the user in the database
    const newUser = await createUser({
        firstName: userDetails.firstName,
        lastName : userDetails.lastName,
        email: userDetails.email,
        password : userDetails.password,
        mobileNumber : userDetails.mobileNumber
    });

    if(!newUser){
        throw{reason : "Something went worng, cannot created user", status: 500}
    }

    return newUser;


}

module.exports = {
    registerUser
}