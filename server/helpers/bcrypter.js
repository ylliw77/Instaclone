const { hashSync, compareSync } = require('bcryptjs');

function hashPassword(password){
    return hashSync(password)
}

function checkPassword(password, hashedPassword){
    return compareSync(password, hashedPassword)
}


module.exports = {hashPassword, checkPassword}