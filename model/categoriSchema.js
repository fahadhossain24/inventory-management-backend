const mongoose = require('mongoose');
const validator = require('validator');

const categoriSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Categori name is required']
    },
    description: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid image url'],
    }
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', categoriSchema);

module.exports = Category;