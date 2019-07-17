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
    });
});

app.get('/animals/new', (req, res) => {
    res.render('new.ejs', {
        animals: Animals
    }) 
});

app.get('/animals/:id', (req, res) => {
    res.render('show.ejs', {
        animals: Animals[req.params.id],
        id: req.params.id
    });
});

app.post('/animals', (req, res) => {
    if (req.body.isWild === 'on') {
        req.body.isWild = true;
    } else {
        req.body.isWild = false;
    }
    Animals.push(req.body);
    res.redirect('/animals');
});

app.get('/animals/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        animals: Animals[req.params.id],
        id: req.params.id
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
});

module.exports = app;