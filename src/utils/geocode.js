const request = require('request');

const geocodes = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJvdXR0ZWNobm9sb2dpZXMiLCJhIjoiY2tjZ2YydW9tMHJodDJybm5lbDh2ZG5hZiJ9.ittjM71cx-QSN4G5BMK90A&limit=1'
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('unable to access geocode service!', undefined)
        } else if(body.features.length === 0){
            callback('inalid input', undefined)
        } else{
            let data = {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                place: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocodes