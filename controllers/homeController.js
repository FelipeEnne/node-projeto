const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.index = async (req, res)=>{
    let responseJson = {
        pageTitle:'HOME',
        posts:[],
        tags:[],
        tag:''
    };

    const tag = typeof req.query.t === 'string' ? req.query.t : '';
    responseJson.tag = tag;

    const postFilter = tag ? { tags: tag } : {};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter).populate('author');

    const [tags, posts] = await Promise.all([ tagsPromise, postsPromise ]);

    responseJson.tags = tags;
    const userId = req.user && req.user._id ? String(req.user._id) : null;
    responseJson.posts = posts.map(post => {
        const obj = post.toObject();
        obj.canEdit = !!(userId && post.author && String(post.author._id) === userId);
        return obj;
    });

    for(let i in tags) {
        if(tags[i]._id == responseJson.tag) {
            tags[i].class = "selected";
        }
    }

    res.render('home',responseJson)
}
