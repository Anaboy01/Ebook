const express = require('express');
const User = require('../models/userModel');
const { registerUser, loginUser, logout } = require('../controllers/userController');


const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
router.get('/logout', logout)


router.post('/', registerUser);
router.post('/login', loginUser)

module.exports = router;
