const validation = require("./validation");
const { isValidLength, isValidSavePair, isValidQueryPair } = validation;
const operations = require("./operations");
const { save, query } = operations;

const getNewTransactionObj = function(cmdLineArg, date) {
  let id = cmdLineArg[cmdLineArg.indexOf("--empId") + 1];
  let qty = cmdLineArg[cmdLineArg.indexOf("--qty") + 1];
  let beverage = cmdLineArg[cmdLineArg.indexOf("--beverage") + 1];
  let dateAndTime = date;
  let newTransaction = {
    [id]: { beverage: beverage, qty: qty, dateAndTime: dateAndTime }
  };
  return newTransaction;
};

const getPair = function(cmdLineArg) {
  let pairs = [];
  for (let index = 0; index <= cmdLineArg.length - 1; index += 2) {
    pairs.push([cmdLineArg[index], cmdLineArg[index + 1]]);
  }
  return pairs;
};

const performTransactions = function(cmdLineArg, date, previousData, path) {
  let pairs = getPair(cmdLineArg.slice(1));
  let isValidSaveOptions = pairs.every(isValidSavePair);
  let isValidQueryOption = isValidQueryPair(pairs[0], previousData);
  let isValidSaveLength = isValidLength(cmdLineArg.length, 7);
  let isValidQueryLength = isValidLength(cmdLineArg.length, 3);
  if (cmdLineArg[0] == "--save" && isValidSaveOptions && isValidSaveLength) {
    let newTransaction = getNewTransactionObj(cmdLineArg, date);
    return save(previousData, newTransaction, path);
  }
  if (cmdLineArg[0] == "--query" && isValidQueryOption && isValidQueryLength) {
    let id = cmdLineArg[cmdLineArg.indexOf("--empId") + 1];
    return query(previousData, id);
  }
  let usageSave =
    "save ==> --save --beverage [beverageName] --empId [empId] --qty [quantity]\n ";
  let usageQuery = "query ==> --query --empId [existingEmployee]";
  return usageSave + usageQuery;
};

exports.getPair = getPair;
exports.getNewTransactionObj = getNewTransactionObj;
exports.performTransactions = performTransactions;
