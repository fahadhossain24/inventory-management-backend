const Store = require("../model/storeSchema")


exports.createStoreServices = async(data) => {
    const result = await Store.create(data);
    return result
}

exports.getStoreService = async() => {
    const result = await Store.find({});
    return result
}

exports.getStoreByIdService = async(id) => {
    const result = await Store.findOne({_id: id});
    return result
}

exports.updateStoreByIdService = async(id, data) => {
    const result = await Store.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return result
}