const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) { // if the authorization header exists and starts with Bearer
        const token = req.headers.authorization.split(' ')[1]; // split the token from the Bearer
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token'
            })
            req.user = decoded;
            next();
        })
    }
    else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!'
        })
    }
})
const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === 'admin') next();
    else return res.status(403).json({
        success: false,
        mes: 'Require admin role!'
    })
})

module.exports = {
    verifyAccessToken,
    isAdmin
}