const { createOrder, getAllOrderCreateByUser, updateOrder } = require("../Service/orderServic");
const AppError = require("../utils/appError");

async function createNewOrder(req, res){
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message : "Successfully created the order",
            error : {},
            data : order
        })
    } catch (error) {
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


async function getAllOrdersByUsers(req, res){
    try {
        const order = await getAllOrderCreateByUser(req.user.id);
        return res.status(201).json({
            success: true,
            message : "Successfully fetched the orders",
            error : {},
            data : order
        })
    } catch (error) {
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


async function getOrder(req, res){
    try {
        const order = await getAllOrderCreateByUser(req.params.orderId);
        return res.status(201).json({
            success: true,
            message : "Successfully fetched the orders",
            error : {},
            data : order
        })
    } catch (error) {
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


async function cancleOrder(req, res){
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(201).json({
            success: true,
            message : "Successfully updated the orders",
            error : {},
            data : order
        })
    } catch (error) {
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


async function changeOrderStatus(req, res){
    try {
        const order = await updateOrder(req.body.orderId, req.body.status);
        return res.status(201).json({
            success: true,
            message : "Successfully updated the orders",
            error : {},
            data : order
        })
    } catch (error) {
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
    createNewOrder,
    getAllOrdersByUsers,
    getOrder,
    cancleOrder,
    changeOrderStatus
}