const express = require('express');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cohort7.pmuwm.mongodb.net/Cohort7?retryWrites=true&w=majority&appName=Cohort7`)
.then(() => {
    console.log('connected to database');   
}).catch((err) => {
    console.log('something went wrong', err);  
});
app.use(cookieParser());
app.use(userRoutes);
app.use(postRoutes);
app.use(express.json());

app.listen(5000, () => {
    console.log('server running on port 5000');
});