const stockServices = require("../services/stock.services")


// create stock
exports.createStock = async(req, res) => {
    try {
        const stock = await stockServices.createStockService(req.body)
        if(!stock._id){
            return res.status(400).json({
                status: 'failed',
                message: 'couldn\'t create stock',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'stock successfully created',
            data: stock,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'stock create failed',
            error: error.message,
        })
    }
}

// get stock
exports.getStocks = async(req, res) => {
    try {
        const stocks = await stockServices.getStockService()
        if(stocks.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'couldn\'t retrive stock',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'stock retrive successfull',
            data: stocks,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'stock retrive failed',
            error: error.message,
        })
    }
}

// get stock by id
exports.getStockById = async(req, res) => {
    try {
        const stock = await stockServices.getStockByIdService(req.params.id)
        if(Object.keys(stock).length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'couldn\'t retrive stock by id',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'stock retrive successfull by id',
            data: stock,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'stock retrive failed by id',
            error: error.message,
        })
    }
}

// update stock by id
exports.updateStockById = async(req, res) => {
    try {
        const updatedStock = await stockServices.updateStockByIdService(req.params.id, req.body)
        if(!updatedStock.modifiedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'couldn\'t update stock by id',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'stock update successfull by id',
            data: updatedStock,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'stock update failed by id',
            error: error.message,
        })
    }
}

// delete stock by id
exports.deleteStockById = async(req, res) => {
    try {
        const deletedStock = await stockServices.deleteStocByIdkService(req.params.id)
        if(!deletedStock.deletedCount){
            return res.status(400).json({
                status: 'failed',
                message: 'couldn\'t delete stock by id',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'stock delete successfull by id',
            data: deletedStock,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'stock delete failed by id',
            error: error.message,
        })
    }
}