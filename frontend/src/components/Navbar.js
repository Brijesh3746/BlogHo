// // src/components/Navbar.js
// import React from 'react';

// const Navbar = () => {
//     return (
//         <nav className="bg-blue-600 p-4 text-white">
//             <div className="container mx-auto flex justify-between items-center">
//                 <h1 className="text-2xl font-bold">My Blog</h1>
//                 <ul className="flex space-x-4">
//                     <li>
//                         <a href="/" className="hover:text-gray-200">Home</a>
//                     </li>
//                     <li>
//                         <a href="/create" className="hover:text-gray-200">Create Post</a>
//                     </li>
//                     <li>
//                         <a href="/signup" className="hover:text-gray-200">Signup</a>
//                     </li><li>
//                         <a href="/login" className="hover:text-gray-200">Login</a>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// Navbar.js
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Check if token is present in localStorage to determine login status
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // If token exists, set isAuthenticated to true
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/signup");
        
    };

    return (
        <nav className="bg-gray-900 text-gray-200 p-4 flex justify-center items-center space-x-10 shadow-lg">
            <ul className="flex space-x-6">
                <li>
                    <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
                </li>
                <li>
                    <Link to="/create" className="hover:text-blue-400 transition-colors duration-300">Create Post</Link>
                </li>
                {/* Conditionally render the Login and Signup links based on authentication state */}
                {!isAuthenticated ? (
                    <div className="flex justify-center items-center space-x-5">
                        <li>
                            <Link to="/signup" className="hover:text-blue-400 transition-colors duration-300">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-blue-400 transition-colors duration-300">Login</Link>
                        </li>
                    </div>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="hover:text-blue-400 transition-colors duration-300">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );

};

export default Navbar;
