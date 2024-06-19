const { response } = require('express');
const { createProduct } = require('../Service/productService');


async function addProduct (req, res){
    // console.log(req.file);
    // const result = await cloudinary.uploader.upload(req.file.path)
    // console.log("result from cloudinary", result);
    // await fs.unlink(req.file.path);
    // return res.json({message : "ok"})

    try{
        const product = await createProduct({
            productName : req.body.productName,
            discriptions : req.body.discriptions,
            imagePath : req.file.path,
            price : req.body.price,
            catogory : req.body.catogory,   // if catogory undifile veg will be stored
            inStock : req.body.inStock,   // if inStock undifile true will be stored
        });

        return res.status(201).json({
            success : true,
            message: "successfully create the product",
            error : {},
            data: product
        })
    }catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            success : false,
            message : error.message,
            data: {},
            error: error
        })
    }

};

module.exports = {
    addProduct
}