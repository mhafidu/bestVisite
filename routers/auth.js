const express = require('express')
const router = express.Router()
const passport = require('passport')

const wrapAsync = require('../utils/wrapAsync')

// controllerrs
const authController = require('../controllers/auth')

// route
router.route('/register')
    .get((req, res) => {
        res.render('auth/register')
    })
    .post(wrapAsync(authController.addUser))


router.route('/login')
    .get((req, res) => {
        res.render('auth/login')
    })
    .post(passport.authenticate('local',{
        failureRedirect: '/login',
        failureFlash: {
            type: 'error_msg',
            msg: 'Invalid username or password'
        }
    }),authController.userLogin)

router.post('/logout', authController.userLogout)

module.exports = router
