import axios from "axios";

export default {
  createDj: function(djData) {
    return axios.post("/api/djs", djData)
  },
  createEvent: function(eventData) {
    return axios.post("/api/djs/event", eventData)
  },
  createRequest: function(requestData) {
    return axios.put("/api/djs/event", requestData)
  },
  // This is for checking if a logged in dj has a profile created.
  getDj: function(data) {
    return axios.get("/api/djs/?userSub=" + data)
  },

  getRequests: function(id) {
    return axios.get("/api/djs/event/" + id)
  },
  // getDj: function(data) {
  //   return axios.get("/api/djs", data)
  // },
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
