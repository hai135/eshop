const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/auth');
const {
    createUser,
    detailUser,
    getUserById,
    getAllUSer,
    login,
    logout,
} = require('./../controllers/userController');
router.get('/me', authMiddleware, detailUser);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);
router.get('/:id', authMiddleware, getUserById);
router.get('/', authMiddleware, getAllUSer);
router.post('/', createUser);

module.exports = router;
