const mongoose = require('mongoose');

// define product schema...........
const productSchema = mongoose.Schema({
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
   
    unit: {
        type: String,
        required: [true, 'Product unit is required'],
        enum: {
            values: ['kg', 'litre', 'pics', 'bag'],
            message: 'Unit value cant be {VALUE}, must be use kg/litre/pics/bag'
        }
    },

    imageURLs:[{
        type: String,
        validate: {
            validator: (values) => {
                if(!Array.isArray(values)){
                    return false;
                }
                let isValid;
                values.forEach(url => {
                    if(!validator.isURL(url)){
                        isValid = false;
                    }
                })
                return isValid;
            },
            message: 'Please provide valid images url'
        }
    }],

    category: {
        type: String,
        required: true,
    },

    brand: {
        name: {
            type: String,
            required: true,
        },
        id:{
            type: Object,
            ref: 'Brand',
            required: true,
        }
    }

}, {timestamps: true})

productSchema.pre('save', function(next){
    if(this.quantity === 0){
        this.status = 'out-of-stock';
    }
    next();
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;