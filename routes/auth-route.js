const { Router } = require('express')
const { register, login } = require('../service/auth-service.js')
const { body } = require('express-validator')

const authRouter = Router()

authRouter.post('/register', body('username').trim(), register)
authRouter.post('/login', login)

module.exports = authRouter