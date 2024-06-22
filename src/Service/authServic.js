const { findUserOne } = require("../Repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, JWT_EXIPIRY } = require('../Config/serverConfig');



async function loginUser(authDetails){
    const email = authDetails.email;
    const planePassword = authDetails.password;


    //1 check if there is a registered user with the given email
    const user = await findUserOne({ email });

    if(!user){
        throw {message : "No user found with the given email", statusCode: 404}
    }


    // 2. if the user found we need to compare plane Income password with hashedPass
    const isPasswordValideted = await bcrypt.compare(planePassword, user.password);

    if(!isPasswordValideted){
        throw { message: "Invalid password please try again", statusCode : 404}
    }

    const userRole = user.role ? user.role : "USER"

    // 3. if the password is valideted, create a token and return it
    const token = jwt.sign({ email: user.email, id: user._id, role : userRole}, SECRET_KEY, {
        expiresIn: JWT_EXIPIRY
    });
    
    return token;
}

module.exports = { loginUser }


// this is the blackbox 

// const loginUser = async (planePassword, user) => {
//     // 2. Compare plane Income password with hashedPass
//     const isPasswordValidated = await bcrypt.compare(planePassword, user.password);
//     // console.log(isPasswordValidated); // true
  
//     if (!isPasswordValidated) {
//       throw { message: "Invalid password please try again", statusCode: 404 };
//     }
  
//     // 3. Create a token and return it
//     const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, {
//       expiresIn: JWT_EXIPIRY
//     });
//     console.log("this is the before token"); // not coming to the compiler
  
//     return token;
//   };
  
//   module.exports = { loginUser };