require('dotenv').config();

const express = require('express');
const port = process.env.PORT;
const connectDB = require('./config/database.js');

const app = express();
app.use(express.json());

connectDB();

app.listen(port, () =>{
    console.log(`sever is running on http://localhost:${port}`);
});