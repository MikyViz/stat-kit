function basicRange(arr) {
  if (!arr.length) return null;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return max - min;
}

function percentileRange(arr, lower = 0.05, upper = 0.95) {
  if (arr.length < 2) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const qLow = quantile(sorted, lower);
  const qHigh = quantile(sorted, upper);
  return qHigh - qLow;
}

function iqrRange(arr) {
  return percentileRange(arr, 0.25, 0.75);
}

function stddevRange(arr, mean, stddev, k = 2) {
  return {
    lower: mean - k * stddev,
    upper: mean + k * stddev
  };
}

function quantile(sortedArr, q) {
  const pos = (sortedArr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sortedArr[base + 1] !== undefined) {
    return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
  } else {
    return sortedArr[base];
  }
}

module.exports = {
  basicRange,
  iqrRange,
  percentileRange,
  stddevRange
};
