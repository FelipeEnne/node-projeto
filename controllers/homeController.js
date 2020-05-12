exports.index = (req, res)=>{
    let obj = {
        pageTitle:'HOME'
    }
    res.render('home',obj)
}
