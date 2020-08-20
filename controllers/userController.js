const User = require('../models/User')

exports.login = (req, res)=>{
    res.render('login')
};

exports.loginAction = (req, res)=>{
    const auth = User.authenticate()

    auth(req.body.email, req.body.password, (error, result)=>{
        if(!result){
            req.flash('error', 'Email ou senha errados')
            res.redirect('/users/login')
            return
        }
        req.flash('success','Logado')
        res.redirect('/')
    })
};

exports.register = (req, res)=>{
    res.render('register')
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body)
    User.register(newUser, req.body.password, (error)=>{
        if(error) {
            req.flash('error', 'Tente mais tarde')
            res.redirect('/users/register')
            return;
        }

        req.flash('success', 'Tudo certo')
        res.redirect('/users/login')
    })
};