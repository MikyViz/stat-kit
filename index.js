const mean = require('./src/mean');
const median = require('./src/median');
const stddev = require('./src/stddev');
const zScores = require('./src/zscore');
const correlation = require('./src/correlation');
const { sortByX, sortByY } = require('./src/sort');
const skewness = require('./src/skewness');
const findOutliers = require('./src/outliers');
const range = require('./src/range');
const { zToPercentile, percentileToZ, probabilityBetween, confidenceIntervalZ, zTable } = require('./src/ztable');

module.exports = {
  mean,
  median,
  stddev,
  zScores,
  correlation,
  sortByX,
  sortByY,
  skewness,
  findOutliers,
  ...range,
  // Z-Table functions
  zToPercentile,
  percentileToZ,
  probabilityBetween,
  confidenceIntervalZ,
  zTable
};
