const supplierServices = require("../services/supplier.services")

// create supplier
exports.createSupplier = async(req, res) => {
    try {
        const supplier = await supplierServices.createSupplierService(req.body);
        if(!supplier._id){
            return res.status(400).json({
                status: 'failed',
                message: 'supplier cant create',
            })
        }

        res.status(200).json({
            status: 'success', 
            message: 'supplier successfully created',
            data: supplier,
        })
    } catch (error) {   
        res.status(400).json({
            status: 'failed',
            message: 'supplier create failed',
            error: error.message,
        })
    }
}

// get suppliers
exports.getSuppliers = async(req, res) => {
    try {
        const suppliers = await supplierServices.getSuppliersService();
        if(suppliers.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'supplier retrive failed',
            })
        }

        res.status(200).json({
            status: 'success', 
            message: 'supplier successfully retrive',
            data: suppliers,
        })
    } catch (error) {   
        res.status(400).json({
            status: 'failed',
            message: 'supplier retrive failed',
            error: error.message,
        })
    }
}

// get supplier by id
exports.getSupplier = async(req, res) => {
    try {
        const supplier = await supplierServices.getSupplierService(req.params.id);

        res.status(200).json({
            status: 'success', 
            message: 'supplier successfully retrive by id',
            data: supplier,
        })
    } catch (error) {   
        res.status(400).json({
            status: 'failed',
            message: 'supplier retrive failed by id',
        })
    }
}

// update supplier by id
exports.updateSupplier = async(req, res) => {
    try {
        const updatedSupplier = await supplierServices.updateSupplierService(req.params.id, req.body);

        if(!updatedSupplier.modifiedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'supplier couldn\'t update',
            })
        }

        res.status(200).json({
            status: 'success', 
            message: 'supplier successfully updated by id',
            data: updatedSupplier,
        })
    } catch (error) {   
        res.status(400).json({
            status: 'failed',
            message: 'supplier update failed by id',
            error: error.message,
        })
    }
}

// delete supplier by id
exports.deleteSupplier = async(req, res) => {
    try {
        const deletedSupplier = await supplierServices.deleteSupplierService(req.params.id);

        if(!deletedSupplier.deletedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'supplier couldn\'t update',
            })
        }

        res.status(200).json({
            status: 'success', 
            message: 'supplier successfully updated by id',
            data: deletedSupplier,
        })
    } catch (error) {   
        res.status(400).json({
            status: 'failed',
            message: 'supplier update failed by id',
            error: error.message,
        })
    }
}