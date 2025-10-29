# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-29

### Added
- Initial release of stat-kit
- `mean(arr)` - Calculate mean/average
- `median(arr)` - Calculate median
- `stddev(arr)` - Calculate standard deviation
- `zScores(arr)` - Calculate z-scores for array
- `correlation(xArr, yArr)` - Calculate Pearson correlation coefficient
- `findOutliers(arr)` - Find outliers using IQR method
- `basicRange(arr)` - Calculate basic range (max - min)
- `iqrRange(arr)` - Calculate interquartile range
- `percentileRange(arr, low, high)` - Calculate range between percentiles
- `stddevRange(arr, mean, stddev, k)` - Calculate range based on standard deviations
- `skewness(arr)` - Calculate distribution skewness
- `sortByX(data)` / `sortByY(data)` - Sort array of objects by x or y property
- Input validation for all functions
- Comprehensive documentation in README
- MIT License

[1.0.0]: https://github.com/MikyViz/stat-kit/releases/tag/v1.0.0
