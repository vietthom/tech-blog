const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'userId'
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

User.hasMany(Comment, {
    foreignKey: 'userId'
});

Post.hasMany(Comment, {
    foreignKey: 'postId', 
    onDelete: 'cascade'
});

module.exports = { User, Post, Comment }; 
