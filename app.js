const express = require('express')
const app = express()
const PORT = 8090
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
//const home = require('./routes/home.js')
const db = require('./db/db.js')
const {getRouter, postRouter} = require('./routes/router.js')


app.use(cookieParser())
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"/public")))
app.use('/home', getRouter)
app.use('/home', postRouter)

db.connect()

app.get('/', (req, res) =>{
    res.redirect('home/login')
})

app.listen(PORT, () =>{
    console.log('Server listen in ', PORT)
})