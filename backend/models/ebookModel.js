const mongoose = require("mongoose");

const eBookSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
    },
    long_description: {
        type: String,
    },
    price:{
        type: String,
    },
    poster: {
        type: String,
    },
    rating: {
        type: Number,
    },
    in_stock: {
        type: Boolean,
    },
    size: {
        type: Number,
    },
    best_seller: {
        type: Boolean,
    }

})

module.exports = mongoose.model('EBook', userSchema);