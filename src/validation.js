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

const isValidDate = function(date) {
  let bits = date.split("-");
  let isDateValid = new Date(bits[0], bits[1] - 1, bits[2]);
  return isDateValid.getMonth() + 1 == bits[1] && bits[0] != 0;
};

const isValidQueryPair = function(allTransactions, pair) {
  isIdValid = isValidNumber(pair[1]);
  let isDateValid = pair[1] && isValidDate(pair[1]);
  let isBeverageValid = pair[1] && isValidBeverage(pair[1]);
  isBeverageValid = isBeverageValid && pair[0] == "--beverage";
  isIdValid = isIdValid && pair[0] == "--empId";
  isDateValid = isDateValid && pair[0] == "--date";
  return isIdValid || isDateValid || isBeverageValid;
};

const isValidSaveArgs = function(pairs, cmdLineArg) {
  let isValidSaveOptions = pairs.every(isValidSavePair);
  let isValidSaveLength = isValidLength(cmdLineArg.length, 7);
  return isValidSaveOptions && isValidSaveLength && cmdLineArg[0] == "--save";
};

const isValidQueryArgs = function(pairs, cmdLineArg, previousData) {
  let length = cmdLineArg.length;
  let isValidQueryOption = pairs.every(
    isValidQueryPair.bind(null, previousData)
  );
  let isValidQueryLength =
    isValidLength(length, 3) ||
    isValidLength(length, 5) ||
    isValidLength(length, 7);
  return isValidQueryOption && isValidQueryLength && cmdLineArg[0] == "--query";
};

exports.isValidNumber = isValidNumber;
exports.isValidLength = isValidLength;
exports.isValidOption = isValidOption;
exports.isValidBeverage = isValidBeverage;
exports.isValidSavePair = isValidSavePair;
exports.isValidQueryPair = isValidQueryPair;
exports.isValidSaveArgs = isValidSaveArgs;
exports.isValidQueryArgs = isValidQueryArgs;
exports.isValidDate = isValidDate;
