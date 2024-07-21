const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../Config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"];
    console.log(token);
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
        console.log(decoded, decoded.exp, Date.now() / 1000);
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
        console.log(error.name);
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken", "", {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                success: true,
                message: "Log out successfull",
                error: {},
                data: {}
            });
        }
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