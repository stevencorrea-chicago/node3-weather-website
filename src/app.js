// nodemon src/app.js -e js,hbs
// git-scm.com

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocodeMapbox = require('./utils/geocodeMapbox')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: `Steve Correa`
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: `Steve Correa`
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'Help page being rendered dynamically',
        title: 'Help',
        name: 'Steve Correa'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocodeMapbox(req.query.address, (error, {latitude, longitude, placeName}={}) => {
        if (error){
            return res.send({ error })
        }
        else {
            forecast(latitude, longitude, placeName, (error, forecastData) => {
                if (error){
                    return res.send({ error })
                } 
                
                    return res.send({ 
                        forecast: forecastData,
                        placeName,
                        address: req.query.address })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)

    res.send({
        products: req.query.search,
        rating: req.query.rating
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Help',
        name: 'Steve Correa'
    })
    // res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 Error: The page you requested is not found',
        title: 'Help',
        name: 'Steve Correa'
    })
})


app.listen(port, () => { 
    console.log('Server is up on port ' + port + '!')
}) 
