const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
/*import routes */
const userRoutes = require("./Routes/Auth");
const UserPreferenceRoutes = require("./Routes/UserPreferences");
const NewsRoutes = require("./Routes/News");
const errorHandler = require("./Middlewares/CommonErrHandler");


const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL,{})
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* call the routes */
app.use("/api/v1/users", userRoutes);
app.use("/api/user", UserPreferenceRoutes);
app.use("/api/v1", NewsRoutes);


app.listen(PORT, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
