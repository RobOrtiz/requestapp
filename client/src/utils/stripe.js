import axios from "axios";

export default {
    checkout: function(product) {
        return axios.post("/stripe/checkout", {
            product
        })
    },
    successData: function(sessionId) {
        return axios.post("/stripe/success", {
            sessionId
        })
    }
    // createAccount: function() {
    //     return axios.post("/stripe/onboard-user")
    // }
}