import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'
import ideaRoutes from './routes/ideaRoutes.js'
import userRouter from './routes/userRoutes.js'
import pkg from 'express-oauth2-jwt-bearer'
const { auth } = pkg

import bodyParser from 'body-parser'

import openaiRoutes from './routes/openaiRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
// ---MIDDLE WARE---
// In case we send images they can be large so the size is being limited
// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '30mb', extended: true }))

const PORT = process.env.PORT || 5000
//app.use(cors())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

const jwtCheck = auth({
  audience: 'https://dev-glrfz0b04ozteyjy.us.auth0.com/api/v2/',
  issuerBaseURL: 'https://dev-glrfz0b04ozteyjy.us.auth0.com/',
  tokenSigningAlg: 'RS256',
})

// enforce on all endpoints
app.use(jwtCheck)

app.get('/authorized', function (req, res) {
  console.log(req.auth)
  res.send('Secured Resource')
})

app.use('/ideas', ideaRoutes)
app.use('/users', userRouter)

// prevents backend from crashing when error occurs
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// prevents backend from crashing when error occurs
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || 'Internal server error'
  res.status(status).send(message)
})

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
