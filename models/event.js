const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({

    _id: {
        type: String
    },

    eventStatus: {
        type: String,
        enum: ['activated', 'deactivated', 'end'],
        default: "deactivated"
    },

    genre: {
        type: String,
        trim: true,
        // required: "Genre is required"
    },

    eventDate: {
        type: Date,
        // required: "Date of event is required"
    },

    startTime: {
        type: String,
        // required: "Start time of event is required"
    },

    endTime: {
        type: String,
        // required: "End time of event is required"
    },

    eventName: {
        type: String,
        trim: true,
        // required: "Name of event is required"
    },

    eventType: {
        type: String,
        trim: true,
        // required: "Type of event is required"
    },

    venueName: {
        type: String,
        trim: true,
        // required: "Venue name is required"
    },

    venueAddress: {
        type: String,
        trim: true,
        // required: "Street address is required"
    },

    // Place to hold url string that will be generate via an API call to link uploaded image (from Event during Event creation) to an url.
    eventImage: {
        type: String
    },

    requestList: [
        {
            albumCover: { type: String },
            title: { type: String },
            artist: { type: String },
            tip: { type: Number },
            generalRequest: { type: Boolean },
            playNow: { type: Boolean },
            songStatus: { type: String },
            customerName: { type: String },
        },
        { timestamps: true }
    ],

    //Originally created 3 separate lists. Switched to one requestList with a songStatus
    //determining where the song is at in the request flow: requested, accepted or declined, in the queue (can be removed), played...    //We can place the songs in the appropriate section based on their songStatus. 
    //As the requested song gets moved around we update the songStatus field.
    //Keeping the playQueue and songActivity lists commented out until we decided which way to manage songs.
    // playQueue: [
    //     {
    //         albumCover: {type:String},
    //         title: {type:String},
    //         artist: {type:String},
    //         tip: {type:Number},
    //         requestType: {type:String},
    //     }
    // ],

    // songActivity: [
    //     {
    //         albumCover: {type:String},
    //         title: {type:String},
    //         artist: {type:String},
    //         tip: {type:Number},
    //         requestType: {type:String},
    //         songStatus: {type:String}
    //     }
    // ],



});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;