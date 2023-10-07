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
        let filters = {...req.query}
        const excludedFields = ['page', 'limit', 'sort', 'fields']
        excludedFields.forEach(field => delete filters[field]);

        //apply comparison operator when product getting
        const filterString = JSON.stringify(filters);
        filters = JSON.parse(filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`))
        
        const queries = {}

        //pagination
        if(req.query.page || req.query.limit){
            // console.log(req.query)
            const {page = 1, limit = 2} = req.query
            const skip = (page-1) * parseInt(limit)
            queries.skip = skip;
            queries.limit = +limit
        }
        
        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy;
        }

        //projection
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }
  
    
        const products = await productServices.getProductService(filters, queries);
        // console.log(products)
        res.status(200).json({
            status: 'success',
            message: 'data successfully retrived',
            data: products,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'data retrive failed',
            error: err.message,
        })
    }
}

// get product by id

exports.updateProductById = async(req, res, next) => {
    try{
        const updatedProduct = await productServices.updateProductByIdService(req.params.id, req.body);
        res.status(200).json(({
            status: 'success',
            message: 'Product update successfull',
            data: updatedProduct,
        }))
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'couldnt update product',
            error: err.message
        })
    }
}

exports.productsBulkUpdate = async(req, res, nex) => {
    try{
        const updatedProducts = await productServices.productsBulkUpdateService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product update successfull',
            data: updatedProducts,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'couldn\'t update product',
            error: err.message
        })
    }
}

exports.deleteProduct = async(req, res, next) => {
    try{
        const deletedProduct = await productServices.deleteProduct(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Product delete successfull',
            data: deletedProduct,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'couldn\'t delete product',
            error: err.message
        })
    }
} 