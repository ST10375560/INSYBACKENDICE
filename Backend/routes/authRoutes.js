import express from 'express';

const router = express.Router();

//Add basic route
router.get('/login', (req, res) => {
    res.send ('Welcome to the PhotoShare API LOGIN ROUTE')

});

export default router;

