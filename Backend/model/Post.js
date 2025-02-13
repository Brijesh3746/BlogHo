// // models/Post.js
// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     // author: { type: String, required: false },
// }, { timestamps: true });

// module.exports = mongoose.model("Post", PostSchema);
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
