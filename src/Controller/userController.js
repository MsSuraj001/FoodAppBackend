const { registerUser } = require("../Service/userService");

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