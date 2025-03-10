const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authorizationMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization
    //we are checking if the request sent has the authorization token or if it dose not start with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError("authorization token is not provided or Bearer is not added to it",401)
    }

    //we are getting the token from the header
    const token = authHeader.split(' ')[1]

    //we are decoading the token to see if it is a valid token
    try{
        //decoading the token, by passing the token and secret phrase to the jwt function
        const decoaded = jwt.verify(token, process.env.JWT_SECRET)
        //printing the deacoded string
        console.log(decoaded)
        //getting the user details form the decoaded message and adding it to the req value
        const {id, username} = decoaded
        //these values stored in the req is passed to next middleware and it would be used there
        req.user = {id, username}
        next()
    }
    catch (error) {
        console.log(error)
        throw new CustomAPIError('error in validating the token', 401)
    }
}

module.exports = authorizationMiddleware