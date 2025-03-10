const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
// we are implementing two controllers for the login and dashboard page

const login = async (req, res) => {
    console.log('login has been accessed')

    //getting the username and password that has been sent in the post request
    const {username,password} = req.body

    //checking if the username and password has been provided, if they are not provided throwing an error
    if (!username || !password){
        throw new CustomAPIError("please provide username and password", 400)
    }

    //creating a ID to identify the user who did it
    const id = new Date().getDate()

    //creating a token
    //in the token we are sending the id and username in the payload and giving the secret to encode
    //and the time when the token would expire
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})

    //sending the message and token in response
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req, res) => {

    //we are printing the header so we can see the authorization token
    console.log(req.headers.authorization)

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
        //getting the username and adding it back in the message to make it unique
        const username = decoaded.username
        const randomNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`hi ${username},`,secret:`this is the number ${randomNumber}`})
    }
    catch (error) {
        console.log(error)
        throw new CustomAPIError('error in validating the token', 401)
    }
    
}

module.exports = {login, dashboard} 