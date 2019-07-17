const express = require('express');
const app = express();
const Animals = require('./models/animals')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', {
        animals: Animals
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

module.exports = app;