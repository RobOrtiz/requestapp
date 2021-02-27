const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const djSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
        required: "First name is required"
      },
    
      lastName: {
        type: String,
        trim: true,
        required: "Last name is required"
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
      }

});

const Dj = mongoose.model("Dj", djSchema);

module.exports = Dj;