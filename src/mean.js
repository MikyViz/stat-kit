function mean(arr) {
  if (!arr.length) return null;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}
module.exports = mean;
