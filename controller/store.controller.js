const { createStoreServices, getStoreService, getStoreByIdService, updateStoreByIdService } = require("../services/store.services")

// create store
exports.createStore = async(req, res, next) => {
    try{
        const store = await createStoreServices(req.body);
        res.status(200).json({
            status: 'success',
            message: 'store create successfull',
            data: store
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'store create failed',
            error: err.message,
        })
    }
}

//get stores
exports.getStores = async(req, res, next) => {
    try{
        const stores = await getStoreService();
        res.status(200).json({
            status: 'success',
            message: 'retrive store successfull',
            data: stores
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'retrive store failed',
            error: err.message,
        })
    }
}

// get store by id
exports.getStoreById = async(req, res, next) => {
    try{
        const store = await getStoreByIdService(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'retrive store successfull by id',
            data: store
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'retrive store failed by id',
            error: err.message,
        })
    }
}

//update store by id
exports.updateStoreById = async(req, res, next) => {
    try{
        const updatedStore = await updateStoreByIdService(req.params.id, req.body);
        if(!updatedStore.modifiedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'store couldn\'t update by id',
                error: err.message,
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'store update successfull by id',
            data: updatedStore
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: 'store update failed by id',
            error: err.message,
        })
    }
}