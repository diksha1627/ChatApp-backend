const express = require("express");
const router = express.Router();

const {signup, login, getAllUsers} = require("../../controllers/userController")

router.get('/',getAllUsers);
router.post('/signup',signup); 
router.post('/login',login);


module.exports = router;