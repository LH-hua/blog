const mongoose = require('mongoose');
const user = mongoose.model(
    'users',
    new mongoose.Schema(
        {
            _id: Object,
            name: String,
            username: String,
            password: String,
            email: String,
            phone: Number,
            address: Object,
        }
    )
)

module.exports = user