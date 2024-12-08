const User = require("../Models/User");
const axios = require("axios");
const Article = require("../Models/Article");
const { errorHandler } = require("../Middlewares/CommonErrHandler");


const FetchNews = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(401).send({ "message": "User not found" });
        }
        try {
            const newsURL = `https://newsapi.org/v2/top-headlines?category=${user.preferences.categories}&language=${user.preferences.languages}&country=${user.preferences.country}&apiKey=${process.env.API_KEY}`;
            const response = await axios.get(newsURL);
            const newsData = response.data;

            //if the response of the news data is empty by api, display null//
            if (response.data === "") {
                return res.status(200).json({
                    status: "ok",
                    totalResults: 0,
                    articles: [],
                });
            }

            /* authenticated user who access  the news data  */
            const userEmail = req.user.email;
            const articlesWithReadBy = newsData.articles.map((article) => ({
                ...article,
                readBy: [userEmail], // Initialize readBy with the current user's email
                favoritedBy: [userEmail],
            }));

            /* fetching articles object from newsapi and storing in db as many data of object */
            await Article.insertMany(articlesWithReadBy);
            return res.status(200).json(newsData.articles);
        } catch (APIError) {
            console.error(
                "News API Error:",
                APIError.response ? APIError.newsData : APIError.message
            );

            return res.status(503).send({
                "message":
                    "Unable to fetch the news at the moment. Please try again later",
            });
        }
    } catch (err) {
        return errorHandler(err, req, res, next);
    }
}

module.exports = FetchNews;