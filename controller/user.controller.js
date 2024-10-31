import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token geçerlilik süresi
    });
};

// Kullanıcı kaydı
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, phonenumber } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
            phonenumber,
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
            },
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Kullanıcı girişi
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phonenumber: user.phonenumber,
            },
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Kullanıcı profilini al
export const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, no user' });
    }
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Kullanıcı profilini güncelle
export const updateUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, no user' });
    }
    const user = await User.findById(req.user._id);
    if (user) {
        user.fullname = req.body.fullname || user.fullname;
        user.email = req.body.email || user.email;
        user.phonenumber = req.body.phonenumber || user.phonenumber;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            phonenumber: updatedUser.phonenumber,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});