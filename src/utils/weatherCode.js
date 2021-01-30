const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const weatherUrl = "http://api.weatherstack.com/current?access_key=6c28facfa5708df4c4e2a6e08c5bb21a&query=" + latitude + "," + longitude
    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to Weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                // const humidity = body.current.humidity
                // const temperature = body.current.temperature
                // const feelslike = body.current.feelslike
                // const weather_descriptions = body.current.weather_descriptions[0]
                // // console.log(weather_descriptions + ". The humidity now is :", humidity)
                // console.log("And the temperature now is :", temperature, " but it feels like ", feelslike)
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions[0],
                weather_icon : body.current.weather_icons[0],
                forecast: body.current.weather_descriptions[0] + ". The humidity now is : " + body.current.humidity + "%. And the temperature now is :" + body.current.temperature + " degree, but it feels like "+ body.current.feelslike+" degree."
                        // const humidity = body.current.humidity
            })

        }
    })
}

module.exports = forecast