const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { mongoUrl } = require('./utils/config')  
const blogsRouter = require('./controllers/blogs')
const app = express()
logger.info('Connecting to MongoDB...')
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)})
  app.use(express.json())
  app.use('/api/blogs', blogsRouter)
module.exports = app
