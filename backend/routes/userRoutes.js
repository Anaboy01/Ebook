const express = require('express');
const User = require('../models/userModel');
const { registerUser, loginUser, logout, registerAdmin } = require('../controllers/userController');


const router = express.Router();

router.get('/logout', logout)


router.post('/', registerUser);
router.post('/registerAdmin', registerAdmin);
router.post('/login', loginUser)

module.exports = router;
