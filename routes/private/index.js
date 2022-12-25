const express = require('express')
const userRoutes = require('./userRoutes');
const router = express.Router();
const chatRoutes = require("./chatRoutes");
// DEFINE PREFIX OF YOUR PRIVATE ROUTES HERE
// EXMP : router.use('/ROUTE-NAME', ROUTENAME)

router.use("/api/user",userRoutes);
router.use("/api/chat",chatRoutes);

module.exports = router;
