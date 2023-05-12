const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

// model
const heroModel = require("../models/heroModel");

var database =
    "mongodb+srv://FbBackEndAdmin:1234@fbbackendcluster.7wruoa6.mongodb.net/MLBB";

router.get("/", async (req, res) => {
    try {
        const heroesData = await heroModel.find();
        // console.log(heroesData);
        return res.status(200).json(heroesData);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const heroInfo = await heroModel.findById(id);
        // console.log(heroInfo);
        return res.status(200).json(heroInfo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
