const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const cookieParser = require('cookie-parser')

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies['auth_token']
        const decoded = jwt.verify(token,"secretOfToken")
        const user = await User.findOne({_id: decoded._id,'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token
        next()
    }catch(e){
        console.log(e);
        
        res.status(401).send({ error: 'Please authenticate.' })    
    }
}
module.exports = auth