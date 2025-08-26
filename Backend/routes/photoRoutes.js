import express from 'express';

const router = express.Router();

//Add basic route
router.get('/upload', (req, res) => {
    res.send ('Welcome to the PhotoShare API PHOTO ROUTE')

});

export default router;

