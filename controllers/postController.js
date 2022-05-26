const { User, Post, Comment } = require('../models');

module.exports = { 
    createPost: async (req, res) => {
        const { title, body } = req.body;
        try {
            const newPost = await Post.create({
                title,
                body,
                userId: req.session.user.id
            })
        res.json({newPost});
        } catch (error) {
            res.json(error);
        }
    },
    editPost: async (req, res) => {
        if(!req.session.loggedIn){
            return res.redirect('/login');
        }
        const { title, body }= req.body;
        try {
            const post = await Post.update({
                title, body
            },
            {
                where: {
                    id: req.params.postId,
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAllPosts: async (req, res) => {
        if(!req.session.loggedIn){
            return res.redirect('/login');
        }
        try {
            const postData = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                order: ['createdAt', 'DESC']
            });
            const posts = postData.map(post => post.get({plain: true}));
            res.render('allPosts', {
                posts
            });
        } catch (error) {
            res.json(error);
        }
    }, 
    getPostById: async(req, res)=>{
        if(!req.session.loggedIn){
            return res.redirect('/login');
        }
        try {
            const postData = await Post.findOne({
                where: {
                    id: req.params.postId
                }, 
                attributes: [
                    'id',
                    'body',
                    'title',
                    'createdAt'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_text',
                            'postId',
                            'userId',
                            'createdAt'

                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                    }
                ]
            });
            const post = postData.get({plain: true});
            res.render('singlePost', {
                post, 
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            res.json(error);
        }
    },
    createPostView: (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }
        res.render('createPost', {
            loggedInUser: req.session.user || null,
        });
    }, 
    allPostsView: (req, res) => {
        if(!req.session.loggedIn){
            return res.redirect('/login');
        }
        res.render('allPosts')
    },
    homePosts: async (req, res) => {
        try {
            const postData = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                limit : 6,
            });
            const posts = postData.map(post => post.get({plain: true}));
            res.render('homepage', {
                posts,
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            re;s.json(error)
        }
    },
    deletePost: async (req, res) =>{
        try {
            await Comment.destroy({
                where: {
                    postId: req.params.postId
                }
            });
            await Post.destroy({
                where: {
                    id: req.params.postId
                }
            });
            res.json({success})
        } catch (error) {
            res.json(error);
        }
    }
}