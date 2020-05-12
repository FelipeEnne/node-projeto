exports.login = (req, res)=>{
    let obj = {
        pageTitle:'LOGIN'
    }
    res.render('login',obj)
}
