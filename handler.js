'use strict';
const { Worker } = require('worker_threads');
const csvHandler = require('./src/csv.handler');
const utils = require('./src/utils');


module.exports.endpoint = (event, context, callback) => {
  csvHandler.fetchCsv()
    .then(rows => {
      runParallel(rows)
        .then(result => {
          return callback(null, utils.response(200, result));
        })
    })
    .catch(error => {
      return callback(null, utils.response(500, error.message));
    });
};

function runParallel(data) {
  let promisesArray = [];
  utils.breakArray(data, 5).forEach(part => {
    return promisesArray.push(new Promise((resolve, reject) => {
      const worker = new Worker('./src/parallelization.handler.js', { workerData: part });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      })
    }))
  })

  return Promise.all(promisesArray);
}