const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Technical",
                "Food",
                "Travel",
                "Interior",
                "Craft",
                "Music",
                "Nature",
                "Dresses",
                "Climate"
            ]
        },

        imageUrl: {
            type: String,
            default: ""
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;