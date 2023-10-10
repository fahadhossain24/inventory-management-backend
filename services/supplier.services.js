const Supplier = require("../model/supplierSchema")

exports.createSupplierService = async(data) => {
    const result = await Supplier.create(data);
    return result;
}

exports.getSuppliersService = async() => {
    const result = await Supplier.find({});
    return result;
}

exports.getSupplierService = async(id) => {
    const result = await Supplier.findOne({_id: id});
    return result;
}

exports.updateSupplierService = async(id, data) => {
    const result = await Supplier.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return result;
}

exports.deleteSupplierService = async(id) => {
    const result = await Supplier.deleteOne({_id: id});
    console.log(result)
    return result;
}