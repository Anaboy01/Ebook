const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email:{
        type: String,
        required: [true, "please add an email"],
        trim: true,
    },
    isAdmin: {
        type: Boolean,
    },
    password: {
        type: String,
        required:[true, "Please add a password"],
    },
     name: {
        type: String,
        required: true,
    },
    cartList: {
        type: Array,
    },
    orderList:{
        type: Array,
    }
});

module.exports = mongoose.model('User', userSchema);