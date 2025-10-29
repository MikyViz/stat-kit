function validate(arr, funcName) {
  if (!Array.isArray(arr)) {
    throw new TypeError(`${funcName}: expected an array, got ${typeof arr}`);
  }
  if (arr.length === 0) {
    throw new Error(`${funcName}: array cannot be empty`);
  }
  if (!arr.every(x => typeof x === 'number' && !isNaN(x))) {
    throw new TypeError(`${funcName}: all elements must be valid numbers`);
  }
}

function validateTwoArrays(arr1, arr2, funcName) {
  validate(arr1, funcName);
  validate(arr2, funcName);
  if (arr1.length !== arr2.length) {
    throw new Error(`${funcName}: arrays must have equal length`);
  }
}

module.exports = { validate, validateTwoArrays };
