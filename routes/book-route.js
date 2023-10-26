const { Router } = require('express')
const { getAllBooks, createBooks, deleteBookById, updateBookById, getBookById } = require('../service/book-service.js')
const authorizationMiddleware =  require('../midleware/authorization-midleware.js')

const bookRouter = Router()

bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getBookById)
bookRouter.post('/', authorizationMiddleware, createBooks)
bookRouter.delete('/:id', authorizationMiddleware, deleteBookById)
bookRouter.put('/:id',authorizationMiddleware, updateBookById)

module.exports = bookRouter