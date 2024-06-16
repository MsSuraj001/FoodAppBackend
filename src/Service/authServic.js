const { findUserOne } = require("../Repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXIPIRY } = require('../Config/serverConfig');
const registerUser = require('../Service/userService');


async function loginUser(authDetails){
    const email = authDetails.email;
    const planePassword = authDetails.password;

    //console.log(email, planePassword);     //this is the checking for email or password
    //         undifinef    undefined

    //1 check if there is a registered user with the given email
    const user = await findUserOne({ email });
    //console.log(user);

    if(!user){
        throw {message : "No user found with the given email", statusCode: 404}
    }


    // 2. if the user found we need to compare plane Income password with hashedPass
    const isPasswordValideted =await bcrypt.compare(planePassword, user.password);

    if(!isPasswordValideted){
        throw { message: "Invalid password please try again", statusCode : 401}
    }

    // 3. if the password is valideted, create a token and return it
    const token = jwt.sign({ email : user.email, id: user._id}, JWT_SECRET, {
        expiresIn: JWT_EXIPIRY
    });

    return token;
}

module.exports = { loginUser }