const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../Config/serverConfig');

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

    const decoded = jwt.verify(token, SECRET_KEY);

    if(decoded){
        return res.status(401).json({
            success : false,
            data : {},
            error : "Not Authonticated",
            message: "Invalid token provided",

        });
    }

    // if reached here then user is authonticated allow then to access the api
    req.user = {
        email : decoded.email,
        id : decoded.id
    }

    next();
}

module.exports = {
    isLoggedIn
}