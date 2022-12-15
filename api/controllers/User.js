const User = require("../models/User");

module.exports = {
    postUser: (req, res) => {
        res.status(200).json({
            message: "Saved user!"
        })
    },

    patchUser: (req, res) => {
        res.status(200).json({
            message: "Updated user!"
        })
    }
};
