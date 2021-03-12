const express = require("express");
const mongoose = require("mongoose");


// Morgan is a middleware that logs the requests to the server to the console. 
const logger = require("morgan");


const routes = require("./routes");
const app = express();

// Creates logger instance via morgan package above. 
app.use(logger("dev"));

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// The code below was provided - I used the above line to get all the routes instead. 
// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Use mongoose to connect to Mongodb locally. 
// Set useNewUrlParser:true to use new URL parser; versus using the the default parser which is going to be deprecated soon.
// Set useFindAndModify:false to use findOneAndUpdate(), findOneAndReplace, and findOneAndDelete().
// Set useUnifiedTopology:true to use the new Server discover and monitoring engine, otherwise it will use default version which will be deprecated soon.
// Set useCreateIndex: true to opt in to making Mongoose use createIndex() instead. By default, Mongoose 5.x calls the MongoDB driver's ensureIndex() function. The MongoDB driver deprecated this function in favor of createIndex().
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/requestapp", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
