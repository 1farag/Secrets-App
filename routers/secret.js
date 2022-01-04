const express = require('express');
const bodyParser = require('body-parser')
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const Secret = require('../models/secretModel');
const router = express.Router();


router.get('/submit',auth,(req,res)=>{
    res.render('submit')
})
router.post('/submit',auth,async(req,res)=>{
    const newSecret = new Secret({
        ...req.body,
        owner: req.user._id
    })
    try {
        await newSecret.save()
        res.redirect('/secrets')
   } catch (e) {
       res.redirect('/submit')
       console.log(e);
   }
})

router.get('/secrets',(req,res)=>{
    const secret = Secret.find({},(err,secrets)=>{
        if (err) {
            console.log(err);
        } else if(secrets){
            res.render('secrets',{secrets})
        }
    })
   
})
module.exports = router