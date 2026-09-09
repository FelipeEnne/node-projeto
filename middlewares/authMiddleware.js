const User = require('../models/User');

exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'Faça o login')
        res.redirect('/users/login');
        return;
    }
    next();
}

exports.changePassword = (req, res) => {
    if(req.body.password != req.body['password-confirm']) {
        req.flash('error', 'Senhas não são iguais');
        res.redirect('/profile');
        return
    }

    if(!req.body['password-current']) {
        req.flash('error', 'Informe a senha atual');
        res.redirect('/profile');
        return;
    }

    req.user.authenticate(req.body['password-current'], (err, user, passwordError) => {
        if (err || passwordError || !user) {
            req.flash('error', 'Senha atual incorreta');
            res.redirect('/profile');
            return;
        }

        req.user.setPassword(req.body.password, async (setErr) => {
            if (setErr) {
                req.flash('error', 'Não foi possível alterar a senha');
                res.redirect('/profile');
                return;
            }
            await req.user.save();
            req.flash('success','Senha alterada');
            res.redirect('/');
        });
    });
}
