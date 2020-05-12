const express = require('express');

const router = express.Router();
router.get('/', (req, res)=>{
    let nome = req.query.nome;
    res.send("Hola "+nome);
})

router.get('/posts/:id', (req, res)=>{
    let id = req.param.id;

    res.send("ID");
})

router.get('/sobre', (req, res)=>{
    res.send("sobre");
})


module.exports = router;