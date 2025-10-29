# 📊 stat-kit

[![npm version](https://img.shields.io/npm/v/@mikyviz/stat-kit.svg)](https://www.npmjs.com/package/@mikyviz/stat-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**stat-kit** is a lightweight npm package for basic statistics and data analysis. Zero dependencies, pure math.

## 📦 Installation

```bash
npm install @mikyviz/stat-kit
```

## 🚀 Quick Start

```javascript
const { mean, median, stddev, correlation, findOutliers } = require('@mikyviz/stat-kit');

const data = [12, 15, 14, 10, 8, 12, 100];

console.log(mean(data));         // 24.43
console.log(median(data));       // 12
console.log(stddev(data));       // 32.77
console.log(findOutliers(data)); // [100]
```

## 📐 API

### Basic Statistics

#### `mean(arr)`
Returns the mean (average) of an array.

```javascript
mean([1, 2, 3, 4, 5]); // 3
```

#### `median(arr)`
Returns the median (middle value).

```javascript
median([1, 2, 3, 4, 5]); // 3
median([1, 2, 3, 4]);    // 2.5
```

#### `stddev(arr)`
Returns the standard deviation (measure of data spread).

```javascript
stddev([2, 4, 4, 4, 5, 5, 7, 9]); // ~2.14
```

---

### Z-Scores and Correlation

#### `zScores(arr)`
Returns an array of standardized values (z-scores).

```javascript
zScores([1, 2, 3]); // [-1.22, 0, 1.22]
```

#### `correlation(xArr, yArr)`
Calculates Pearson correlation coefficient between two arrays (-1 to 1).

```javascript
const height = [150, 160, 165, 170, 180];
const weight = [50, 60, 65, 70, 80];
correlation(height, weight); // ~0.99 (strong positive correlation)
```

---

### Outliers

#### `findOutliers(arr)`
Returns an array of outliers using the IQR (Interquartile Range) method:
- Outlier is a value beyond $ Q1 - 1.5 \cdot IQR $ or $ Q3 + 1.5 \cdot IQR $

```javascript
findOutliers([1, 2, 3, 4, 5, 100]); // [100]
```

---

### Ranges

#### `basicRange(arr)`
Basic range: maximum minus minimum.

```javascript
basicRange([10, 20, 30]); // 20
```

#### `iqrRange(arr)`
Interquartile range (IQR): $ Q3 - Q1 $

```javascript
iqrRange([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 4
```

#### `percentileRange(arr, low = 5, high = 95)`
Range between specified percentiles (default 5%–95%).

```javascript
percentileRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // ~[1.45, 9.55]
```

#### `stddevRange(arr, mean, stddev, k = 1)`
Range based on standard deviations: $ \mu \pm k\sigma $

```javascript
const data = [10, 12, 14, 16, 18];
stddevRange(data, mean(data), stddev(data), 2); // [6.34, 21.66]
```

---

### Skewness

#### `skewness(arr)`
Analyzes distribution skewness:
- **> 0** → right-skewed (long right tail)
- **< 0** → left-skewed (long left tail)
- **≈ 0** → symmetric distribution

```javascript
skewness([1, 2, 3, 4, 5]);        // ~0 (symmetric)
skewness([1, 1, 1, 2, 3, 10]);    // >0 (right-skewed)
```

---

### Sorting

#### `sortByX(data)` / `sortByY(data)`
Sorts an array of objects by the `x` or `y` property.

```javascript
const points = [{x: 3, y: 1}, {x: 1, y: 5}, {x: 2, y: 3}];
sortByX(points); // [{x:1, y:5}, {x:2, y:3}, {x:3, y:1}]
```

---

## 💡 Usage Examples

### Student Grades Analysis

```javascript
const { mean, median, stddev, findOutliers } = require('@mikyviz/stat-kit');

const grades = [85, 90, 78, 92, 88, 76, 95, 30, 89];

console.log(`Mean: ${mean(grades).toFixed(1)}`);              // 80.3
console.log(`Median: ${median(grades)}`);                     // 88
console.log(`Standard Deviation: ${stddev(grades).toFixed(1)}`); // 19.3
console.log(`Outliers: ${findOutliers(grades)}`);            // [30]
```

### Correlation Between Variables

```javascript
const { correlation } = require('@mikyviz/stat-kit');

const studyHours = [2, 3, 5, 7, 8];
const examScores = [55, 60, 75, 85, 90];

const corr = correlation(studyHours, examScores);
console.log(`Correlation: ${corr.toFixed(2)}`); // ~0.99
```

---

## 📄 License

MIT © Michael & Copilot

## 🔗 Links

- [GitHub Repository](https://github.com/MikyViz/stat-kit)
- [npm Package](https://www.npmjs.com/package/@mikyviz/stat-kit)
- [Report Issues](https://github.com/MikyViz/stat-kit/issues)
