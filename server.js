const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// GET Route
app.get("/", (req, res) => {
    res.send("Welcome to my Express.js Server!");
});

// GET Route for blogs
app.get("/blogs", (req, res) => {
    res.json([
        {
            id: 1,
            title: "My First Blog",
            content: "This is my first blog post."
        }
    ]);
});

// POST Route
app.post("/blogs", (req, res) => {
    const blog = req.body;

    res.status(201).json({
        message: "Blog added successfully!",
        data: blog
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});