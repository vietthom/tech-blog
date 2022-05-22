const router = require('express').Router();
const { createComment, getAllComments} = require('../../../controllers/commentController');

router.route('/')
    .post(createComment)
    .post(getAllComments)

module.exports = router;