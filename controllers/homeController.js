const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.index = async (req, res)=>{
    let responseJson = {
        pageTitle:'HOME',
        posts:[],
        tags:[],
        tag:''
    };

    responseJson.tag = req.query.t;
    const tags = await Post.getTagsList();

    for(let i in tags) {
        if(tags[i]._id == responseJson.tag) {
            tags[i].class = "selected";
        }
    }

    
    responseJson.tags = tags;

    const posts = await Post.find();

    responseJson.posts = posts;


    res.render('home',responseJson)
}
