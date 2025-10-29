const mean = require('./mean');
const stddev = require('./stddev');
const { validate } = require('./utils');

function zScores(arr) {
  validate(arr, 'zScores');
  const avg = mean(arr);
  const sd = stddev(arr);
  return arr.map(val => (val - avg) / sd);
}
module.exports = zScores;
