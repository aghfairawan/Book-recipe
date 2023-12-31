require('dotenv').config()

const express =  require('express');
const databaseMidleware = require('./midleware/database-midleware.js');
const authRouter = require('./routes/auth-route.js')
const bookRouter = require('./routes/book-route.js')
const authMiddleware = require('./midleware/authentication-midlware.js')

const cors = require('cors');



const app = express()

app.use(express.json())
app.use(cors());


app.use(databaseMidleware)


app.get("/", (req, res) => {
    res.send("halo dunia ini saya");
  });

app.use('/auth', authRouter)
app.use('/books', authMiddleware, bookRouter)

app.use((err, req, res, next) => {
  console.log(err, `<=================== error ==================`);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  })
})

const port = 8000;

app.listen(port, ()=>{
    console.log(`Running on port http://localhost:${port}`)
})
