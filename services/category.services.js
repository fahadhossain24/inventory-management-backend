const Category = require("../model/categoriSchema")


exports.createCategoryService = async(data) => {
    const result = await Category.create(data);
    return result;
}

exports.getCategorieService = async() => {
    const result = await Category.find({});
    return result;
}

exports.getCategoryByIdService = async(id) => {
    const result = await Category.findOne({_id: id});
    return result;
}

exports.updateCategoryByIdService = async(id, data) => {
    const result = await Category.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return result;
}