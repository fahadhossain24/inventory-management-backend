const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;


const brandSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Brand name is required'],
        unique: true,
        maxLength: [100, 'Brand name must be less than 100 charecter'],
        lowercase: true,
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
        lowercase: true,
    },
    website: {
        type: String,
        validate: [validator.isURL, 'please provide a valid url']
    },
    location: String,
    product:{
        type: ObjectId,
        ref: 'Product',
    },
    suppliers: {
        name: String,
        contactNumber: String,
        id:{
            type: ObjectId,
            ref: 'Supplier'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: 'Status {VALUE} is invalid, status must be active/inactive',
        },
        default: 'active',
    },
}, {
    timestamps: true,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;