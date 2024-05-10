const jwt = require('jsonwebtoken');
const User = require('../Models/userModel')

async function verifyToken(req, res, next) {
    const token = req.header('Authorization')
    const data = jwt.verify(token, process.env.JWT_SECRET)
    try {
        const user = await User.findOne({ id: data.id, 'accessToken.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}


module.exports = verifyToken;
