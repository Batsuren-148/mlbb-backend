const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const colors = require("colors");
console.log(db);
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });

        console.log("MongoDB холбогдлоо".bgBlack.bold);
    } catch (error) {
        console.log(
            "Something went wrong with Database connection".bgBlack.bold
        );
        process.exit(1);
    }
};

module.exports = connectDB;
