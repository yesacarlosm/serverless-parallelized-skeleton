const config = require('./config');
const axios = require('axios');

const getLocationUrl = (text) => {
    return `${config.METAWEATHER_BASE_URL}location/search/?query=${text}`;
}

const getForecastsUrl = (woeid) => {
    return `${config.METAWEATHER_BASE_URL}location/${woeid}/`;
}

module.exports.fetchLocations = async (data) => {
    const promiseArray = data.map(item => axios.get(getLocationUrl(item.Location)).then(result => result.data));
    return Promise.all(promiseArray).then(result => result.map(item => item[0]));
};

module.exports.fetch5DaysForecast = async (data) => {
    const promiseArray = data.map(item => axios.get(getForecastsUrl(item.woeid)).then(result => result.data));
    return Promise.all(promiseArray);
}

module.exports.buildResponseObject = async (data) => {
    const promiseArray = data.map(item => {
        return {
            [item.title]: item.consolidated_weather.map(value => {
                return {
                    "date": value.applicable_date,
                    "temp": value.the_temp,
                    "weather": value.weather_state_name
                }
            })
        }
    })
    return Promise.all(promiseArray);
}