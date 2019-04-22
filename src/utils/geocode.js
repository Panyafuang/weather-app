const request = require('request');

const geocode = (address, cb) =>{
    const key = 'pk.eyJ1IjoicGFueWFmdWFuZyIsImEiOiJjanR6ZGN6ZHgzM2FqNDRvNHdremVxeHg3In0.fqDukviMOvjStMxedeR5eA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;

    request({url, json:true}, (err, {body}) =>{
        if(err){
            cb('Unable to conneted server :(', undefined);
        }else if(body.features.length === 0){
            cb('Unable to finded location. Try another search.', undefined);
        }else{
            const {center:[longitude, latitude], place_name:location} = body.features[0];     
            cb(undefined, { latitude, longitude, location });
        }
    });
}

module.exports = geocode;