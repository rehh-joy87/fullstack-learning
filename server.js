const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Blog Array
const blogs = [
    {
        id: 1,
        title: "My First Blog",
        content: "This is my first blog post."
    },
    {
        id: 2,
        title: "Express API",
        content: "Learning Express is fun!"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Blog API Running...");
});

// GET All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST New Blog
app.post("/blogs", (req, res) => {

    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        content: req.body.content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: newBlog
    });

});

// PUT Update Blog
app.put("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = req.body.title;
    blog.content = req.body.content;

    res.json({
        message: "Blog updated successfully!",
        blog
    });

});

// DELETE Blog
app.delete("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    const deletedBlog = blogs.splice(index, 1);

    res.json({
        message: "Blog deleted successfully!",
        blog: deletedBlog[0]
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});