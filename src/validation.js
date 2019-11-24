const isValidLength = function(length, size) {
  return length == size;
};

const isValidNumber = function(number) {
  return !/\D/.test(number);
};

const isValidOption = function(option) {
  let options = ["--beverage", "--empId", "--qty"];
  return options.includes(option);
};

const isValidBeverage = function(beverage) {
  let beverages = [
    "orange",
    "grapes",
    "mango",
    "watermelon",
    "papaya",
    "pomegranate",
    "muskmelon",
    "butterfruit",
    "apple",
    "lemon",
    "pineapple",
    "strawberry",
    "carrot",
    "tomato"
  ];
  return beverages.includes(beverage);
};

const isValidSavePair = function(pair) {
  let isOptionValid = isValidOption(pair[0]);
  if (pair[0] == "--beverage") {
    isBeverageValid = isValidBeverage(pair[1]);
    return isValidOption && isBeverageValid;
  }
  let isNumberValid = isValidNumber(pair[1]);
  return isOptionValid && isNumberValid;
};

const isValidQueryPair = function(pair) {
  let isNumberValid = isValidNumber(pair[1]);
  return pair[0] == "--empId" && isNumberValid;
};

exports.isValidNumber = isValidNumber;
exports.isValidLength = isValidLength;
exports.isValidOption = isValidOption;
exports.isValidBeverage = isValidBeverage;
exports.isValidSavePair = isValidSavePair;
exports.isValidQueryPair = isValidQueryPair;
