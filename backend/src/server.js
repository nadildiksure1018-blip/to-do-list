require('dotenv').config();

const cors = require('cors');
const express = require('express');
const port = process.env.PORT;
const connectDB = require('./config/database.js');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/user',userRoutes);

app.listen(port, () =>{
    console.log(`sever is running on http://localhost:${port}`);
});