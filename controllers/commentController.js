const { Comment } = require('../models');

module.exports = { 
    createComment: async (req, res) => {
        const { comment_text, postId} = req.body;
        
        try {
            if(req.session){
                const newComment = await Comment.create({
                    comment_text,
                    postId,
                    userId: req.session.user_id,
                });
                res.json({ newComment });
            }
        } catch (error) {
            res.json(error);
        }
    },
    getAllComments: async (req, res) => {
        try {
            const commentsData = await Comment.findAll({});
            const comments = commentsData.map(comment => comment.get({ plain: true }));
            res.json(comments);
        } catch (error) {
            res.json(error);
        }
    }
};