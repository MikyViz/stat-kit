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
const { 
  mean, 
  median, 
  stddev, 
  correlation,
  linearRegression,
  detectOutliersIQR,
  detectOutliersSigma,
  empiricalRule,
  zToPercentile 
} = require('@mikyviz/stat-kit');

const data = [12, 15, 14, 10, 8, 12, 100];

console.log(mean(data));                    // 24.43
console.log(median(data));                  // 12
console.log(stddev(data));                  // 32.77
console.log(detectOutliersIQR(data));       // [100]
console.log(detectOutliersSigma(data));     // [100]

// Empirical Rule (68-95-99.7)
console.log(empiricalRule(mean(data), stddev(data)));

// Linear Regression
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 5, 4, 5];
const model = linearRegression(x, y);
console.log(model.predict(6)); // 5.8

// Z-table functions
console.log(zToPercentile(1.96)); // 0.975 (97.5th percentile)
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

### Empirical Rule (68-95-99.7 Rule)

#### `empiricalRule(mean, stddev)`
Returns intervals for the empirical rule in normal distributions:
- **68%** of data falls within ±1σ (one standard deviation)
- **95%** of data falls within ±2σ (two standard deviations)
- **99.7%** of data falls within ±3σ (three standard deviations)

```javascript
const data = [10, 12, 14, 16, 18, 20];
const m = mean(data);    // 15
const s = stddev(data);  // ~3.42

const intervals = empiricalRule(m, s);

console.log(intervals);
/*
{
  oneSigma: { lower: 11.58, upper: 18.42, coverage: 0.68 },
  twoSigma: { lower: 8.16, upper: 21.84, coverage: 0.95 },
  threeSigma: { lower: 4.74, upper: 25.26, coverage: 0.997 }
}
*/
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

### Linear Regression

#### `linearRegression(x, y)`
Performs simple linear regression using the least squares method. Returns a model object with slope, intercept, R², and a predict function.

```javascript
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 5, 4, 5];

const model = linearRegression(x, y);

console.log(model.slope);      // 0.6 (slope/gradient)
console.log(model.intercept);  // 2.2 (y-intercept)
console.log(model.r2);         // 0.6 (coefficient of determination)

// Make predictions
console.log(model.predict(6)); // 5.8
console.log(model.predict(10)); // 8.2
```

**Return object:**
- `slope` — наклон линии регрессии (коэффициент b в y = a + bx)
- `intercept` — точка пересечения с осью Y (коэффициент a)
- `r2` — коэффициент детерминации (0-1, показывает качество модели)
- `predict(x)` — функция для предсказания значения y по заданному x

---

### Z-Table (Standard Normal Distribution)

#### `zToPercentile(z, usePrecise = true)`
Converts a z-score to cumulative probability (percentile). Uses precise error function approximation by default.

```javascript
zToPercentile(0);      // 0.5 (50th percentile)
zToPercentile(1.96);   // 0.975 (97.5th percentile)
zToPercentile(-1.96);  // 0.025 (2.5th percentile)
zToPercentile(2.576);  // 0.995 (99.5th percentile)
```

#### `percentileToZ(p)`
Converts cumulative probability to z-score (inverse of zToPercentile).

```javascript
percentileToZ(0.5);    // 0 (median)
percentileToZ(0.975);  // ~1.96
percentileToZ(0.025);  // ~-1.96
```

#### `probabilityBetween(z1, z2)`
Calculates the probability that a value falls between two z-scores.

```javascript
probabilityBetween(-1.96, 1.96);  // 0.95 (95% confidence interval)
probabilityBetween(-1, 1);        // 0.6827 (68% within 1 SD)
probabilityBetween(-2, 2);        // 0.9545 (95.45% within 2 SD)
```

#### `confidenceIntervalZ(confidenceLevel)`
Returns the z-score for a given confidence level (two-tailed).

```javascript
confidenceIntervalZ(0.90);  // 1.645
confidenceIntervalZ(0.95);  // 1.96
confidenceIntervalZ(0.99);  // 2.576
```

#### `zTable`
Direct access to the z-table lookup object for advanced usage.

```javascript
const { zTable } = require('@mikyviz/stat-kit');
console.log(zTable['1.96']);  // 0.975
```

---

### Outliers Detection

#### `detectOutliersIQR(arr)`
Detects outliers using the **IQR (Interquartile Range) method**:
- Outlier is any value beyond $ Q1 - 1.5 \cdot IQR $ or $ Q3 + 1.5 \cdot IQR $
- Requires at least 4 data points

```javascript
detectOutliersIQR([1, 2, 3, 4, 5, 100]); // [100]
detectOutliersIQR([10, 12, 14, 16, 18, 50]); // [50]
```

#### `detectOutliersSigma(arr, threshold = 3)`
Detects outliers using the **Empirical Rule (σ method)**:
- Outlier is any value beyond $ \mu \pm k\sigma $ (default k=3)
- More sensitive to extreme values than IQR
- Requires at least 2 data points

```javascript
detectOutliersSigma([1, 2, 3, 4, 5, 100]);     // [100]
detectOutliersSigma([1, 2, 3, 4, 5, 100], 2);  // [100] (more sensitive)
```

**When to use which method:**
- **IQR method** (`detectOutliersIQR`): Robust to extreme values, good for skewed distributions
- **Sigma method** (`detectOutliersSigma`): Better for normal distributions, customizable sensitivity

---

### Quantile Calculation

#### `quantile(sortedArr, q)`
Calculates the quantile for a **sorted** array.
- `q = 0.25` → Q1 (first quartile)
- `q = 0.5` → median
- `q = 0.75` → Q3 (third quartile)

```javascript
const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
quantile(sorted, 0.25); // 2.5 (Q1)
quantile(sorted, 0.5);  // 5 (median)
quantile(sorted, 0.75); // 7.5 (Q3)
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
const { 
  mean, 
  median, 
  stddev, 
  detectOutliersIQR,
  detectOutliersSigma,
  empiricalRule 
} = require('@mikyviz/stat-kit');

