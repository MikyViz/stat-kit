const mean = require('./mean');
const stddev = require('./stddev');
const { validateTwoArrays } = require('./utils');

function correlation(xArr, yArr) {
  validateTwoArrays(xArr, yArr, 'correlation');
  const xMean = mean(xArr);
  const yMean = mean(yArr);
  const xStd = stddev(xArr);
  const yStd = stddev(yArr);

  const sum = xArr.reduce((acc, x, i) => {
    const zX = (x - xMean) / xStd;
    const zY = (yArr[i] - yMean) / yStd;
    return acc + zX * zY;
  }, 0);

  return sum / (xArr.length - 1);
}
module.exports = correlation;
