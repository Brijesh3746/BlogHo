// const express = require("express");
// const router = express.Router();


// // Import Controller    
// const {dummyController} = require('../controllers/dummyController');
// const {createComment} = require('../controllers/commentController')
// const {createPost, fetchAllPost}  = require("../controllers/postController");
// const {likePost,unlikePost} = require("../controllers/likeController");


// // mapping With Controller
// router.post("/comment/create",createComment);
// router.post('/posts/create', createPost)
// router.get('/posts', fetchAllPost);
// router.post('/likes/like',likePost);
// router.post('/likes/unlike',unlikePost);




// // export 
// module.exports = router;

// routes/blog.js
const express = require("express");
const router = express.Router();
const Post = require("../model/Post"); // Adjust the path to your Post model

const { login, signup } = require("../controllers/Auth");
const auth = require("../middleware/auth");


router.post("/login", login);
router.post("/signup", signup);

// Fetch all posts
// router.get("/posts", async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts); // Send posts as JSON response
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching posts" });
//     }
// });


// Fetch all posts for the logged-in user
router.get("/posts", auth, async (req, res) => {
    const userId = req.user.id; // Get user ID from the authenticated request

    try {
        // Find posts where the author matches the logged-in user
        const posts = await Post.find({ author: userId });
        res.json(posts); // Send the user-specific posts
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});


// router.post("/posts/create", auth, async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const newPost = new Post({ title, content }); // Use the authenticated user's ID
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(400).json({ message: "Error creating post" });
//     }
// });


router.post("/posts/create", auth, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Get user ID from the authenticated request

    try {
        const newPost = new Post({
            title,
            content,
            author: userId, // Associate the post with the logged-in user
        });
        await newPost.save();
        res.status(201).json(newPost); // Send back the created post
    } catch (error) {
        res.status(400).json({ message: "Error creating post" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Error deleting post" });
    }
});

module.exports = router;
