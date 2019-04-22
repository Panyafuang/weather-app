const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
// PATH //
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../template/views');
const partialsDirectory = path.join(__dirname, '../template/partials');

// SET HANDLEBAR ENGINE //
app.set('view engine', 'hbs');
// CUSTOMIZING THE VIEW DIRECTORY //
app.set('views', viewsDirectory);
// SET PARTIALS OF .HBS FILE//
hbs.registerPartials(partialsDirectory);


// SET STATIC //
app.use(express.static(publicDirectory));



/**
 * ROUTE
 */
app.get('/', (req, res) =>{
    res.render('index', {title: "HOME", name: "Panyafuang"});
});

app.get('/about', (req, res) =>{
    res.render('about', {title: "ABOUT", name: "Panyafuang"});
});

app.get('/help', (req, res) =>{
    res.render('help', { title: "HELP", msg: 'ut I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth.', name: "Panyafuang"})
});

app.get('/help/*', (req, res) =>{
    res.render('404', {errormsg: 'Help article not found.', title: '404', name: 'Panyafuang'});
});

// WEATHER //
app.get('/weather', (req, res) =>{
    if(!req.query.location){
        return res.send({ err: 'You must provide a location'});
    }

    geocode(req.query.location, (err, {latitude, longitude, location} = {}) =>{ // this callback function is receive data from geocode function in geocode.js
        if(err){
            return res.send({err});
        }

        forecast(latitude, longitude, (err, forecastData) =>{
            if(err){
                return res.send({err});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.location
            });

        });
    });


});



// 404
app.get('*', (req, res) =>{
    res.render('404', {errormsg: '404 Page not found.', title: '404', name: 'Panyafuang'});
})





app.listen(3000, () => console.log('Server start on port: 3000'));