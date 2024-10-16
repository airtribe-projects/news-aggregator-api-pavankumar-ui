const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const validateJWT = require("../Middlewares/ValidateJWT");
const NEWSAPI = require("newsapi");
const { default: mongoose } = require("mongoose");
const Newsapikey = new NEWSAPI(process.env.API_KEY);
const { validatePreferences } = require("../Middlewares/Validate");


/* To update the Preferences */
router.put("/", validateJWT, validatePreferences, async (req, res, next) => {
    try {
        const { categories, languages, country } = req.body.preferences;


        /*const { ObjectId } = mongoose.Types;
        const userId = ObjectId(req.user.id);


        const user = await User.findById(userId);*/


        const user = await User.findOne({ email: req.user.email });

        //to check whether user is token is valid or not for loggedin user//

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        if (!user.preferences) {
            user.preferences = {}
        }

        if (categories) {
            user.preferences.categories = categories;
        }
        if (languages) {
            user.preferences.languages = languages;
        }

        if (country) {
            user.preferences.country = country;
        }

        Newsapikey.v2.sources({
            category: categories,
            language: languages,
            country: country,
        });
        console.log('languages:', languages, 'categories:', categories, 'country:', country);

        await user.save();

        if (user.preferences) {
            return res.status(201).send({ message: "User Preferences Updated Successfully" });
        } else {
            return res.status(505).send({ message: "Updation error " });
        }

    } catch (err) {
        console.log(err);
        next(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


/* to get the user preferences */
router.get("/", validateJWT, async (req, res) => {

    try {
        /*const { ObjectId } = mongoose.Types;
        const userId = ObjectId({ _id: req.user.id });*/


        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ user });
    }
    catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;