import API from "../utils/API";

// This function is run on all dj pages. It checks to see if the logged in user
// already has an existing dj profile
// If not, it redirects to the signup page
function checkIfProfileExists(id) {

  API.getDj(id)
    .then(function (res) {
      if (res.data.length >= 1) {
        console.log("exists")
      } else {
        window.location.replace("/dj/signup");
      }
    })
    .catch((err) => console.log(err));
}

export default checkIfProfileExists;