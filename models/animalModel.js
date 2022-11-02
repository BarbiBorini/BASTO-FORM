const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    ID_senasa: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: false
    },
    paddock_name: {
        type: String,
        required: true,
        trim: false
    },
    device_type: {
        type: String,
        required: true,
        trim: true
    },
    device_num: {
        type: String,
        required: true
    },
}, {
    timestamps: false
});

module.exports = mongoose.model("Animal", animalSchema);