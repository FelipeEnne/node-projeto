exports.index = (req, res)=>{
    let obj = {
        pageTitle:'HOME',
        userInfo: req.userInfo
    }
    res.render('home',obj)
}
