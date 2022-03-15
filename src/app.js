
const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

// define paths for express config
const pubDirect = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

// setup static directory to serve
app.use(express.static(pubDirect))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Local Weather',
        name: 'Cevoli'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address query not provided. Resend with address query.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send ({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cevoli',
        MSG: 'Under Development'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Cevoli',
        MSG: 'Under Development'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Cevoli',
        MSG: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Cevoli',
        MSG: 'This page does not exist.'
    })
})

app.listen(3000, () => {

    console.log('Server is up on port 3000')

})