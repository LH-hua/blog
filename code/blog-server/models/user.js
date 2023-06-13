const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
    },
    email: String,
    phone: Number,
    address: Object,
})
module.exports = mongoose.model('users', userSchema)