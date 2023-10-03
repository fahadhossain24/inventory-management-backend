const Product = require("../model/productSchema")

// save product
exports.saveProduct = async (req, res, next) => {
    // we can insert data to the database using two ways. first save() method and second create()
    try {
        const product = new Product(req.body)
        const result = await product.save();
        res.status(200).json({
            status: 'success',
            message: 'Product successfully saved',
            data: result
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
        const result = await Product.find({})
        res.status(200).json({
            status: 'success',
            message: 'data successfully retrived',
            data: result,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'data retrive failed',
            error: err,
        })
    }
}