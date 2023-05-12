const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const colors = require("colors");
const router = express.Router();
const jwt = require("jsonwebtoken");

// ? Model
const User = require("../models/User");

const secretKey = "mySecretKey";

router.get("/", (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    //   res.render("login", { err: error });
    res.render(path.join(__dirname, "../views/login.ejs"), { err: error });
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            req.session.error = "User not found";
            console.log("User not found".red);
            // return res.redirect("/login");
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch, password, user.password);

        if (!isMatch) {
            req.session.error = "Password is not matched";
            // return res.redirect("/login");
            return res.status(400).json({ error: "Password is not matched" });
        }

        // user id
        const loggedUserId = user._id;
        console.log("Logged user ID: ".yellow + loggedUserId);

        // session deer hadgalj bga
        req.session.profile = user.profile;
        req.session.username = user.username;
        req.session.userId = loggedUserId;
        req.session.isAuth = true;
        req.session.username = user.username;
        // res.redirect("/");
        // Return success message and user data
        const userData = {
            id: loggedUserId,
            email: user.email,
            username: user.username,
            profile: user.profile,
        };

        const tokenOptions = {
            expiresIn: "1h", // Set the expiration time to 1 hour from now
        };

        const token = jwt.sign(userData, secretKey, tokenOptions);

        const decodedToken = jwt.decode(token);
        const expirationTime = decodedToken.exp * 1000; // convert from seconds to milliseconds
        const currentTime = new Date().getTime();
        const expiresIn = expirationTime - currentTime;

        console.log(token);

        return res.status(200).json({
            success: "Login successful",
            token,
            userData,
            expiresIn,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
