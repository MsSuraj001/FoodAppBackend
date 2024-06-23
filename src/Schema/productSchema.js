const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true, "Product name is required"],
        minlength : [5, "Product name must be atleast 5 charcters"],
        trim : true
    },

    discriptions : {
        type : String,
        minlength : [5, "Product discriptions must be atleast 5 charcters"],
    },
    productImage : {
        type : String,
    },
    quantity : {
        type : Number,
        required : [true, "Quantity is required"],
        default : 10
    },
    price : {
        type : Number,
        required : [true, "Product price is required"],
    },
    catogory : {
        type : String,
        enum : ["veg", "non-veg", "drinks", "sides"],
        default : "veg"
    },
    inStock : {
        type : Boolean,
        require : [true, "In Stock status is required"],
        default : true,
    },
}, {timestamps : true});

const Product = mongoose.model("Product", productSchema);


module.exports = Product;