// // app.js
// const express = require("express");
// const app = express();
// const cors = require('cors');
// // app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000' // Allow requests only from your frontend
// }));


// require("dotenv").config();

// const PORT = process.env.PORT || 5000;


// // middleware
// app.use(express.json());

// const newBlog = require("./routes/blog");
// // mount
// app.use("/api/v1", newBlog);

// require("./config/database").connectWithDb(); // Connect to the database

// // start the server
// app.listen(PORT, () => {
//   console.log(`App is running successfully at ${PORT}`);
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>This Is My HomePage </h1>`);
// });


// app.js
const express = require("express");
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // Import mongoose
const cookieParser = require("cookie-parser");


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Import routes
const newBlog = require("./routes/blog"); // Adjust path if necessary
app.use("/api/v1", newBlog);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running successfully at ${PORT}`);
});

// Home route
app.get("/", (req, res) => {
  res.send("<h1>This Is My HomePage</h1>");
});
