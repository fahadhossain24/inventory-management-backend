const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'supplier name is required'],
        lowercase: true
    },
    email: {
        type: String,
        trim: true, 
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        unique: true,
        required: [true, 'supplier email is required']
    },
    brand: {
        name: {
            type: String,
            trim: true,
            requied: [true, 'supplier brand is required'],
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: [true, 'supplier brand id required'],
        }
    },
    contactNumber: {
        type: String,
        required: [true, 'supplier contact number is required'],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: 'Please provide a valid phone number',
        },
    },
    emergencyContactNumber: {
        type: String,
        required: [true, 'supplier emargence contact number is required'],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: 'Please provide a valid emargency contact number',
        }
    },
    tradeLicenceNumber: {
        type: String,
        required: [true, 'supplier trand licence number is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'supplier present Address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'supplier permanent address is required'],
    },
    location: {
        type: String,
        required: [true, 'supplier location is required'],
        lowercase: true,
        enum: {
            values: ['dhaka', 'chattogram', 'rajshahi', 'barisal', 'rangpur', 'khulna', 'sylhet', 'mymansing'],
        },
        message: '{VALUE} cant be location',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
}, {
    timestamps: true,
})

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;