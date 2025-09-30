const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
    },

    mobileNumber: {
        type: Number,
        require: true,
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/dx5nhetqj/image/upload/v1748070595/n1elrqsvnxyr4po67pk9.png"
    },

    userType: {
        type: String,
        default: "user"
    },

}, { timestamps: true });

const User = model("user", userSchema);
module.exports = User