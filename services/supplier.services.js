const Supplier = require("../model/supplierSchema")
const Brand = require("../model/brandSchema")

exports.createSupplierService = async(data) => {
    const result = await Supplier.create(data);
    if(result._id){
        const {_id: supplierId, brand} = result;
        await Brand.updateOne({_id: brand.id}, {$push: {suppliers: supplierId}}, {
            runValidators: true,
        })
    }
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