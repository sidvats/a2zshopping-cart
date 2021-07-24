const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productSchema = new schema({
    name:
    {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    availibility: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('product',productSchema);