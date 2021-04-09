const express = require('express')
const config = require('./utils/config')
const app = express()
const blogRouter = require('./controllers/blog')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blog', blogRouter)

module.exports = app