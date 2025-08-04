import express from 'express'; 
import dotenv from 'dotenv';

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

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



