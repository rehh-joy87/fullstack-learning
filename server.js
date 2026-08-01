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

// Update a blog
app.put("/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = title;
    blog.content = content;

    res.json({
        message: "Blog updated successfully!",
        blog: blog
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});