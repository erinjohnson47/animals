const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const Animals = require('./models/animals')

app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.get('/animals', (req, res) => {
    res.render('index.ejs', {
        animals: Animals
    })
})

app.post('/animals', (req, res) => {
    console.log(req.body);
    if (req.body.isWild === 'on') {
        req.body.isWild = true;
    } else {
        req.body.isWild = false;
    }
    Animals.push(req.body);
    res.redirect('/animals');
});

app.get('/animals/new', (req, res) => {
    res.render('new.ejs')
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

module.exports = app;