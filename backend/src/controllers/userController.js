const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const newUser = new User( {email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if(error.code == 11000){
            console.log("user duplicated error");
            return res.status(400).json({message:"user already exists..."})
            
        }
        res.status(500).json({message:error.message});
    } 
};

const loginUser = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:'email not exist'});
        }

        if(password !== user.password){
            return res.status(404).json({message:'invalid password'});
        }
        
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.MY_SECRET_KEY,
            { expiresIn: "1h" }  
        )
        
        res.status(200).json({
            message:'login successful...',
            token:token
        });

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createUser, loginUser};