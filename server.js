const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./models/Blog");

// Force Node.js to use these DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


// Users Array
const users = [];


// Home Route
app.get("/", (req, res) => {
    res.send("Blog API Running...");
});

// User Registration
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "Registration successful!",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// GET All Blogs
app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});


app.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {
        console.error("Error fetching blog:", error);

        res.status(500).json({
            message: "Error fetching blog"
        });
    }
});


// POST New Blog
app.post("/blogs", async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            message: "Blog added successfully!",
            blog: savedBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add blog"
        });
    }
});


// PUT Update Blog
app.put("/blogs/:id", async (req, res) => {

    try {

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                new: true
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog updated successfully!",
            blog: updatedBlog
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update blog"
        });

    }

});


// DELETE Blog
app.delete("/blogs/:id", async (req, res) => {

    try {

        const deletedBlog = await Blog.findByIdAndDelete(
            req.params.id
        );

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog deleted successfully!",
            blog: deletedBlog
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete blog"
        });

    }

});



// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});