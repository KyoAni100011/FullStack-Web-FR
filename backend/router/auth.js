const express = require('express');
const router = express.Router();
const { signUp, signIn, logOut, userProfile } = require("../controllers/auth");
const { isAuthenticated } = require("../middleware/auth");


router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/logout', logOut);
router.get('/getMe', isAuthenticated, userProfile);

module.exports = router;