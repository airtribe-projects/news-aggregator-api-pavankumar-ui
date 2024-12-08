const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {errorHandler} = require("../Middlewares/CommonErrHandler");

/*Enable this to Generate The Random Secret Key and store in env//
//const secret = crypto.randomBytes(32).toString("hex");*/

const user = require("../Models/User");


const UserSignup = async (req,res,next) => {
    try {
        
        const {name,email,password} =  req.body;
        const existingUser = await user.findOne({email });

        if(existingUser) {
            return res.status(400).send({ "message": "Email already exists" });
        }

        const hashedPassword =await bcrypt.hash(password,10);
        const dbUser = await user.create({
            name,
            email,
            password:hashedPassword
        });



            return res.status(201).send({
                message: "User Registered successfully",
                userId: dbUser._id,
            });
    } catch (err) {
      return  errorHandler(err, req, res, next);
    }
}

const UserLogin = async (req, res,next) => {
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
            { email: dbUser.email, id:dbUser._id,role: dbUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).send({ success: true, token });
    } catch (err) {
       return  errorHandler(err, req, res, next);
    }
}


module.exports ={
    UserSignup,
    UserLogin
}