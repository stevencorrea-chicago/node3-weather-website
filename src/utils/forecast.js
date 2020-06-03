const request = require('request')


const forecast = (latitude, longitude, placeName, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e85dc6d25a758822a43c06dc580e54d5&query=' + 
                             latitude + ',' + longitude + '&units=f'
    request({url, json:true}, (error,  { body } ) => {
        // setting the json:true key, value pair above means the response is no longer a string
        // and will be a JSON object which does not need to be parsed
        //const data = JSON.parse(response.body)
        //console.log(weatherstackURL)
        //console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service.')
        } else if(body.error) {
            callback('Unable to find location. Verify the location was entered correctly and try again.')
        } else {
            console.log(body)
            const temperature_unit = () => {
                switch(body.request.unit){
                    case 'm':
                        return 'celsius';
                    case 'f':
                        return 'farenheit';
                    case 's':
                        return 'kelvin';
                };
            };
            
            if (body.current.temperature === body.current.feelslike){
                const return_value = ("It is currently " + body.current.temperature + 
                " degrees "  + temperature_unit() + ", and it feels like " 
                + body.current.feelslike + " degrees " + 
                temperature_unit() + ".")
                callback(undefined, return_value)
            } else{
                const return_value = ("It is currently " + body.current.temperature + 
                        " degrees "  + temperature_unit() + ", but it feels like " 
                        + body.current.feelslike + " degrees " + 
                        temperature_unit() + ".")
                callback(undefined, return_value)
            }
            
        }
    })
}

module.exports = forecast