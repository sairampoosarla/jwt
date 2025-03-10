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
    const username = req.user.username
    const randomNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`hi ${username},`,secret:`this is the number ${randomNumber}`})
    
}

module.exports = {login, dashboard} 