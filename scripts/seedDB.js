const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/requestapp", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

let djSeed = [

    {
        fullName: "Robert Ortiz",
        djName: "DJ Rffirmativ",
        hometown: "San Diego",
        djStyle:"Hip Hop",
        email: "djrffirmativ@gmail.com",
        password: "aztec4life",
        instagram: "@nobetterdjthani"
    },

    {
        fullName: "Charles Robinson",
        djName: "DJ Chucky-D",
        hometown: "Columbus",
        djStyle: "onbeat",
        email: "cdr@gmail.com",
        password: "buckeyeandaztec4life",
        instagram: "@prouddaddaof2"
    },

    {
        fullName: "Christina Shiroma",
        djName: "DJ Smooth Coder",
        hometown: "San Diego",
        djStyle:"Smooth Jazz",
        email: "smoothcoder@gmail.com",
        password: "smoothcoder",
        instagram: "@nobodysmootherthani"
    },

    {
        fullName: "Brian Parker",
        djName: "DJ On the Rise",
        hometown: "San Francisco",
        djStyle:"Alternative Rock",
        email: "djontherise@gmail.com",
        password: "stopmenow",
        instagram: "@stopmenow"
    },

    {
        fullName: "Jenny Johnson",
        djName: "Spining JJ",
        hometown: "Los Angeles",
        djStyle:"offbeat",
        email: "jj@gmail.com",
        password: "spinninglife",
        instagram: "@spin4life"
    }

];

// Will update event seed when the time is right.
// let eventSeed = [

//     {
//         genre: "Hip Hop",
//         eventDate: "10/10/2021",
//         eventName: "Garcia Wedding",
//         eventType: "Wedding",
//         venueName:"Lakeshore Golf Club",
//         streetAddres: "980 Poppy Lane",
//         city: "Arcadia",
//         state: "CA",
//         zipCode: 92001
//     },

//     {
//         genre: "Country Line Dancing",
//         eventDate: "12/10/2021",
//         eventName: "Henry Grad Party",
//         eventType: "Graduation Party",
//         venueName:"VA Westinghouse Club",
//         streetAddres: "9876 Shoelace Lane",
//         city: "Los Angeles",
//         state: "CA",
//         zipCode: 94002
//     }
// ];

db.Dj
    .deleteMany({})
    .then(() => db.Dj.collection.insertMany(djSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
