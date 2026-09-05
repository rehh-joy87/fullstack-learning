const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Blog = require("./models/Blog");
const User = require("./models/User");
const authenticateToken = require("./middleware/auth");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

console.log("Mongo URI exists:", !!process.env.MONGO_URI);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
        console.log("Database name:", mongoose.connection.name);
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("Blog API Running...");
});


// ===============================
// REGISTER
// ===============================

app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log("USER SAVED:", savedUser._id);

        res.status(201).json({
            message: "Registration successful!",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch (error) {

        console.error("REGISTRATION ERROR:", error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

});


// ===============================
// LOGIN
// ===============================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log("LOGIN EMAIL:", email);
        console.log("LOGIN PASSWORD RECEIVED:", !!password);

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        console.log("SEARCHING EMAIL:", cleanEmail);

        const user = await User.findOne({
            email: cleanEmail
        });

        console.log("USER FOUND:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD CORRECT:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful!",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }

});


// ===============================
// GET CURRENT USER PROFILE
// ===============================

app.get("/me", authenticateToken, async (req, res) => {

    try {

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });

    } catch (error) {

        console.error("PROFILE ERROR:", error);

        res.status(500).json({
            message: "Failed to load profile"
        });

    }

});


// ===============================
// GET ALL BLOGS - PUBLIC
// ===============================

app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 });

        res.json(blogs);

    } catch (error) {

        console.error("Error fetching public blogs:", error);

        res.status(500).json({
            message: "Failed to fetch blogs"
        });
    }
});


// ===============================
// GET MY BLOGS - AUTHENTICATED
// ===============================

app.get("/my-blogs", authenticateToken, async (req, res) => {
    try {

        const blogs = await Blog.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(blogs);

    } catch (error) {

        console.error("Error fetching my blogs:", error);

        res.status(500).json({
            message: "Failed to fetch your blogs"
        });
    }
});


// ===============================
// GET SINGLE BLOG - PUBLIC
// ===============================

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


// ===============================
// CREATE BLOG
// ===============================

app.post("/blogs", authenticateToken, async (req, res) => {

    try {

        const newBlog = new Blog({

            title: req.body.title,

            content: req.body.content,

            category: req.body.category || "Technology",

            userId: req.user.userId

        });

        const savedBlog = await newBlog.save();

        res.status(201).json({

            message: "Blog added successfully!",

            blog: savedBlog

        });

    } catch (error) {

        console.error("Error adding blog:", error);

        res.status(500).json({

            message: "Failed to add blog"

        });

    }

});


// ===============================
// UPDATE BLOG
// ===============================

app.put("/blogs/:id", authenticateToken, async (req, res) => {

    try {

        const updatedBlog = await Blog.findOneAndUpdate(

            {
                _id: req.params.id,
                userId: req.user.userId
            },

            {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            },

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedBlog) {

            return res.status(404).json({

                message:
                    "Blog not found or you don't have permission to edit it"

            });

        }

        res.json({

            message: "Blog updated successfully!",

            blog: updatedBlog

        });

    } catch (error) {

        console.error("Error updating blog:", error);

        res.status(500).json({

            message: "Failed to update blog"

        });

    }

});


// ===============================
// DELETE BLOG
// ===============================

app.delete("/blogs/:id", authenticateToken, async (req, res) => {

    try {

        const deletedBlog = await Blog.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.userId

        });

        if (!deletedBlog) {

            return res.status(404).json({

                message:
                    "Blog not found or you don't have permission to delete it"

            });

        }

        res.json({

            message: "Blog deleted successfully!",

            blog: deletedBlog

        });

    } catch (error) {

        console.error("Error deleting blog:", error);

        res.status(500).json({

            message: "Failed to delete blog"

        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});