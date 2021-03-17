import axios from "axios";

export default {
  createDj: function (djData) {
    return axios.post("/api/djs", djData)
  },
  createEvent: function (eventData) {
    return axios.post("/api/djs/event", eventData)
  },
  createRequest: function (requestData) {
    return axios.put("/api/djs/event", requestData)
  },

  // This is for checking if a logged in dj has a profile created.
  getDj: function (data) {
    return axios.get("/api/djs/?userSub=" + data)
  },
  getAllDjs: function () {
    return axios.get("/api/djs/all")
  },
  getActivatedEvent: function (id) {
    return axios.get("/api/djs/event/" + id)
  },

  updateRequest: function (songData) {
    console.log("This is the songId inside Axios")
    console.log(songData.songId);
    console.log("This is the newSongStatus inside Axios")
    console.log(songData.newSongStatus);
    return axios.put("/api/djs/requests", songData)
  },

  // Cloudinary API to upload image to their server and return a URL linking to the image for reference in Dj Profile and Dj Event.
  uploadImage: function (imageData) {
    return axios.post("https://api.cloudinary.com/v1_1/noimgmt/image/upload", imageData)
  }
};
