module.exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'Faça o login')
        res.redirect('/users/login');
        return;
    }
    next();
}