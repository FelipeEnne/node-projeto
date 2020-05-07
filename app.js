const express = require('express');

const router = express.Router();
router.get('/', (req, res)=>{
    res.send("pkosda");
})


const app = express();
app.use('/',router);

module.exports = app;