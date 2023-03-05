const mongoose = require('mongoose');
const user = mongoose.model(
    'users',
    new mongoose.Schema(
        {
            // _id: Object,
            name: String,
            username: {
                type:String,
                unique:true,
            },
            password: {
                type:String,
                
            },
            email: String,
            phone: Number,
            address: Object,
        }
    )
)

module.exports = user