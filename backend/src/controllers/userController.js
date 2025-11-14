const User = require('./models/User');

const createUser = async (req, res) =>{
    try {
        const {username, password} = req.body;
        const newUser = new User( {username, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    } 
};

module.exports = createUser;