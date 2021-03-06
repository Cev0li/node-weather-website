const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FzMzc5IiwiYSI6ImNsMGc0NWV3cTB2ZGQzbG51emRucGU3MmQifQ.UIq_WDPbBJotJpHcLcKaCA&limit=1'

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to location services.')
        } else if(body.features.length === 0){ 
            callback(undefined, 'Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


//NON REUSABLE FUNCTION EXAMPLE 
// request({url: mapurl, json: true}, (error, response) => {

//     if(error){
//         console.log('Unable to connect to weather service')
//     } else if(response.body.features.length === 0){
//         console.log('Unable to find location')
//     }else{

//     const lat = response.body.features[0].center[1]
//     const long = response.body.features[0].center[0]

//     console.log("LAT= " + lat + "\nLONG= " + long)
//     }
// })


module.exports = geocode