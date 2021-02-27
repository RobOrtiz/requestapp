const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const djSchema = new Schema({

    fullName: {
        type: String,
        trim: true,
        required: "Name is required"
    },

    djName: {
        type: String,
        trim: true,
        required: "Dj name is required"
    },

    hometown: {
        type: String,
        trim: true,
        required: "Hometown is required"
    },

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    password: {
        type: String,
        trim: true,
        required: "Password is required",
    },

    instagramHandle: {
        type: String,
        trim: true,
        required: "Instagram handle is required",
    }

});

const Dj = mongoose.model("Dj", djSchema);

module.exports = Dj;