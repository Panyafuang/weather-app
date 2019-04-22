const request = require('request');

const forecast = (latitude, longitude, cb) =>{
    const key = '47bc3f46ee2c31533cf81a9af7a3de95';
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`;

    request({url, json: true}, (err, {body}) =>{
        if(err){
            cb('Unable to connected server :(', undefined);
        }else if(body.error){
            cb('Unable finded location', undefined);
        }else{
            // Destructuring Object
            const {apparentTemperature, precipProbability} = body.currently;
            const {summary} = body.daily.data[0];

            cb(undefined, `${summary} It's currently ${apparentTemperature} celsius. There is a ${precipProbability}% chance of rain.`);
        }
    });
}



module.exports = forecast;


