const isValidLength = function(length, size) {
  return length == size;
};

const isValidNumber = function(number) {
  return Number.isInteger(+number) && +number > 0;
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
  return beverages.includes(beverage.toLowerCase());
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

const isValidSaveArgs = function(pairs, cmdLineArg) {
  let isValidSaveOptions = pairs.every(isValidSavePair);
  let isValidSaveLength = isValidLength(cmdLineArg.length, 7);
  return isValidSaveOptions && isValidSaveLength && cmdLineArg[0] == "--save";
};

const isValidQueryArgs = function(pairs, cmdLineArg, previousData) {
  let isValidQueryOption = isValidQueryPair(pairs[0], previousData);
  let isValidQueryLength = isValidLength(cmdLineArg.length, 3);
  return isValidQueryOption && isValidQueryLength && cmdLineArg[0] == "--query";
};

exports.isValidNumber = isValidNumber;
exports.isValidLength = isValidLength;
exports.isValidOption = isValidOption;
exports.isValidBeverage = isValidBeverage;
exports.isValidSavePair = isValidSavePair;
exports.isValidQueryPair = isValidQueryPair;
exports.isValidId = isValidId;
exports.isValidSaveArgs = isValidSaveArgs;
exports.isValidQueryArgs = isValidQueryArgs;
