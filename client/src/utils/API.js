import axios from "axios";

export default {
  createDj: function(djData) {
    return axios.post("/api/djs", djData)
  },
  login: function(credentials) {
    return axios.post("/api/djs/login", credentials)
  },
  createEvent: function(eventData) {
    return axios.post("/api/djs/event", eventData)
  },

  // Cloudinary API to upload image to their server and return a URL linking to the image for reference in Dj Profile and Dj Event.
  uploadImage: function(imageData) {
    return axios.post("https://api.cloudinary.com/v1_1/noimgmt/image/upload", imageData)
  }
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  
};
