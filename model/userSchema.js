const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxLength: [20, 'Your first is too long'],
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: [20, 'Your last name is too long'],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: function(value){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            },
            message: 'Email is invalid'
        },
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        unique: true,
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowerCase: 1,
                    minUpperCase: 1,
                    minNumbers: 1,
                    minSymbol: 1,
                })
            },
            message: 'Password must contain at-least 6 charecter, minimum 1 lowercase, 1 uppercase, 1 numbers and 1 symbols',
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'modarator'],
        default: 'user'
    },
    
    address: String,
    contactNumber: {
        type: String,
        trim: true,
        validate: [validator.isMobilePhone, 'Mobile phone number is not valid'],
    },
    imgUrl: {
        type: String,
        validate: [validator.isURL, 'This is not valid url'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'inactive',
    },

    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    timestamps: true,
}
)


// this middleware will do hashed password for saved in mongodb before create user. it's mongoose middleware

userSchema.pre('save', function(next){
    const hashedPassword = bcrypt.hashSync(this.password, 10)
    this.password = hashedPassword;
    next();
})

// compare password methods. this is my custom method

userSchema.methods.comparePass = function(planPassword, hashPassword){
    const isValidPassword = bcrypt.compareSync(planPassword, hashPassword);
    return isValidPassword;
}

userSchema.methods.emailConfirmationToken = function(){
    const token = crypto.randomBytes(32).toString('hex');
    this.confirmationToken = token;
    const date = new Date();
    date.setDate(date.getDate() + 1)
    this.confirmationTokenExpires = date;
    return token;
}


const User = mongoose.model('user', userSchema);

module.exports = User;