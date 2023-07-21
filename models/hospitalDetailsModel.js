const mongoose = require("mongoose");

const hospitalDetailsSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    hospitalAddress: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

const hospitaldetails = mongoose.model("hospitaldetails", hospitalDetailsSchema);

module.exports = hospitaldetails;