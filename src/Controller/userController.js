const { registerUser } = require("../Service/userService");
const AppError = require("../utils/appError");

async function createUser(req, res){
    try{
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: "Successfully registred the user",
            success : true,
            data : response,
            error: {},
        });
    }
    catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data: {},
                error: error
            })
        }
        return res.status(500).json({
            success: false,
            message : error.reason,
            data : {},
            error: error
        });
    }
}

module.exports = {
    createUser
}