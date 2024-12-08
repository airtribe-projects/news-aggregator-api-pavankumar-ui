const express = require("express");
const router = express.Router();
const validateJWT = require("../Middlewares/ValidateJWT");

const FetchNews = require("../Controllers/NewsController");


//fetch the News articles based on preferences//
router.get("/news", validateJWT, FetchNews);

module.exports = router;

