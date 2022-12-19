const express = require('express')
const userRoutes = require('./userRoutes');
const router = express.Router();

// DEFINE PREFIX OF YOUR PRIVATE ROUTES HERE
// EXMP : router.use('/ROUTE-NAME', ROUTENAME)

router.use("/",userRoutes);

module.exports = router;
