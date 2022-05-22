const { User } = require('../models');
// const auth = require('../utils/auth');
const bcrypt = require('bcryptjs');

module.exports = { 
    //create a user
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password){
            return res.status(400).json({error: 'You must provide an username, email, and password'});
        }
        try {
            const user = await User.create({username, email, password});
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    }, 

    getAllUsers: async (req, res) => {
        try {
            const userData = await User.findAll({});
        const users= userData.map(user => user.get({plain:true}));
        res.json(users);
        } catch (error) {
            res.json(error);
        }
    },

    //get a user by id
    getUserById: async (req, res)=>{
        try {
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({plain: true});
            res.render('singleUser', {
                user,
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            res.json(error);
        }
    }, 

    //login a user
    //Use username and password to login
    login: async (req, res)=>{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({error: 'You must provide a valid email and password'});
        }
        try {
            const userData = await User.findAll({
                where: {
                    email: req.body.email
                }
            });
            if(!userData){
                return res.status(400).json({error: 'There is no user with that email'});
            }
            const userFound = userData.get({ plain: true });
            if(!userFound){
                return res.status(400).json({error: 'There is no user with that email'});
            }
            const verifiedPassword = await bcrypt.compare(password, userFound.password);
            if(!verifiedPassword){
                return res.status(400).json({error: 'Invalid password'});
            }

            req.session.save(()=>{
                req.session.loggedIn = true;
                req.session.user = userFound;
                req.session.user_id = userFound.id;
                res.json({ success: true });
            });
        } catch (error) {
            res.json(error);
        }
    }, 
    //signup a user
    signupHandler: async (req, res)=>{
        const { email, username, password }= req.body;
        try{
            const createdUser = await User.create({ email, username, password});
            const user = createdUser.get({plain: true});
            req.session.save(()=>{
                req.session.loggedIn = true;
                req.session.user = user;
                req.session.user_id = user.id;
                res.json({ success: true});
            });
        } catch(error) {
            res.json(error);
        }
    }, 
    loginView: (req, res)=>{
        if(req.session.loggedIn){
            return res.redirect('/dashboard');
        }
        res.render('login');
    },
    signupView: (req, res)=>{
        if(req.session.loggedIn){
            return res.redirect('/dashboard');
        }
    },
    logout: (req, res)=>{
        req.session.destroy(()=>{
            res.send({status: true});
        })
    }, 
}