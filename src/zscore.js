const mean = require('./mean');
const stddev = require('./stddev');

function zScores(arr) {
  const avg = mean(arr);
  const sd = stddev(arr);
  return arr.map(val => (val - avg) / sd);
}
module.exports = zScores;
