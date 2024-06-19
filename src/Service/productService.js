const cloudinary = require('../Config/cloudinaryConfig');
const productRepository = require('../Repository/productRepository');
const fs = require('fs/promises');
// const { unlink } = require('../Router/productRoute');

async function createProduct(productDetails){
    // 1.We should be if am image is coming to create the product, then we should first upload it on cloudinary

    const imagePath = productDetails.imagePath;

    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        }catch(error){
            console.log(error);
            throw {resone: "not able to create product", statusCode: 500}
        }
    }

    //2 then use the url from cloudinary and other product details to add product in db 
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    })

    if(!product){
        throw {resone: "not able to create product", statusCode: 500}
    }

    return product;
}

module.exports = {
    createProduct
}