const request = require('request')

const geocodeMapbox = (address, callback) => {
    const encoded_address = encodeURI(address)
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encoded_address + ".json?access_token=pk.eyJ1Ijoic3RldmVuY29ycmVhIiwiYSI6ImNrYW9jcmdjOTIwdDgycnMwMDJtdmIxd2gifQ.ok8gc427jRVJ0i2L4dDFNQ&limit=1"

    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Mapbox is down.')
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location. Verify the location was entered correctly and try again.')
        }
        else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                placeName : body.features[0].place_name
            })
       }
    })
}

module.exports = geocodeMapbox
