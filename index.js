const mean = require('./src/mean');
const median = require('./src/median');
const stddev = require('./src/stddev');
const zScores = require('./src/zscore');
const correlation = require('./src/correlation');
const { sortByX, sortByY } = require('./src/sort');
const skewness = require('./src/skewness');
const { detectOutliersIQR, detectOutliersSigma } = require('./src/outliers');
const range = require('./src/range');
const { zToPercentile, percentileToZ, probabilityBetween, confidenceIntervalZ, zTable } = require('./src/ztable');
const empiricalRule = require('./src/empiricalRule');
const quantile = require('./src/quantile');

module.exports = {
  mean,
  median,
  stddev,
  empiricalRule,
  zScores,
  correlation,
  sortByX,
  sortByY,
  skewness,
  detectOutliersIQR,
  detectOutliersSigma,
  ...range,
  // Z-Table functions
  zToPercentile,
  percentileToZ,
  probabilityBetween,
  confidenceIntervalZ,
  zTable,
  // Quantile function
  quantile
};
