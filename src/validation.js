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
    "banana",
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

const isValidId = function(id, allTransactions) {
  let keys = Object.keys(allTransactions);
  return keys.includes(id);
};

const isValidQueryPair = function(pair, allTransactions) {
  let isNumberValid = isValidNumber(pair[1]);
  return (
    pair[0] == "--empId" && isNumberValid && isValidId(pair[1], allTransactions)
  );
};

exports.isValidNumber = isValidNumber;
exports.isValidLength = isValidLength;
exports.isValidOption = isValidOption;
exports.isValidBeverage = isValidBeverage;
exports.isValidSavePair = isValidSavePair;
exports.isValidQueryPair = isValidQueryPair;
exports.isValidId = isValidId;
