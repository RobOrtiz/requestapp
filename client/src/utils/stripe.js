import axios from "axios";

export default {
    checkout: function(product) {
        return axios.post("/stripe/checkout", {
            product
        })
    },
    capture: function(chargeData) {
        return axios.post("/stripe/captured", {
            chargeData
        })
    },
    cancel: function(songId) {
        return axios.post("/stripe/cancelled", songId)
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