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
        events: ["1001"],
        fullName: "Robert Ortiz",
        djName: "DJ Rffirmativ",
        hometown: "San Diego",
        djStyle: "Hip Hop",
        username: "test",
        salt: "aa8d173770099315602b46708a7423adb4db0d451215f37a3fcedc13237c6236",
        hash: "dc9c5e25f3bd8af6f8aab4725f3aa63d13f28d829a4870ea007e406a8b067df4b1d5f05b6d27ff05df2bd65de67428b0954ce7614e4b1007510c26de2d3003878533fc1200b75d9e37319cbeb682a179d9e98fc3c57e9e7f4e79acd4a489bdf29f8e4a8d452927f1ebd23aa7f185d07fbdf344a8ad72b6d1264c5e943433c2089bd0458171ce92cb0192cb28cf9962c231edd7977bd0bd01e1994cdbf1c9ea6f4d9f41d18b2f45fac42ab95e0e7d96d2e5bcafd8c9cdd09ddbb071aa3069b0e43d5b88a5c4618d1119e6f35f2488b62225ee4fe230aaf4cb33e870987d331ad7af3406c5d54f03c46ee355c1406ae35e024922f48e16ebc07eac905c20f7cbb4bab4042a5850f89a5eb5993c95a503f4fb53bf4ff8ec5870be78eeb922dcc5ede10342a61d38469178725dfcfed8cf8d1b53b3811a07851f7fa3ae4b76552fdc6ad06a3e41c4c2a181709d0138fd65e1f30d40f48311a2d7f2873c7171cf72f06da1f22feb8e9ed273705124eda2a0490a6ae95cfb71dfbbefc2a0625dcb5fdaf3565d892c87a2aa4adad550259bd2c819940bb0955313af4be597959a244aa64842189eeb1ccbe44e351f242b1d99c487836ecf199cb08b5c10bf1c019c79eb1dc54c1a303ecc3ad37df4e7af87bebe03abfa2de552cad23923e4a8370379ca9d7122717f39d5e8cf0d5417fa866eae3bd489f1da83a3b199cedd82b58c89fc",
        __v: 0
    },

    {
        events: ["1002"],
        fullName: "Charles Robinson",
        djName: "DJ Chucky-D",
        hometown: "Columbus",
        djStyle: "Line Dancing",
        username: "cr@gmail.com",
        instagram: "@prouddaddaof2",
        salt: "aa8d173770099315602b46708a7423adb4db0d451215f37a3fcedc13237c6236",
        hash: "dc9c5e25f3bd8af6f8aab4725f3aa63d13f28d829a4870ea007e406a8b067df4b1d5f05b6d27ff05df2bd65de67428b0954ce7614e4b1007510c26de2d3003878533fc1200b75d9e37319cbeb682a179d9e98fc3c57e9e7f4e79acd4a489bdf29f8e4a8d452927f1ebd23aa7f185d07fbdf344a8ad72b6d1264c5e943433c2089bd0458171ce92cb0192cb28cf9962c231edd7977bd0bd01e1994cdbf1c9ea6f4d9f41d18b2f45fac42ab95e0e7d96d2e5bcafd8c9cdd09ddbb071aa3069b0e43d5b88a5c4618d1119e6f35f2488b62225ee4fe230aaf4cb33e870987d331ad7af3406c5d54f03c46ee355c1406ae35e024922f48e16ebc07eac905c20f7cbb4bab4042a5850f89a5eb5993c95a503f4fb53bf4ff8ec5870be78eeb922dcc5ede10342a61d38469178725dfcfed8cf8d1b53b3811a07851f7fa3ae4b76552fdc6ad06a3e41c4c2a181709d0138fd65e1f30d40f48311a2d7f2873c7171cf72f06da1f22feb8e9ed273705124eda2a0490a6ae95cfb71dfbbefc2a0625dcb5fdaf3565d892c87a2aa4adad550259bd2c819940bb0955313af4be597959a244aa64842189eeb1ccbe44e351f242b1d99c487836ecf199cb08b5c10bf1c019c79eb1dc54c1a303ecc3ad37df4e7af87bebe03abfa2de552cad23923e4a8370379ca9d7122717f39d5e8cf0d5417fa866eae3bd489f1da83a3b199cedd82b58c89fc",
        __v: 0
    },

    {
        events: ["1003"],
        fullName: "Christina Shiroma",
        djName: "DJ Smooth Coder",
        hometown: "San Diego",
        djStyle: "Smooth Jazz",
        username: "cs@gmail.com",
        instagram: "@nobodysmootherthani",
        salt: "aa8d173770099315602b46708a7423adb4db0d451215f37a3fcedc13237c6236",
        hash: "dc9c5e25f3bd8af6f8aab4725f3aa63d13f28d829a4870ea007e406a8b067df4b1d5f05b6d27ff05df2bd65de67428b0954ce7614e4b1007510c26de2d3003878533fc1200b75d9e37319cbeb682a179d9e98fc3c57e9e7f4e79acd4a489bdf29f8e4a8d452927f1ebd23aa7f185d07fbdf344a8ad72b6d1264c5e943433c2089bd0458171ce92cb0192cb28cf9962c231edd7977bd0bd01e1994cdbf1c9ea6f4d9f41d18b2f45fac42ab95e0e7d96d2e5bcafd8c9cdd09ddbb071aa3069b0e43d5b88a5c4618d1119e6f35f2488b62225ee4fe230aaf4cb33e870987d331ad7af3406c5d54f03c46ee355c1406ae35e024922f48e16ebc07eac905c20f7cbb4bab4042a5850f89a5eb5993c95a503f4fb53bf4ff8ec5870be78eeb922dcc5ede10342a61d38469178725dfcfed8cf8d1b53b3811a07851f7fa3ae4b76552fdc6ad06a3e41c4c2a181709d0138fd65e1f30d40f48311a2d7f2873c7171cf72f06da1f22feb8e9ed273705124eda2a0490a6ae95cfb71dfbbefc2a0625dcb5fdaf3565d892c87a2aa4adad550259bd2c819940bb0955313af4be597959a244aa64842189eeb1ccbe44e351f242b1d99c487836ecf199cb08b5c10bf1c019c79eb1dc54c1a303ecc3ad37df4e7af87bebe03abfa2de552cad23923e4a8370379ca9d7122717f39d5e8cf0d5417fa866eae3bd489f1da83a3b199cedd82b58c89fc",
        __v: 0
    },

    {
        events: ["1004"],
        fullName: "Brian Parker",
        djName: "DJ On the Rise",
        hometown: "San Francisco",
        djStyle: "Alternative Rock",
        username: "bp@gmail.com",
        instagram: "@stopmenow",
        salt: "aa8d173770099315602b46708a7423adb4db0d451215f37a3fcedc13237c6236",
        hash: "dc9c5e25f3bd8af6f8aab4725f3aa63d13f28d829a4870ea007e406a8b067df4b1d5f05b6d27ff05df2bd65de67428b0954ce7614e4b1007510c26de2d3003878533fc1200b75d9e37319cbeb682a179d9e98fc3c57e9e7f4e79acd4a489bdf29f8e4a8d452927f1ebd23aa7f185d07fbdf344a8ad72b6d1264c5e943433c2089bd0458171ce92cb0192cb28cf9962c231edd7977bd0bd01e1994cdbf1c9ea6f4d9f41d18b2f45fac42ab95e0e7d96d2e5bcafd8c9cdd09ddbb071aa3069b0e43d5b88a5c4618d1119e6f35f2488b62225ee4fe230aaf4cb33e870987d331ad7af3406c5d54f03c46ee355c1406ae35e024922f48e16ebc07eac905c20f7cbb4bab4042a5850f89a5eb5993c95a503f4fb53bf4ff8ec5870be78eeb922dcc5ede10342a61d38469178725dfcfed8cf8d1b53b3811a07851f7fa3ae4b76552fdc6ad06a3e41c4c2a181709d0138fd65e1f30d40f48311a2d7f2873c7171cf72f06da1f22feb8e9ed273705124eda2a0490a6ae95cfb71dfbbefc2a0625dcb5fdaf3565d892c87a2aa4adad550259bd2c819940bb0955313af4be597959a244aa64842189eeb1ccbe44e351f242b1d99c487836ecf199cb08b5c10bf1c019c79eb1dc54c1a303ecc3ad37df4e7af87bebe03abfa2de552cad23923e4a8370379ca9d7122717f39d5e8cf0d5417fa866eae3bd489f1da83a3b199cedd82b58c89fc",
        __v: 0
    }
];

