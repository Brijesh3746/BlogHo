import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const url = process.env.REACT_APP_BACKEND_URL


    const fetchUserPosts = async () => {
        const token = localStorage.getItem("token"); // Get the token from local storage

        if (!token) {
            console.error("No token found. Please log in again.");
            return;
        }

        try {
            const response = await axios.get(`${url}/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request
                },
            });
            console.log(response.data);

            setPosts(response.data); // Update state with the fetched posts
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };

    useEffect(() => {
        fetchUserPosts(); // Call the function to fetch posts when component mounts
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">Your Blogs</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <li
                        key={post._id}
                        className="bg-gray-800 bg-opacity-60 text-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-300 flex-grow">{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