const grades = [85, 90, 78, 92, 88, 76, 95, 30, 89];

console.log(`Mean: ${mean(grades).toFixed(1)}`);              // 80.3
console.log(`Median: ${median(grades)}`);                     // 88
console.log(`Standard Deviation: ${stddev(grades).toFixed(1)}`); // 19.3
console.log(`Outliers (IQR): ${detectOutliersIQR(grades)}`);  // [30]
console.log(`Outliers (3σ): ${detectOutliersSigma(grades)}`); // [30]

// Expected grade ranges
const intervals = empiricalRule(mean(grades), stddev(grades));
console.log(`68% of students scored between ${intervals.oneSigma.lower.toFixed(1)} and ${intervals.oneSigma.upper.toFixed(1)}`);
```

### Correlation Between Variables

```javascript
const { correlation } = require('@mikyviz/stat-kit');

const studyHours = [2, 3, 5, 7, 8];
const examScores = [55, 60, 75, 85, 90];

const corr = correlation(studyHours, examScores);
console.log(`Correlation: ${corr.toFixed(2)}`); // ~0.99
```

### Predicting Sales with Linear Regression

```javascript
const { linearRegression } = require('@mikyviz/stat-kit');

// Historical data: advertising spend (in thousands) vs sales
const adSpend = [10, 15, 20, 25, 30, 35, 40];
const sales = [120, 150, 170, 195, 210, 240, 260];

const model = linearRegression(adSpend, sales);

console.log(`Sales = ${model.intercept.toFixed(2)} + ${model.slope.toFixed(2)} × Ad Spend`);
console.log(`R² = ${model.r2.toFixed(3)} (model quality)`);

// Predict sales for $50k ad spend
const predictedSales = model.predict(50);
console.log(`Predicted sales for $50k ad spend: $${predictedSales.toFixed(2)}k`);

// Expected output:
// Sales = 80.00 + 4.29 × Ad Spend
// R² = 0.983 (model quality)
// Predicted sales for $50k ad spend: $294.50k
```

### Comparing Outlier Detection Methods

```javascript
const { 
  detectOutliersIQR, 
  detectOutliersSigma,
  mean,
  stddev 
} = require('@mikyviz/stat-kit');

const measurements = [98, 100, 102, 99, 101, 98, 100, 99, 150, 2];

console.log('Data:', measurements);
console.log(`Mean: ${mean(measurements).toFixed(1)}`);
console.log(`Std Dev: ${stddev(measurements).toFixed(1)}`);

// IQR method - robust to extremes
const iqrOutliers = detectOutliersIQR(measurements);
console.log(`IQR Outliers: ${iqrOutliers}`); // [150, 2]

// Sigma method with default threshold (3σ)
const sigmaOutliers3 = detectOutliersSigma(measurements, 3);
console.log(`3σ Outliers: ${sigmaOutliers3}`); // [150, 2]

// Sigma method with stricter threshold (2σ)
const sigmaOutliers2 = detectOutliersSigma(measurements, 2);
console.log(`2σ Outliers: ${sigmaOutliers2}`); // [150, 2] (more sensitive)
```

### Using Empirical Rule for Quality Control

```javascript
const { empiricalRule, mean, stddev } = require('@mikyviz/stat-kit');

// Manufacturing part dimensions (in mm)
const dimensions = [50.1, 50.0, 49.9, 50.2, 50.1, 49.8, 50.0, 50.1];

const m = mean(dimensions);
const s = stddev(dimensions);

const ranges = empiricalRule(m, s);

console.log('Quality Control Ranges:');
console.log(`Target: ${m.toFixed(2)} mm`);
console.log(`Warning range (±1σ, 68%): ${ranges.oneSigma.lower.toFixed(2)} - ${ranges.oneSigma.upper.toFixed(2)} mm`);
console.log(`Action range (±2σ, 95%): ${ranges.twoSigma.lower.toFixed(2)} - ${ranges.twoSigma.upper.toFixed(2)} mm`);
console.log(`Reject range (±3σ, 99.7%): ${ranges.threeSigma.lower.toFixed(2)} - ${ranges.threeSigma.upper.toFixed(2)} mm`);
```

### Calculating Confidence Intervals

```javascript
const { confidenceIntervalZ, zToPercentile, probabilityBetween } = require('@mikyviz/stat-kit');

// Find z-score for 95% confidence interval
const z95 = confidenceIntervalZ(0.95);
console.log(`Z-score for 95% CI: ±${z95.toFixed(2)}`); // ±1.96

// What percentile is a z-score of 1.5?
console.log(`Z=1.5 is at ${(zToPercentile(1.5) * 100).toFixed(1)}th percentile`); // 93.3rd

// Probability of being within 1 standard deviation
console.log(`Probability within 1 SD: ${(probabilityBetween(-1, 1) * 100).toFixed(1)}%`); // 68.3%
```

---

## 📄 License

MIT © Michael David Vizenovsky

## 🔗 Links

- [GitHub Repository](https://github.com/MikyViz/stat-kit)
- [npm Package](https://www.npmjs.com/package/@mikyviz/stat-kit)
- [Report Issues](https://github.com/MikyViz/stat-kit/issues)
