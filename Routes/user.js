const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validateRegistration } = require("../Middlewares/Validate");
const { validateLogin } = require("../Middlewares/Validate");

/*Enable this to Generate The Random Secret Key and store in env//
//const secret = crypto.randomBytes(32).toString("hex");*/

const user = require("../Models/User");

/* registering the user */
router.post("/register", validateRegistration, async (req, res, next) => {
    try {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, 10);
        const dbUser = await user.create(body);

        res.status(200).send({
            message: "User Registered successfully",
            userId: dbUser._id,
        });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
        next(err);
    }
});

/* login the user */
router.post("/login", validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbUser = await user.findOne({ email });

        if (!dbUser) {
            return res.status(401).send({ message: "email not found" });
        }

        const hashedPassword = dbUser.password;
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        /*res.send({ isPasswordMatched });*/
        if (!isPasswordMatched) {
            return res.status(401).send({ message: "invalid Credentials!" });
        }

        const token = jwt.sign(
            { email: dbUser.email, role: dbUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).send({ success: true, token });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
