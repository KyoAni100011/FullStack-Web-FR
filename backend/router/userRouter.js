const express = require('express');
const router = express.Router();
const { signUp, signIn, logOut } = require("../controllers/user")

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/logOut', logOut);


module.exports = router;