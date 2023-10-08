const { createCategoryService, getCategorieService, getCategoryByIdService, updateCategoryByIdService } = require("../services/category.services")

//create category
exports.createCategory = async(req, res, next) => {
    try{
        const createdCategory = await createCategoryService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'category create success',
            data: createdCategory,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'category create failed',
            error: err.message
        })
    }
}

// get categories
exports.getCategories = async(req, res, next) => {
    try{
        const categories = await getCategorieService();
        res.status(200).json({
            status: 'success',
            message: 'retrive categories success',
            data: categories,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'retrive categories failed',
            error: err.message
        })
    }
}

// get category by id
exports.getCategoryById = async(req, res, next) => {
    try{
        const category = await getCategoryByIdService(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'retrive category success',
            data: category,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'retrive category failed',
            error: err.message
        })
    }
}

// update category by id
exports.updateCategoryById = async(req, res, next) => {
    try{
        const updatedCategory = await updateCategoryByIdService(req.params.id, req.body)
        if(!updatedCategory.modifiedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'category not updated',
                error: err.message
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'update category success',
            data: updatedCategory,
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'update category failed',
            error: err.message
        })
    }
}