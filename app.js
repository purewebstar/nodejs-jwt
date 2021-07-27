// importing dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
// importing routes
import api from './api/routes/api.route.js'
// app config
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

// connecting to database
mongoose.connect(process.env.DATABASE_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> 
    console.log('connected to MongoDb') )
.catch(err =>{
    console.log(err.message)
})

// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use('/api', api)

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})


