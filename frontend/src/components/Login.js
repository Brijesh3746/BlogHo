// // Login.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:4000/api/v1/login", formData);
//             toast.success(response.data.message);
//             localStorage.setItem("token", response.data.token);
//             navigate("/"); // Redirect to the posts page
//         } catch (error) {
//             toast.error(error.response.data.message || "Login failed");
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Log In</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border rounded-md"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border rounded-md"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
//                 >
//                     Log In
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND_URL


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${url}/login`,
                formData
            );
            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            toast.success("Logged in successfully");
            navigate("/"); // Redirect to the home page
            window.location.reload(); // Reload to update navbar state
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );

};

export default Login;
