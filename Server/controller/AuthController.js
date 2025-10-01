const generateToken = require("../config/GenerateToken");
const User = require("../model/UserModel");

const SignUp = async (req, res) => {
    try {
        const { fullname, email, password, mobile } = req.body;

        const findEmail = await User.findOne({ email });
        if (findEmail) {
            return res.status(500).json({
                success: false,
                message: "This Email Already Exists..."
            })
        }

        if (password.length < 6) {
            return res.status(500).json({
                success: false,
                message: "Password Length Must Be 6 Character..."
            })
        }

        const newUser = await User.create({ fullName: fullname, email, password, mobileNumber: mobile });

        const token = await generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true,   
        });

        return res.status(200).json({
            success: true,
            message: "Signup Successfull...",
            user: newUser
        })
    }

    catch (err) {
        console.log("Signup Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        const findEmail = await User.findOne({ email });
        if (!findEmail) {
            return res.status(500).json({
                success: false,
                message: "This User Does Not Exists..."
            })
        }

        if (password != findEmail.password) {
            return res.status(500).json({
                success: false,
                message: "Incorrect Password..."
            })
        }

        const token = await generateToken(findEmail._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true,   
        });


        return res.status(200).json({
            success: true,
            message: "Login Successfull...",
            user: findEmail
        })
    }

    catch (err) {
        console.log("Login Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const Logout = async (req, res) => {
    try {
        res.clearCookie("token");   // removes cookie

        return res.status(200).json({
            success: true,
            message: "Logout Successfull...",
        })
    }

    catch (err) {
        console.log("Logout Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = { SignUp, Login, Logout };