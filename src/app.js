const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weatherCode')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Keng',
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: '現在の天気は？',
        name: 'Keng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'トリセツ',
        name: 'Keng',
        helpText: '場所や住所を入力すると天気情報が出てきます'

    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({
            error: 'You have to provide an adress'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        // console.log('Data:', data)

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.forecast,
                location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     // page: 'Weather Page',
    //     location: 'tokyo',
    //     address: req.query.address,

    //     forecast: [11, 9, 'cloudy'],
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You have to provide a search term'
        })
    }
    console.log(req.query.test)
    console.log(req.query)

    res.send({
        prodcuts: [],
    })
})

// The order is important!
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help- 404 page',
        name: 'Keng',
        errorMessage: 'Help article not found',
    })
})

//again, the order is important!
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Keng',
        errorMessage: 'Page not found',
    })

})

//let server to listen and we can set up a specific port
app.listen(port, () => {
    console.log('Server is up on port ', port)
})



//setup a new route to handler request 
//app.get('/YourFileNameOrDirectoryName',(req,res)=>{XXXX})
// app.get('/help', (req, res) => {
//     res.send({
//         message:'Here is the Help Page',
//         date:'2021/01/28'

//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<title>About Page</title><h1>About Page</h1>')
// })

