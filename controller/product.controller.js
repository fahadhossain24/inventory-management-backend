const Product = require("../model/productSchema");
const productServices = require("../services/product.services");

// save product
exports.saveProduct = async (req, res, next) => {
    // we can insert data to the database using two ways. first save() method and second create()
    try {
        const product = await productServices.createProductService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product successfully saved',
            data: product
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Product saved failed',
            error: err.message
        })
    }
}

// get product using defferent query

exports.getProduct = async(req, res, next) => {
    try{
        const products = await productServices.getProductService();
        res.status(200).json({
            status: 'success',
            message: 'data successfully retrived',
            data: products,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'data retrive failed',
            error: err,
        })
    }
}