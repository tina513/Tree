const mongoose = require('mongoose');

const NodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number, 
        min: 1,
        max: 15,
        required: true
    },
    lower: {
        type: Number,
        required: true
    },
    higher: {
        type: Number,
        required: true
    },
    children: []
});

const Node = module.exports = mongoose.model('Node', NodeSchema);