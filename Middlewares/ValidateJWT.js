const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const validateJWT = async (req, res, next) => {
    const headers = req.headers || {};
    const token = headers.authorization;
    //if the user is not logged in, then we will not check the token
    if (!token || token === "") {
        return res.status(400).send({ "message": "Token not provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decodedToken.id);
         console.log(user);
        if (!user) {
            return res.status(401).send({ "message": "Invalid Token" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ "message": "Invalid token or may be expired" });
    }
};

module.exports = validateJWT;
