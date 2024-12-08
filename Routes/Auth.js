const express = require("express");
const { validateRegistration } = require("../Middlewares/Validate");
const { validateLogin } = require("../Middlewares/Validate");
const router = express.Router();
const {UserSignup,UserLogin}  = require("../Controllers/AuthController");


/* registering the user */
router.post("/register", validateRegistration, UserSignup);

/* login the user */
router.post("/login", validateLogin,UserLogin);

module.exports = router;
