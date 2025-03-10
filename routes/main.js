const express = require('express')

const router = express.Router()
const authorizationMiddleware = require('../middleware/auth')

const {login, dashboard} = require('../controllers/main')

//here we are passing the authorizationMiddleware here so that it would be called first before calling the dashboard
router.route('/dashboard').get(authorizationMiddleware,dashboard)

router.route('/login').post(login)

module.exports = router