// Will update event seed when the time is right.
let eventSeed = [

    {
        _id: "1001",
        genre: "Hip Hop",
        eventDate: "04/10/2021",
        startTime: "6:00pm",
        endTime: "9:00pm",
        eventName: "Garcia Wedding",
        eventType: "Wedding",
        venueName: "Lakeshore Golf Club",
        streetAddres: "980 Poppy Lane",
        city: "Arcadia",
        state: "CA",
        zipCode: 92001,
        requestList: [
            {
                albumCover: "https://m.media-amazon.com/images/I/91UEL9iy26L._SS500_.jpg",
                title: "Peachs & Cream",
                artist: "112",
                tip: "50",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/09e17c505c3a4927ba8ce1b264a41b4d.591x591x1.jpg",
                title: "Nice & Slow",
                artist: "Usher",
                tip: "20",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/SystemofaDownToxicityalbumcover.jpg/220px-SystemofaDownToxicityalbumcover.jpg",
                title: "Chop Suey",
                artist: "System of a Down",
                tip: "80",
                requestType: "Play Now",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/ab83a150f63f5f738331a172cac6c71e.1000x1000x1.jpg",
                title: "No Diggity",
                artist: "Blackstreet",
                tip: "30",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/81Bgxu0puGL._SX522_.jpg",
                title: "Nobody",
                artist: "Keith Sweat",
                tip: "30",
                requestType: "Play Now",
                songStatus: "Played"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/71F%2BUbSwXeL._SX522_.jpg",
                title: "Jump",
                artist: "Kris Kross",
                tip: "10",
                requestType: "General Request",
                songStatus: "Rejected"
            }
        ],
    },

    {
        _id: "1002",
        genre: "Country Line Dancing",
        eventDate: "06/10/2021",
        startTime: "6:00pm",
        endTime: "9:00pm",
        eventName: "Henry Grad Party",
        eventType: "Graduation Party",
        venueName: "VA Westinghouse Club",
        streetAddres: "9876 Shoelace Lane",
        city: "Los Angeles",
        state: "CA",
        zipCode: 94002,
        requestList: [
            {
                albumCover: "https://m.media-amazon.com/images/I/91UEL9iy26L._SS500_.jpg",
                title: "Peachs & Cream",
                artist: "112",
                tip: "50",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/09e17c505c3a4927ba8ce1b264a41b4d.591x591x1.jpg",
                title: "Nice & Slow",
                artist: "Usher",
                tip: "20",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/SystemofaDownToxicityalbumcover.jpg/220px-SystemofaDownToxicityalbumcover.jpg",
                title: "Chop Suey",
                artist: "System of a Down",
                tip: "80",
                requestType: "Play Now",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/ab83a150f63f5f738331a172cac6c71e.1000x1000x1.jpg",
                title: "No Diggity",
                artist: "Blackstreet",
                tip: "30",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/81Bgxu0puGL._SX522_.jpg",
                title: "Nobody",
                artist: "Keith Sweat",
                tip: "30",
                requestType: "Play Now",
                songStatus: "Played"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/71F%2BUbSwXeL._SX522_.jpg",
                title: "Jump",
                artist: "Kris Kross",
                tip: "10",
                requestType: "General Request",
                songStatus: "Rejected"
            }
        ],
    },

    {
        _id: "1003",
        genre: "Jazz",
        eventDate: "07/10/2021",
        startTime: "12:00pm",
        endTime: "1:00pm",
        eventName: "Jones Retirement Party",
        eventType: "Retirement Party",
        venueName: "Live Jazz Club House",
        streetAddres: "5412 Airhorn Drive",
        city: "San Diego",
        state: "CA",
        zipCode: 92034,
        requestList: [
            {
                albumCover: "https://m.media-amazon.com/images/I/91UEL9iy26L._SS500_.jpg",
                title: "Peachs & Cream",
                artist: "112",
                tip: "50",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/09e17c505c3a4927ba8ce1b264a41b4d.591x591x1.jpg",
                title: "Nice & Slow",
                artist: "Usher",
                tip: "20",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/SystemofaDownToxicityalbumcover.jpg/220px-SystemofaDownToxicityalbumcover.jpg",
                title: "Chop Suey",
                artist: "System of a Down",
                tip: "80",
                requestType: "Play Now",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/ab83a150f63f5f738331a172cac6c71e.1000x1000x1.jpg",
                title: "No Diggity",
                artist: "Blackstreet",
                tip: "30",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/81Bgxu0puGL._SX522_.jpg",
                title: "Nobody",
                artist: "Keith Sweat",
                tip: "30",
                requestType: "Play Now",
                songStatus: "Played"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/71F%2BUbSwXeL._SX522_.jpg",
                title: "Jump",
                artist: "Kris Kross",
                tip: "10",
                requestType: "General Request",
                songStatus: "Rejected"
            }
        ],
    },

    {
        _id: "1004",
        genre: "Alternative Rock",
        eventDate: "09/10/2021",
        startTime: "8:00pm",
        endTime: "11:00pm",
        eventName: "Davidson Engagement Party",
        eventType: "Engagement Party",
        venueName: "The Palace",
        streetAddres: "4509 Hollywood Blvd.",
        city: "Los Angeles",
        state: "CA",
        zipCode: 94323,
        requestList: [
            {
                albumCover: "https://m.media-amazon.com/images/I/91UEL9iy26L._SS500_.jpg",
                title: "Peachs & Cream",
                artist: "112",
                tip: "50",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://images.genius.com/09e17c505c3a4927ba8ce1b264a41b4d.591x591x1.jpg",
                title: "Nice & Slow",
                artist: "Usher",
                tip: "20",
                requestType: "General Request",
                songStatus: "Requested"
            },
            {
                albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/SystemofaDownToxicityalbumcover.jpg/220px-SystemofaDownToxicityalbumcover.jpg",
                title: "Chop Suey",
                artist: "System of a Down",
                tip: "80",
                requestType: "Play Now",
                songStatus: "In the Queue"
            },
            {
                albumCover: "https://images.genius.com/ab83a150f63f5f738331a172cac6c71e.1000x1000x1.jpg",
                title: "No Diggity",
                artist: "Blackstreet",
                tip: "30",
                requestType: "General Request",
                songStatus: "In the Queue"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/81Bgxu0puGL._SX522_.jpg",
                title: "Nobody",
                artist: "Keith Sweat",
                tip: "30",
                requestType: "Play Now",
                songStatus: "Played"
            },
            {
                albumCover: "https://images-na.ssl-images-amazon.com/images/I/71F%2BUbSwXeL._SX522_.jpg",
                title: "Jump",
                artist: "Kris Kross",
                tip: "10",
                requestType: "General Request",
                songStatus: "Rejected"
            }
        ],
    }
];

db.Event
    .deleteMany({})
    .then(() => db.Event.collection.insertMany(eventSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

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

