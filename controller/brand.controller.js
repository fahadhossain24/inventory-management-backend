const { createBrandService, getBrandService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.servervices")

// create brand controller
exports.createBrand = async(req, res, next) => {
    try{
        const createdBrand = await createBrandService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Brand successfully created',
            data: createdBrand,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'Brand creation failed',
            error: err.message,
        })
    }
}

// get brands controller
exports.getBrands = async(req, res, next) => {
    try{
        const brands = await getBrandService()
        res.status(200).json({
            status: 'success',
            message: 'Brands successfully retrive',
            data: brands,
        })
    }catch(err){
        res.status(400).json({
            status: 'failesd',
            message: 'retrive brands data failed',
            error: err.message,
        })
    }
}

// get brand by id
exports.getBrandById = async(req, res, next) => {
    try{
        const brand = await getBrandByIdService(req.params.id)
        res.status(200).json({
            status: 'success',
            message: 'Brand successfully retrive by id',
            data: brand,
        })
    }catch(err){
        res.status(400).json({
            status: 'failesd',
            message: 'retrive brand data failed by id',
            error: err.message,
        })
    }
}

// update brand by id
exports.updateBrandById = async(req, res, next) => {
    try{
        const brandId = req.params.id;
        const updatedBrand = await updateBrandByIdService(brandId, req.body);
        if(!updatedBrand.modifiedCount){
            return res.status(400).json({
                status: 'update failed',
                message: 'couldnt update brand',
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Brand successfully update by id',
            data: updatedBrand,
        })
    }catch(err){
        res.status(400).json({
            status: 'failesd',
            message: 'brand update failed by id',
            error: err.message,
        })
    }
}
