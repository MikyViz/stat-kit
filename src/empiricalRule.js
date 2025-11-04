function empiricalRule(mean, stddev) {
  return {
    oneSigma: {
      lower: mean - stddev,
      upper: mean + stddev,
      coverage: 0.68
    },
    twoSigma: {
      lower: mean - 2 * stddev,
      upper: mean + 2 * stddev,
      coverage: 0.95
    },
    threeSigma: {
      lower: mean - 3 * stddev,
      upper: mean + 3 * stddev,
      coverage: 0.997
    }
  };
}
module.exports = empiricalRule;
