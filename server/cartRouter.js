const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf8', (err, data) => {
        if(err){
            res.send({result: 0, text: 'Error!'})
        } else {
            res.send(data)
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});
router.put('/:id', (req, res) => {
	if (req.query.delete_item === '1'){
		handler(req, res, 'delete_item', 'server/db/userCart.json');
	}else{
		handler(req, res, 'change', 'server/db/userCart.json');
	}
    
});

module.exports = router;