import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'

import ideaRoutes from './routes/ideaRoutes.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import verifyJwt from './middleware/auth.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.get('/', (request, response) => {
  response.send('API is running...')
})


// later on put this at the beginning in the user router
app.use(verifyJwt)


app.use('/ideas', ideaRoutes)
app.use('/users', userRouter)

app.use((req, res, next) => {

  const error = new Error('not found');
  const message = error.status = 404;
  next(error);

})

app.use((error, req, res, nect) => {

  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send(message);


})



const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
