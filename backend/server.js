import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'
import ideaRoutes from './routes/ideaRoutes.js'
import userRouter from './routes/user.js'
import {auth} from 'express-oauth2-jwt-bearer'


dotenv.config()

connectDB()

const app = express()


const PORT = process.env.PORT || 5000
app.use(cors())


const jwtCheck = auth({
  audience: 'GPT',
  issuerBaseURL: 'https://dev-muso0wvn6wqurdcf.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});



app.use('/ideas', ideaRoutes)
app.use('/users', userRouter)




app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
