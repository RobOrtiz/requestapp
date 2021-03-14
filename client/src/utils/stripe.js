import axios from "axios";

export default {
    checkout: function(token, product) {
        return axios.post("/stripe/checkout", {
            token,
            product
        })
    }
    // createAccount: function() {
    //     return axios.post("/stripe/onboard-user")
    // }
}