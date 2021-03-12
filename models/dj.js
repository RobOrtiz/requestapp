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

    // Don't need username or password fields in Dj Event - as the passport local mongoose created the username  (see below).
    username: {
        type: String,
        unique: true,
        required: "Email required"
        // match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    password: {
        type: String,
        trim: true,
        // required: "Password is required",
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

// Dj model method using passport local mongoose to use username and password from Dj signup form to 
// generate hash and salt documents fields in the Dj document on the MongoDb. The username and hash and
// salt fields are added to the DB via passport local mongoose. 
// Because we are using this authenication method we do not need a username and password field in the Dj model.
// djSchema.plugin(passportLocalMongoose);

const Dj = mongoose.model("Dj", djSchema);

module.exports = Dj;