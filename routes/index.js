const express = require('express');

const router = express.Router();
router.get('/', (req, res)=>{
    let obj = {
        nome:'Felipe',
        mostrar:true,
        arr:[
            {n:1},
            {n:2}
        ],

    }
    res.render('home',obj)
})

module.exports = router;