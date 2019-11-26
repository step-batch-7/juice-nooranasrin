const operations = require("./operations");
const { save, query } = operations;
const printMsg = require("./printingMessegeLib");
const { getSaveMessage, getQueryMessage, getSavedDetails } = printMsg;
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

const performSaveCmd = function(args, date, previousData, path) {
  let id = args[args.indexOf("--empId") + 1];
  let newTransaction = getNewTransactionObj(args, date);
  let savedDetails = save(previousData, newTransaction, path);
  return getSaveMessage() + getSavedDetails(newTransaction, id);
};

const performQueryCmd = function(args, date, previousData) {
  let id = args[args.indexOf("--empId") + 1];
  let extractedTransaction = query(previousData, args);
  let totalTransaction = extractedTransaction.reduce(total, 0);
  extractedTransaction = extractedTransaction
    .map(getTransactionDetails.bind(null, id))
    .join("\n");
  return getQueryMessage() + extractedTransaction + "\n" + totalTransaction;
};

exports.getNewTransactionObj = getNewTransactionObj;
exports.performSaveCmd = performSaveCmd;
exports.performQueryCmd = performQueryCmd;
