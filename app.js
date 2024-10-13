const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
//const validateJWT = require("./Middlewares/ValidateJWT");
/*import routes */
const userRoutes = require("./Routes/user");
const testRoutes = require("./Routes/user");
const UserPreferenceRoutes = require("./Routes/User_preferences");
const NewsRoutes = require("./Routes/News");
const errorHandler = require("./Middlewares/CommonErrHandler");



//connect to database//
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* call the routes */
app.use("/api/v1/users/signup", userRoutes);
app.use("/api/v1/users/login", userRoutes);
/*app.use("/", testRoutes);*/
app.use("/user/preferences", UserPreferenceRoutes);
app.use("/api/v1/news", NewsRoutes);
app.use(errorHandler);



app.listen(PORT, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
