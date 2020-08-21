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

    const postFilter  = (typeof responseJson.tag != 'undefined') ? {tags:responseJson.tag}:{};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.findPosts(postFilter);

    const [tags, posts] = await Promise.all([ tagsPromise, postsPromise ]);

    responseJson.tags = tags;
    responseJson.posts = posts;

    for(let i in tags) {
        if(tags[i]._id == responseJson.tag) {
            tags[i].class = "selected";
        }
    }

    res.render('home',responseJson)
}
