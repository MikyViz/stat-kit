const mean = require('./mean');
const stddev = require('./stddev');

function skewness(arr) {
  const n = arr.length;
  if (n < 3) return null;

  const avg = mean(arr);
  const sd = stddev(arr);

  const sumCubed = arr.reduce((sum, val) => {
    return sum + Math.pow((val - avg) / sd, 3);
  }, 0);

  return (n / ((n - 1) * (n - 2))) * sumCubed;
}
module.exports = skewness;
