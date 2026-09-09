const mongoose = require('mongoose');
const Post = mongoose.model('Post')
const slugify = require('slug').default;

function parseTags(tags) {
    if (typeof tags !== 'string') {
        return [];
    }
    return tags.split(',').map(t => t.trim()).filter(Boolean);
}

exports.view = async (req, res) => {
    const post = await Post.findOne({ slug:req.params.slug });
    if (!post) {
        req.flash('error', 'Post não encontrado');
        return res.redirect('/');
    }
    res.render('view', {post});
}

exports.add = (req, res)=>{
    res.render('postAdd')
}

exports.addAction = async (req, res)=>{
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        tags: parseTags(req.body.tags),
        photo: req.body.photo,
        author: req.user._id
    });

    try{
        await post.save();
    } catch(error){
        req.flash('error', 'Erro ao salvar o post');
        res.redirect('/post/add');
        return;
    }
    
    req.flash('success','post salvo')
    res.redirect('/')
}


exports.edit = async (req, res) => {
    const post = await Post.findOne({ slug:req.params.slug, author: req.user._id });
    if (!post) {
        req.flash('error', 'Post não encontrado ou sem permissão');
        return res.redirect('/');
    }
    res.render('postEdit', { post });
}

exports.editAction = async (req, res) => {
    const update = {
        title: req.body.title,
        body: req.body.body,
        tags: parseTags(req.body.tags),
        slug: slugify(req.body.title, {lower:true})
    };

    if (req.body.photo) {
        update.photo = req.body.photo;
    }

    try{
        const post = await Post.findOneAndUpdate(
            { slug:req.params.slug, author: req.user._id },
            update,
            {
                new:true,
                runValidators:true
            }
        );
        if (!post) {
            req.flash('error', 'Post não encontrado ou sem permissão');
            return res.redirect('/');
        }
    } catch(error){
        req.flash('error', 'Erro ao atualizar o post');
        res.redirect('/post/'+req.params.slug+'/edit');
        return;
    }
    
    req.flash('success', 'Post atualizado com sucesso');
    res.redirect('/');
}
