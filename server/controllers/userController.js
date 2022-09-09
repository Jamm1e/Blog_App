const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async(req, res) => {
    try {
        const{firstName, lastName, email, password} = req.body;
        let toast = [];

        if(!firstName) toast.push({message: 'First name is required', type: 'error'});

        if(!lastName) toast.push({message: 'Last name is required', type: 'error'});

        if(!password) toast.push({message: 'A valid password is required', type: 'error'});
        if (password && (password.length < 8 || password.length > 25)) toast.push({message: 'Password must be at least 8 - 25 characters long', type: 'error'});

        if(!email || !validateEmail(email)) toast.push({message: 'A valid E-mail is required', type: 'error'});

        if(toast.length > 0) return res.status(400).json(toast);

        let newUser = await User.findOne({email});

        if(newUser) return res.status(400).json({message: 'User already exists', type: 'error'});
        
        newUser = new User(req.body);

        //Hash password before saving to database
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        const payLoad = {
            user: {
                id: newUser._id
            }
        };

        jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: 28800
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        }
        );

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
};

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        let toast = [];

        if(!password) toast.push({message: 'A valid password is required', type: 'error'});
        if (password && (password.length < 8 || password.length > 25)) toast.push({message: 'Password must be at least 8 - 25 characters long', type: 'error'});

        if(!email || !validateEmail(email)) toast.push({message: 'A valid E-mail is required', type: 'error'});

        if(toast.length > 0) return res.status(400).json(toast);

        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message: 'User does not exist', type: 'error'});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json([{message: 'Invalid credentials', type: 'error'}]);

        const payLoad = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: 28800
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        }
        );

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
                                .select('-password')
                                .select('-__v');
        
        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);

        res.json(user);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
};

function validateEmail(email){
    const regex = /\S+@\S+\.\S+/;
//validemail@mail.com returns true whereas valid.mail (without the @) returns false
    return regex.test(email);
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
};