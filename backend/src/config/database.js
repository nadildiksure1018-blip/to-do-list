const mongoose = require('mongoose');

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.Mongo_URI);

        console.log('database connected successfully...');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;