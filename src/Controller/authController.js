const { loginUser } = require('../Service/authServic')

async function logIn(req, res){
    
    try{
        const loginPayload = req.body;
        // auth service
        const response = await loginUser(loginPayload);
        
        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Successfully lonIN User",
            data : response,
            error: {}
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            data: {},
            message: error.message,
            error : error,
        })
    }
}

module.exports = logIn;