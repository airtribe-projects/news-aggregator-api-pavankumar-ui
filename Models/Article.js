const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    urlToImage: {
        type: String
    },
    publishedAt: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
    },
    source: {
        id: {
            type: String
        },
        name: {
            type: String
        }
    },
    category: {
        type: String,
    },
    language: {
        type: String
    },
    country: {
        type: String
    },
    readBy: [
        {
            type: String,
            required: true
        }],
    favoritedBy: [
        {
            type: String,
            required: true
        }],

});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;

