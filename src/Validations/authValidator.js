const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../Config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"];
    if(!token){
        return res.status(401).json({
            success : false,
            data : {},
            error : "Not Authonticated",
            message: "No auth token provided",

        });
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        if(!decoded){
            throw new UnauthorisedError();
        }
        // if reached here then user is authonticated allow then to access the api
        req.user = {
            email : decoded.email,
            id : decoded.id,
            role : decoded.role
        }
        next();
    } catch(error){
        return res.status(401).json({
            success : false,
            data : {},
            error : error,
            message: "Invalid token provided",

        });
    }

}

// this function check if the authonticated user is an admin or not ?
// Beacuse we will call isAdmin after isloggedIN that why we will recived user details
function isAdmin(req, res, next){
    const loggedInUser = req.user;
    if(loggedInUser.role === "ADMIN"){
        next()
    }else{
        return res.status(401).json({
            success : false,
            data : {},
            message: "You are not authorised for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorised user for this action"
            }
        })
    } 
}

module.exports = {
    isLoggedIn,
    isAdmin
}