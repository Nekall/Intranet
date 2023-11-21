import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Users } from '../models/users.model.js';


const login = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing email and/or password",
        });
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password do not match",
        });
    }


    const user = Users.find({ email }).first();

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Incorrect email or password",
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            success: false,
            message: "Incorrect email or password",
        });
    }

    const token = jwt.sign({
        id : user._id,
        email: user.email,
    }, process.env.JWT_SECRET);

    res.json({
        success: true,
        token,
    });
}

const logout = async (req, res) => {
    res.json({
        message: "Logout",
    });
}

export {
    login,
    logout
}