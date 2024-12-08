const User = require("../Models/User");
const NEWSAPI = require("newsapi");
const Newsapikey = new NEWSAPI(process.env.API_KEY);
const {errorHandler} = require("../Middlewares/CommonErrHandler");

const UpdatePreferences = async (req, res, next) => {
    try {
        const { categories, languages, country } = req.body.preferences;
        const user = await User.findById(req.user.id);

        //to check whether user token is valid or not for loggedin user//

        if (!user) {
            return res.status(400).send({ "message": "User not found" });
        }

        user.preferences = {
            categories: categories,
            languages: languages,
            country: country
        };

        Newsapikey.v2.sources({
            category: categories,
            language: languages,
            country: country,
        });
        console.log('languages:', languages, 'categories:', categories, 'country:', country);

        await user.save();

        if (user.preferences) {
            return res.status(201).send({ "message": "User Preferences Updated Successfully" });
        }

    } catch (err) {
          return errorHandler(err, req, res, next);       
    }
}

const GetPreferences = async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        return res.status(200).send({ user });
    }
    catch (err) {
        return errorHandler(err, req, res, next);
    }
}

module.exports =
{
    UpdatePreferences,
    GetPreferences
};


