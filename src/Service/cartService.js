const { getCartByUserId, clearCart } = require("../Repository/cartRepository");
const { getProductById } = require("../Repository/productRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart = await getCartByUserId(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }

    return cart;
}

async function modifyToCart(userId, productId, shouldAdd = true){
    const quantityValue = (shouldAdd == true) ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new NotFoundError("Product");
    }

    if(!product.inStock  && product.quantity <= 0){
        throw new BadRequestError(["Product not available in stock"]);
    }

    //May be the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(items => {
        if(items.product._id == productId){
           if(shouldAdd){
                if(product.quantity >= items.quantity + 1){
                    items.quantity += quantityValue;
                }else{
                    throw new AppError("The quantity of the items request is not available", 404);
                }
           }else{
                if(items.quantity > 0){
                    items.quantity += quantityValue;
                    if(items.quantity == 0){
                        cart.items = cart.items.filter( items => items.product._id != productId);
                        foundProduct = true;
                        return ;
                    }
                }else{
                    throw new AppError("The quantity of the items request is not available", 404)
                }
            }
            foundProduct = true;
        }
    });

    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
                product : productId,
                quantity : 1
            })
        }else{
            throw new NotFoundError("Product in the cart", 404);
        }
        
    }

    await cart.save();

    // product.quantity -= 1;

    // await product.save();

    return cart;

}

async function clearProductsFromCart(userId){
    const response = await clearCart(userId);
    return response;
}

module.exports = {
    getCart,
    modifyToCart,
    clearProductsFromCart
}