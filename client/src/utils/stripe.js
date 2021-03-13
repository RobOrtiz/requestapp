import axios from "axios";

export default {
    checkout: function(token, product) {
        return axios.post("/checkout", {
            token,
            product
        })
    }
}