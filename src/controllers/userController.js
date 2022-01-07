const User = require('./../models/user');

const createUser = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            const user = new User(req.body);
            await user.save();
            const token = await user.generateToken();
            return res.status(201).send({ user, token });
        } else {
            res.status(400).json({ message: 'User existed' });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

const getAllUSer = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const user = await User.find({});
            return res.status(200).json(user);
        }
        res.send({ message: 'You are not admin!!!' });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};
const detailUser = async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};
const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.passwordHash
        );
        const token = await user.generateToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};
const logout = async (req, res) => {
    try {
        req.user.tokenList = req.user.tokenList.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.send({ message: 'Logout successful' });
    } catch (e) {
        res.status(500).send();
    }
};
module.exports = {
    createUser,
    detailUser,
    getUserById,
    getAllUSer,
    login,
    logout,
};
