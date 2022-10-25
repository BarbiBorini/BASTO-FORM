const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    ID_senasa: {
        type: String,
        required: [true, "Es necesario indicar el ID SENASA."],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Por favor indique si es vaquillona, toro o novillo."],
        trim: true
    },
    weight: {
        type: Number,
        required: false
    },
    paddock_name: {
        type: String,
        required: [true, "Es necesario indicar el nombre del potrero."],
        trim: false
    },
    device_type: {
        type: String,
        required: [true, "Inidcar si el dispositivo es collar o caravana."],
        trim: true
    },
    device_num: {
        type: String,
        required: [true, "Inidcar el numero de dispositivo."]
    },
}, {
    timestamps: false
});

module.exports = mongoose.model("Animal", animalSchema);