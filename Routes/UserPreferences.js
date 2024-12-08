const express = require("express");
const router = express.Router();
const { validatePreferences } = require("../Middlewares/Validate");
const validateJWT = require("../Middlewares/ValidateJWT");
const { UpdatePreferences, GetPreferences } = require("../Controllers/PreferenceController");



/* To update the Preferences */
router.put("/preferences", validateJWT, validatePreferences,UpdatePreferences );


/* to get the user preferences */
router.get("/preferences", validateJWT,GetPreferences );

module.exports = router;

