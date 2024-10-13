
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        required: true
    },
    preferences: {
        categories: {
            type: String,  // Array of strings for categories
            default: "general",     // Default to an empty array
        },
        languages: {
            type: String,  // Array of strings for languages
            default: "en",
        },
        country: {
            type: String,  // Array of strings for news sources
            default: "us",
        }
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
