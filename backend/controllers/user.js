const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname)
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        })

    const user = await User.findOne({ email });
    if (user)
        throw new Error('User already exists');
    else {
        const newUser = await User.create(req.body);
        return res.status(201).json({
            success: newUser ? true : false,
            mes: newUser ? 'User created successfully' : 'User not created',
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        })

    const response = await User.findOne({ email });
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, ...userData } = response.toObject(); // password and role are not sent to the client
        const accessToken = generateAccessToken(response._id, role);
        const refreshToken = generateRefreshToken(response._id);
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true }); // update the refreshToken in the database
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // set the refreshToken in the cookie
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }
    else {
        throw new Error('Invalid credentials!');
    }
})
//Get profile current user
const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id }).select('-refreshToken -password -role'); // select all fields except refreshToken, password and role
    return res.status(200).json({
        success: false,
        result: user ? user : "User not found"
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies; //get the tokent from the cookie
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token found'); // if there is no cookie or refreshToken in the cookie
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET); // verify the refreshToken
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken }); // find the user with the decoded _id and refreshToken in DB
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token expired'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token found');
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: ' ' }, { new: true }); // delete the refreshToken in the database
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    }); // delete the refreshToken in the cookie
    return res.status(200).json({
        success: true,
        mes: 'Logout successfully'
    })
})

//client gui email
//server check mail xem co hop le khong => gui mail + kem theo link (password change token)
//client check mail => click link
//client gui api kem token
//server check token co giong voi token ma server gui mail hay khong
//change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) throw new Error('Email is required');
    const user = await User.findOne({ email })
    if (!user) throw new Error('Email is not exist');
    const resetToken = user.createPasswordChangedToken(); // create a password reset token
    await user.save() //save to db

    const html = `Click on the link below to change your passsword. This link will expire after 15 minutes from now. <a href = 
    ${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a> ` // create the html content for the email chane password

    const data = {
        email,
        html
    } // create the data for the email
    const rs = await sendMail(data); // send the email
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) throw new Error('Password and token are required')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) throw new Error('Invalid or expired token');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Password changed successfully' : 'Something went wrong'
    })
})


module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword
}