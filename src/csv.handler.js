const config = require('./config');
const axios = require('axios');
const csvtojson = require('csvtojson');

module.exports.fetchCsv = async () => {
    return axios.get(config.S3_CSV_URL)
        .then(response => csvtojson({ eol: "\n", checkColumn: true }).fromString(response.data));
};