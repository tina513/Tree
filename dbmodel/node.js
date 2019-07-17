const mongoose = require('mongoose');

const NodeSchema = mongoose.Schema({
    name: String,
    count: Number,
    lower: Number,
    higher: Number,
    children: []
});

const Node = module.exports = mongoose.model('Node', NodeSchema);