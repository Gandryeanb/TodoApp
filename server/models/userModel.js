const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type : String,
        required : [true, 'first name is empty']
    },
    lName: {
        type : String,
        default : null
    },
    phone : {
        type : String,
        unique : [true, 'phone already taken'],
        required : [true, 'phone is empty']
    },
    email: {
        type : String,
        unique : [true, 'email already taken'],
        required : [true, 'email is empty']
    },
    password: {
        type : String,
        default : null,
        required : [true, 'password is empty']
    },
    facebookLogin : {
        type :Number,
        default : 0
    },
    googleLogin : {
        type :Number,
        default : 0
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User