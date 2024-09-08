// module
const User = require('../models/user')

module.exports.addUser = async(req, res) => {
    try {
        const {email, username, password} = req.body
        const user = new User({email, username})
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            if(err) return next()
            req.flash('success_msg','You are registered and can logged in')
            res.redirect('/places')
        })
    } catch (error) {
        req.flash('error_msg', error.message)
        res.redirect('/register')
    }
}

module.exports.userLogout = (req, res) => {
    req.logOut(function (err) {
        if(err) {return next(err)}
        req.flash('success_msg','You are logged out')
        res.redirect('/login')
    })

}

module.exports.userLogin = (req, res) => {
    req.flash('success_msg', 'you are logged in')
    res.redirect('/places')
}