const { workerData, parentPort, isMainThread } = require('worker_threads');
const weatherHandler = require('./weather.handler');

weatherHandler.fetchLocations(workerData)
    .then(locations => {
        weatherHandler.fetch5DaysForecast(locations)
            .then(forecasts => {
                weatherHandler.buildResponseObject(forecasts)
                    .then(response => {
                        parentPort.postMessage({ response })
                    })
            })
    })