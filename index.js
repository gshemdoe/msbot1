const express = require('express')
const app = express()
const getRoutes = require('./src/routes/get')
const postRoutes = require('./src/routes/post')
require('dotenv').config()


//middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(getRoutes)
app.use(postRoutes)

app.listen(process.env.PORT || 3000, ()=> console.log('Listen to port 3000'))
