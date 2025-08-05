import express from 'express'; 
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

// Load environment variables from .env file
dotenv.config();

// initialise express app
const app = express();
const PORT = process.env.PORT || 5000;

//middleware to parse JSON bodies
app.use(express.json());

//Add basic route
app.get('/', (req, res) => {
    res.send ('Welcome to the PhotoShare API')

});

//use mkcert-generated certificates for https
const sslOptions = {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem')
}

//HTTPS Server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
})

// Start server
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });



