const dotenv = require('dotenv')
dotenv.config()
let mongoUrl = process.env.MONGO_URI
let PORT = process.env.PORT || 3003
module.exports = {
  mongoUrl, PORT
}
