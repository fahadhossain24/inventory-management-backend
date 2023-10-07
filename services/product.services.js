const Product = require("../model/productSchema");


exports.createProductService = async(data) => {
    const product = new Product(data)
    const result = await product.save();
    return result;
}

exports.getProductService = async(filters, queries) => {
    const result = await Product
    .find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)


    // const totalProducts = await Product.count();
    // const page = Math.ceil(totalProducts/queries.limit)
    // console.log(totalProducts,page)

    return result
}

exports.updateProductByIdService = async(id, data) => {
    // const result = await Product.updateOne({_id: id}, {$set: data}, {
    //     runValidators: true,
    // });
    const product = await Product.findById(id)
    console.log(product)
    const updatedProduct = await product.set(data).save();
    return updatedProduct;
}

exports.productsBulkUpdateService = async(data) => {
    // const result = await Product.updateMany({_id: data.ids}, data.data, {
    //     runValidators: true,
    // })

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id: product.id}, product.data))
    })
    const result = await Promise.all(products);
    return result;
}

exports.deleteProduct = async(productId) => {
    const deletedProduct = await Product.deleteOne({_id: productId});
    return deletedProduct;
}