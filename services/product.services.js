const Product = require("../model/productSchema");


exports.createProductService = async(data) => {
    const product = new Product(data)
    const result = await product.save();
    return result;
}

exports.getProductService = async() => {
    const result = await Product.find({})
    return result
}