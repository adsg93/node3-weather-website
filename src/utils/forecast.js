const request = require('request');

let forecast = (lat, lon, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=96b1d93dede38066e0ee78eef728e07e&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon);
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('unable to access forecast service!', undefined)
        } else if(body.error){
            callback('incorrect input', undefined)
        } else{
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast
