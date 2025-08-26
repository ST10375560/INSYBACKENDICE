import express from 'express';

const router = express.Router();

//Add basic route
router.get('/create', (req, res) => {
    res.send ('Welcome to the PhotoShare API USER ROUTE')

});

export default router;

