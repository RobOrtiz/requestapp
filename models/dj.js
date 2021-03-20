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

    djStyle: {
        type: String,
        trim: true,
        required: "Dj style is required"
    },

    email: {
        type: String,
        // unique: true,
        required: "Email required"
        // match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    instagram: {
        type: String,
        trim: true,
        required: "Instagram handle is required",
    },

    // Place to hold url string that will be generate via an API call to link uploaded image (from Dj during Dj signup) to an url.
    profileImage: {
        type: String
    },

    userSub: {
        type: String
    },

    events: [
        {
          type: String,
          ref: "Event"
        }
    ]
});

const Dj = mongoose.model("Dj", djSchema);

module.exports = Dj;