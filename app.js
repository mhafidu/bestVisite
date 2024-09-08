const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy =require('passport-local')
const flash = require('connect-flash')
const ejsMate = require('ejs-mate')
const hereMaps = require('./utils/hereMaps')
const Joi = require('joi')
const methodOverride = require('method-override')
const path = require('path')
const app = express()


// model
const User = require('./models/user')


// connect to mongodb
mongoose.connect('mongodb://127.0.0.1/bestpoint')
    .then((result)=>{
        console.log('connect to mongodb')
    }).catch((err)=>{
        console.log(err)
    })

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

// middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'this-is-a-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 100 * 60 * 60 * 24 * 7,
        maxAge: 100 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) =>{
    res.locals.currentUser = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next();
})



app.get('/', (req, res)=>{
    res.render('home')
})


app.use('/', require('./routers/auth'))
app.use('/places', require('./routers/places'))
app.use('/places/:place_id/reviews', require('./routers/reviews'))



app.all('*',(req, res, next) => {
    next(new ErrorHandler())
})


app.use((err, req, res, next) => {
    const { statusCode = 500} = err
    if (!err.message) err.message('Oh no, Something went wrong !')
    res.status(statusCode).render('error', {err})
})

app.listen(3000,()=>{
    console.log(`server is running on http://127.0.0.1:3000`)
})
