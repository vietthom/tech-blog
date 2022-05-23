const router = require('express').Router();
const {
    createPost,
    editPost,
    getAllPosts,
    getPostById,
    deletePost
} = require('../../../controllers/postController');

router.route('/')
    .post(createPost)
    .post(getAllPosts)

router.route('/')
    .get(getPostById)
    .put(editPost)
    .delete(deletePost)

module.exports = router;