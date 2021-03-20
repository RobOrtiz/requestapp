import API from "./API";

// Created Helper functions to selectImage to upload and to uploadImage to Cloudinary.
// Created Helper functions because they will be used more than once, by the Dj upload profile image and the Event upload event image.

const Helpers = {

    // Helper function to change state of selectedFile to the file that the user chooses to upload.
    selectImage: async (event, setSelectedFile, setInvalidImage) => {
        // setSelectedFile(event.target.files[0]);
        const imageFile = event.target.files[0];

        if (!imageFile) {
            setInvalidImage('Please select image.');
            return false;
          }
 
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          setInvalidImage('Please select valid image type: jpg,jpeg,png,gif.');
          setSelectedFile("");
          return false;
        }
        else {
            setInvalidImage('');
            setSelectedFile(event.target.files[0]);
        }
    },

    // Helper function to upload the selectedFile to Cloudinary via their API once the user clicks on the upload image button.
    // The Cloudinary API will return an object that contains the profile image URL that we can attach to the the Dj document.
    // You access the URL via the secure_url field in the data object returned from Cloudinary.
    // The Cloudinary account is currently setup under Charles' information.
    // We are passing in the following parameters: event (when the user clicks the upload button), and the following states
    // selectedFile state, setLoading state, and setImage state. 
    // Ideally you don't want to pass in so many parameters. For the time being this works. 
    // In here we create the new FormData() which includes the selectedFile to upload and the Cloudinary settings for the API ==> upload_preset and bxqprejb.
    // The Cloudinary API call in called here vai the API.uploadImage, the API is located in the API file in the utils folder.
    uploadImage: (event, selectedFile, setLoading, setImage) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('upload_preset', 'bxqprejb')
        API.uploadImage(data)
            .then(res => {
                const file = res.data;
                console.log(file);
                setImage(file.secure_url);
                setLoading(false);
            })
            .catch(err => console.log(err));

    }

}

export default Helpers;