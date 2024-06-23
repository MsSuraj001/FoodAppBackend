const { getCart, modifyToCart } = require("../Service/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res){
    try{
        const cart = await getCart(req.user.id)
        return res.status(200).json({
            success: true,
            message : "Successfully fetch the cart",
            error : {},
            data : cart
        })
    } catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                meassage : error.message,
                error : error,
                data : {}
            });
        }
        res.status(500).json({
            success: false,
            meassage : "Something went wrong",
            error : error,
            data : {}
        })
    }
}


async function modifyProductToCart(req, res){
    try{
        const cart = await modifyToCart(req.user.id, req.params.productId, req.params.operation == "add");
        return res.status(200).json({
            success: true,
            message : "Successfully added to the cart",
            error : {},
            data : cart
        })
    } catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                meassage : error.message,
                error : error,
                data : {}
            });
        }
        res.status(500).json({
            success: false,
            meassage : "Something went wrong",
            error : error,
            data : {}
        })
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart
}