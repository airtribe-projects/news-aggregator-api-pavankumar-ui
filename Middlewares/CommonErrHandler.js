const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Some error occurred in server! please try again later" });
};

module.exports = errorHandler;
