const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    zipCode: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    tokenList: [
        {
            token: {
                type: String,
                require: true,
            },
        },
    ],
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('passwordHash')) {
        user.passwordHash = await bcrypt.hash(user.passwordHash, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id.toString(),
        },
        process.env.JWT_KEY,
        {
            expiresIn: '10d',
        }
    );
    user.tokenList = user.tokenList.concat({ token });

    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.passwordHash;
    delete user.tokenList;
    return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
