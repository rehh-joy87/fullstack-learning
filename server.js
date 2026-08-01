const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// JavaScript array to store blogs
const blogs = [
    {
        id: 1,
        title: "My First Blog",
        content: "This is my first blog post."
    }
];


// GET all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST a new blog
app.post("/blogs", (req, res) => {
    const { title, content } = req.body;

    const newBlog = {
        id: blogs.length + 1,
        title,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: newBlog
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});