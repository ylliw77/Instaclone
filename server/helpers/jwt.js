const { verify, sign } = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET

function createToken(payload){
    return sign(payload, SECRET)
}

function decodeToken(token){
    return verify(token, SECRET)
}

module.exports = {createToken, decodeToken}