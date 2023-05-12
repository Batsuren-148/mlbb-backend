const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            // required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
