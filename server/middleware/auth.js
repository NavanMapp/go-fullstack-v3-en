const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'Random_Token_Secret')
        const userId = decodeToken.userId
        req.auth = {userId}

        if(req.body.userId && req.body.user !== userId) {
            throw 'Invalid user ID'
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }
}