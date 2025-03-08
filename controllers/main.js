
// we are implementing two controllers for the login and dashboard page

const login = async (req, res) => {
    res.send('Fake login response')
}

const dashboard = async (req, res) => {
    const randomNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:'this is the message',secret:`this is the number ${randomNumber}`})
}

module.exports = {login, dashboard}