const mongoose = require('mongoose');

// define product schema...........
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: [true, 'This name already used'],
        minLength: [3, 'Product name must be minimum 3 character'],
        maxLength: [80, 'Product name is too large']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price will be positive number']
    },
    unit: {
        type: String,
        required: [true, 'Product unit is required'],
        enum: {
            values: ['kg', 'litre', 'pics'],
            message: 'Unit value cant be {VALUE}, must be use kg/litre/pics'
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Quantity can not be negative'],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false;
                }
            },
            message: 'Quantity must be an integer'
        }
    },
    status: {
        type: String,
        required: [true, 'Product status is required'],
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: 'Status can not be {VALUE}'
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supplier'
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: [true, 'Category name is required']
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]

}, {timestamps: true})


// create Product model..........
const Product = mongoose.model('Product', productSchema);

module.exports = Product;