const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf8', (err, data) => {
        if(err){
            res.send({result: 0, text: 'Error!'})
        } else {
            res.send(data)
        }
    })
});


// app.get()
// app.post()
// app.put()
// app.delete()

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// app.get('/api/users/:id', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
//     // res.send('Hello World!');
// });

app.listen(3000, () => console.log('Server started....'));