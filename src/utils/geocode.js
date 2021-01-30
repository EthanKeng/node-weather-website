const request = require('request')
const geocode = (address, callback) => {
    const mapurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoid293aXN5b3UiLCJhIjoiY2trZGUyaXprMThydDJ2cjFoYjZxeXN3NSJ9.NCdH1aRMqT7StDh7VkOcIA&limit=1"
    request({ url: mapurl, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to MapBox service', undefined)
        } else if (response.body.features.length == 0) {
            callback('Unable to find the name of location, try again with another term', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].geometry.coordinates[1],
                longitude : response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            })

        }
    })
}
module.exports = geocode