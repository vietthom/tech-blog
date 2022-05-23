const router = require('express').Router();
const apiRoutes = Require('./apiRoutes');
const postRoutes = require('./apiRoutes/postRoutes');
const commentRoutes = require('./apiRoutes/commentRoutes');
const { loginView, signupView } = require('../controllers/userController');
const { homePosts, createPostView } = require('../controllers/postController');

router.get('/', homePosts);
router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/newPost', createPostView);

router.use('/posts', postRoutes );

router.use('/comments', commentRoutes);
router.use('/api', apiRoutes);

module.exports = router;