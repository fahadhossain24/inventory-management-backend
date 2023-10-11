const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types

// define stock schema...........
const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: [true, 'This name already used'],
        maxLength: [80, 'Product name is too large'],
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },

    product: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },

    unit: {
        type: String,
        required: [true, 'Product unit is required'],
        enum: {
            values: ['kg', 'litre', 'pics', 'bag'],
            message: 'Unit value cant be {VALUE}, must be use kg/litre/pics/bag'
        }
    },

    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, 'Please provide valid images url']
    }],

    price: {
        type: Number,
        required: true,
        min: [0, 'Product price cant be nagetive'],
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, 'Product quantity cant be negative'],
    },

    category: {
        type: String,
        required: true,
    },

    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true,
        }
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinue'],
            message: 'status will not be {VALUE}. it must be is-stock/out-of-stock/discontinue',
        },
    },

    store: {
        name: {
            type: String,
            trim: true,
            required: [true, 'Store name is required'],
            lowercase: true,
            enum: {
                values: ['dhaka', 'chattogram', 'rajshahi', 'rangpur', 'khulna', 'barisal', 'sylhet', 'mymensing'],
                message: '{VALUE} is not a valid name as store name',
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store'
        },
    },

    supplier: {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide a supplier name'],
        },
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    }

}, { timestamps: true })

stockSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.status = 'out-of-stock';
    }
    next();
})


const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;