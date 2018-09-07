const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: String,
    lName: String,
    email: String,
    password: String
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User