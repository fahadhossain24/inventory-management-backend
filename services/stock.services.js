const Stock = require("../model/stockSchema")


exports.createStockService = async(data) => {
    const result = await Stock.create(data);
    return result;
}

exports.getStockService = async() => {
    const result = await Stock.find({}).populate('product');
    return result;
}

exports.getStockByIdService = async(id) => {
    const result = await Stock.findOne({_id: id});
    return result;
}

exports.updateStockByIdService = async(id, data) => {
    const result = await Stock.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return result;
}

exports.deleteStocByIdkService = async(id) => {
    const result = await Stock.deleteOne({_id: id});
    return result;
}
