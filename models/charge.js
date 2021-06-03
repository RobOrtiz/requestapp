const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chargeSchema = new Schema({

    djId: {
        type: String,
        trim: true,
    },

    songId: {
        type: String,
        trim: true,
    },

    paymentIntentId: {
        type: String,
        trim: true,
    },

    paymentStatus: {
        type: String,
        trim: true,
    }
});

const Charge = mongoose.model("Charge", chargeSchema);

module.exports = Charge;