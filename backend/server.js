import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'
import ideaRoutes from './routes/ideaRoutes.js'
import userRouter from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import path from 'path'
import pkg from 'express-oauth2-jwt-bearer'
const { auth } = pkg
import testAuthMiddleware from './middleware/testAuthMiddleware.js'
import debug from 'debug'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
dotenv.config()
debug.enable('express-oauth2-jwt-bearer:*') // Add this line

connectDB()

const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))

const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))
} else {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
}

// Add this middleware to log each incoming request
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.originalUrl)
  next()
})

// Middleware to validate JWT
const client = jwksClient({
  jwksUri: 'https://dev-xl04qgs7ocqc3337.us.auth0.com/.well-known/jwks.json',
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err)
      return
    }
    const signingKey = key.publicKey || key.rsaPublicKey

    callback(null, signingKey)
  })
}

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).send('Unauthorized: No token provided')
    return
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    getKey,
    {
      issuer: 'https://dev-xl04qgs7ocqc3337.us.auth0.com/',
      audience: 'https://dev-xl04qgs7ocqc3337.us.auth0.com/api/v2/',
    },
    (err, decoded) => {
      if (err) {
        console.log('JWT Error:', err) // Log the error for debugging
        res.status(401).send('Unauthorized: Invalid token')
        return
      }

      req.user = decoded
      next()
    }
  )
}

// Apply JWT middleware only to the protected routes
app.use('/ideas', jwtMiddleware, ideaRoutes)
app.use('/users', jwtMiddleware, userRouter)

// Add this middleware to log the decoded JWT payload
app.use((req, res, next) => {
  if (req.user) {
    console.log('Decoded JWT payload:', req.user)
  }
  next()
})

const __dirname = path.resolve()

// Serve static files from the 'frontend/build' folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')))

  // Use express.static to serve the static files
  app.use(
    '/static',
    express.static(path.join(__dirname, 'frontend', 'build', 'static'))
  )

  // Handle any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  console.log('Error:', error) // Add this line
  const status = error.status || 500
  const message = error.message || 'Internal server error'
  res.status(status).send(message)
})

let server
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(
      `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  })
} else {
  server = app
}

export default server
