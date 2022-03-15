const request = require('request')

const forecast = (lat, long, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=73c8f89b3d62fe25f9d375bbf181a579&query=' + lat + ',' + long + '&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services.')
        } else if(body.error){
            callback('Unable to find location.')
        } else {
            callback(undefined,
            body.current.weather_descriptions[0] +
            '. The current temperature is ' + body.current.temperature + ' degrees.' +
            ' It feels like ' + body.current.feelslike + ' degrees. Wind speed registers at ' +
            body.current.wind_speed + ' mph. Humidity: ' + body.current.humidity + '%.')
        }
    })
}


//NOT REUSABLE FUNCTION EXAMPLE
// request({url: wStackurl, json: true}, (error, response) =>{

//     if(error){
//         console.log('Unable to connect to weather service.')
//     } else if(response.body.error) {
//         console.log('Unable to find location')
//     } else {
//     const data = response.body.current

//     console.log(data.weather_descriptions)
//     console.log('The current temperature is ' + data.temperature + ' degrees')
//     console.log('Although it feels like ' + data.feelslike + ' degrees')
//     }
// })
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)




module.exports = forecast