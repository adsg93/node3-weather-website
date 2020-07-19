const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const geocodes = require('./utils/geocode')

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

const app = express();

//setup handlebars library
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(publicDirPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather',
        name: 'Amandeep Singh',
        mob: '999-964-4229',
        mail: 'trout.technologies@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address key:value pair is missing'
        })
    }   
    geocodes(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        } else{
            forecast(data.lat, data.lon, (error, temp) =>{
                if(error){
                    return res.send({
                        error: error
                    })
                } else{
                    return res.send({
                        lat: data.lat,
                        lon: data.lon,
                        place: data.place,
                        currentTemp: temp
                    })
                    
                }
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Amandeep Singh',
        mob: '999-964-4229',
        mail: 'trout.technologies@gmail.com'
    })
})

app.get('/about/*', (req, res) =>{
    res.render('404',{
        message: 'help article not found'})
})

app.get('*', (req, res) => {
    res.render('404',{
        message:'404 page'})
})

app.listen(3000, () =>{
    console.log('server is up')
})