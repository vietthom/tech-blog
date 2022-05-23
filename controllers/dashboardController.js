const {
    User,
    Post,
    Comment
} = require('../models');

module.exports = {
    getMyPosts: async (req, res) => {
        if(!req.session.loggedIn) {
            return res.redirect('/login');
        }
        try {
            const postsData = await Post.findAll({
                where: {
                    userId: req.session.user_id
                },
                include: [
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
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const posts = postsData.map(post => post.get({plain: true}));
            res.render('dashboard', {
                posts,
                loggedInUser: req.session.user || null,
            })
        } catch (error) {
           res.json(error); 
        }
    },
    editPostView: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }
        try {
            const postData = await Post.findOne({
                where: {
                    id: req.params.id
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
            const posts = postData.get({plain:true});
            res.render('editPost', {
                posts,
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            res.json(error);
        }
    }
}