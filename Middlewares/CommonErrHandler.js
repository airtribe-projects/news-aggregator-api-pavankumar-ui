const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Some error occurred in server! please try again later" });
    next(err);
};

const validationErrors = (error,req,res,next)=>{
    return res.status(400).json({ message: error.details[0].message });
}

module.exports = {
    errorHandler,
    validationErrors
};