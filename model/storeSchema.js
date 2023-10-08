const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Store name is required'],
        lowercase: true,
        enum: {
            values: ['Dhaka', 'Chattogram', 'Rajshahi', 'Rangpur', 'Khulna', 'Barisal', 'Sylhet', 'Mymensing'],
            message: '{VALUE} is not a valid name as store name',
        }
    }, 
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: 'User',
        },
    },
}, {
    timestamps: true,
})

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;