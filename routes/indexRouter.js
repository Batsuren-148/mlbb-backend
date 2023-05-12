const express = require("express");
const path = require("path");
const router = express.Router();
// model
// const postModel = require("../models/post");

router.get("/", (req, res) => {
    // const username = req.session.username;
    // const profile = req.session.profile;
    // if (username === undefined) {
    //     console.log("Session expired".red);
    //     res.redirect("/login");
    // } else {
    //     req.session.isAuth = true;
    //     console.log(
    //         " User ".green +
    //             username.rainbow +
    //             " in logged".green +
    //             " Homepage".cyan
    //     );

    //     postModel.find().then((posts) => {
    //         res.render("landing", {
    //             name: username,
    //             profile: profile,
    //             posts: posts,
    //         });
    //     });
    // }
    res.render("index");
});

module.exports = router;
