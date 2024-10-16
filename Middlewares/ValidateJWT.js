const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    const headers = req.headers || {};
    const token = headers.authorization;
    //if the user is not logged in, then we will not check the token
    if (!token || token === "") {
        return res.status(400).send({ message: "Token not provided" });
        next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token or may be expired" });
    }
};

module.exports = validateJWT;
