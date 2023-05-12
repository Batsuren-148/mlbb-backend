const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const router = express.Router();
// ? Model
const User = require("../models/User");

router.get("/", (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", { err: error });
});

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({ email });
        // console.log(user);

        if (user) {
            res.status(404);
            req.session.error = "User already exists";
            console.log("hereglegch ali hediinee bvrtgegdsen bna");
            return res.status(400).json({ error: "User already registered" });
            // return res.redirect("/register");
        } else {
            // const hasdPsw = await bcrypt.hash(password, 12);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                username,
                email,
                password: hashedPassword,
            });
            console.log("shineer hereglegch newlee");

            await user.save();
            res.redirect("/login");
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
