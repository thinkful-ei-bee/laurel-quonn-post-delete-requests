const { API_TOKEN } = require('../config')
const logger = require('logger')

function validateToken(req, res, next) {

    console.log('validate bearer token working as it should!')

    // client token
    const bearerToken = req.query.token;

    // env token
    const apiToken = process.env.API_TOKEN

    // move to the next middleware
    next();
}

module.exports = validateToken