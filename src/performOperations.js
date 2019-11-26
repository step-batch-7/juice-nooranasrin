const validation = require("./validation");
const { isValidSaveArgs, isValidQueryArgs } = validation;
const operations = require("./operations");
const { save, query } = operations;
const printMsg = require("./printingMessegeLib");
const {
  getSaveMessage,
  getQueryMessage,
  getSavedDetails,
  getUsageMsg
} = printMsg;
const queryDetails = require("./queryDetailsLib");
const { getTransactionDetails, total } = queryDetails;

const getNewTransactionObj = function(cmdLineArg, date) {
  let id = cmdLineArg[cmdLineArg.indexOf("--empId") + 1];
  let qty = cmdLineArg[cmdLineArg.indexOf("--qty") + 1];
  let beverage = cmdLineArg[cmdLineArg.indexOf("--beverage") + 1];
  let newTransaction = {
    [id]: { beverage: beverage, qty: qty, dateAndTime: date }
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

const performTransactions = function(args, date, previousData, path) {
  let id = args[args.indexOf("--empId") + 1];
  let pairs = getPair(args.slice(1));
  if (isValidSaveArgs(pairs, args)) {
    let newTransaction = getNewTransactionObj(args, date);
    let savedDetails = save(previousData, newTransaction, path);
    return getSaveMessage() + getSavedDetails(newTransaction, id);
  }
  if (isValidQueryArgs(pairs, args, previousData)) {
    let extractedTransaction = query(previousData, id);
    let totalTransaction = extractedTransaction.reduce(total, 0);
    extractedTransaction = extractedTransaction
      .map(getTransactionDetails.bind(null, id))
      .join("\n");
    return getQueryMessage() + extractedTransaction + "\n" + totalTransaction;
  }
  return getUsageMsg();
};

exports.getPair = getPair;
exports.getNewTransactionObj = getNewTransactionObj;
exports.performTransactions = performTransactions;
