import express from 'express'; 
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import routes from './routes/index.js';  

// Load environment variables from .env file
dotenv.config();

// initialise express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017'

//middleware to parse JSON bodies
app.use(express.json());

//Routes
app.use('/api', routes);


// use mkcertificates for HTTPs
const ssloptions = {
    key: fs.readFileSync('certs/localhost-key.pem'),
    cert: fs.readFileSync('certs/localhost.pem')
};

//Add mongodb connection
mongoose.connect(MONGODB_URI, {

}).then(() => { 
    console.log('Connected to MongoDB');

}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

///HTTPS Server
https.createServer(ssloptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});



// Start server
 //app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
 //});



