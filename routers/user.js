const express = require('express');
const bodyParser = require('body-parser')
const User = require('../models/userModel');
const { redirect } = require('express/lib/response');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const cookieParser = require('cookie-parser')

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true}));


router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email : req.body.email,
        password: req.body.password
    })
    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.cookie('auth_token', token)
        res.redirect("/submit")
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post("/login",async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

     const user = await User.findOne({ email})
            if (!user) {
            
                res.redirect("/login")
            }else{
                bcrypt.compare(password, user.password);
                const token = await user.generateAuthToken()
                res.cookie('auth_token', token)
    
                res.redirect('/submit')
            }
          

})

router.post('/logout',auth,async (req,res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !==  req.token
      })
      await req.user.save();
      res.redirect('/login')
    } catch (e) {
      res.status(500).send(e)
    }
  })
module.exports = router