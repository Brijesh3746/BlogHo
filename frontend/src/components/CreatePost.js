// // src/components/CreatePost.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const CreatePost = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [author, setAuthor] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newPost = { title, content, author };

//         try {
//             const response = await axios.post('http://localhost:4000/api/v1/posts/create', newPost);
//             if (response.status === 201) {
//                 toast.success('Post created successfully');
//                 setTitle('');
//                 setContent('');
//                 setAuthor('');
//             }
//         } catch (error) {
//             console.error('Error creating post:', error);
//             toast.error('Error creating post. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//                 required
//             />
//             <textarea
//                 placeholder="Content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Author"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//                 required
//             />
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//                 Create Post
//             </button>
//         </form>
//     );
// };

// export default CreatePost;




// CreatePost.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to create a post.");
            navigate("/login"); // Redirect to the login page if not authenticated
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You need to be logged in to create a post.");
                return;
            }
            const response = await axios.post(
                "http://localhost:4000/api/v1/posts/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Post created successfully!");
            navigate("/"); // Redirect to the main posts page
        } catch (error) {
            toast.error("Error creating post.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post content"
                        rows="6"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Create Post
                </button>
            </form>
        </div>
    );

};

export default CreatePost;
