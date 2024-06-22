const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                default : 1
            }
        }
    ],
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : "ORDERED",
        enum : ["ORDERED", "CANCLLED", "DELIVERED", "PROCESSING", "OUT_FOR_DELIVERY"]
    }
})