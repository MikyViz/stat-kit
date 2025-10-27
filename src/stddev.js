const mean = require('./mean');

function stddev(arr) {
  const avg = mean(arr);
  const variance = arr.reduce((sum, val) => sum + (val - avg) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}
module.exports = stddev;
