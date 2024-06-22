const { STATUS_CODES } = require('http');
const cloudinary = require('../Config/cloudinaryConfig');
const productRepository = require('../Repository/productRepository');
const fs = require('fs/promises');
const { log } = require('console');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');
// const { unlink } = require('../Router/productRoute');

async function createProduct(productDetails){
    // 1.We should be if am image is coming to create the product, then we should first upload it on cloudinary

    const imagePath = productDetails.imagePath;
    console.log("this is the image path")

    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        }catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }

    //2 then use the url from cloudinary and other product details to add product in db 
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    })

    return product;

    
}

async function getProductById(productId){
    const response = await productRepository.getProductById(productId);
        
    if(!response){
        throw new NotFoundError('Product');
    }

    return response;
    
}

async function deleteProductById(productId){
    const response = await productRepository.deleteProductById(productId);
        
    if(!response){
        throw new NotFoundError('Product');
    }

    return response;
    
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}