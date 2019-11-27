const operations = require("./operations");
const { save, executeEmpIdQuery, executeDateQuery } = operations;
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

const performSaveCmd = function(args, previousData, utilFunc, path) {
  let date = utilFunc.generateDate().toJSON();
  let id = args[args.indexOf("--empId") + 1];
  let newTransaction = getNewTransactionObj(args, date);
  let savedDetails = save(previousData, newTransaction, path, utilFunc);
  return getSaveMessage() + getSavedDetails(newTransaction, id);
};

const extractEachEmp = function(id, empTrans) {
  return empTrans.map(getTransactionDetails.bind(null, id)).join("\n");
};

const extractEachEmpForTotal = function(sum, empTrans) {
  sum = empTrans.reduce(total, sum);
  return sum;
};

const performQueryCmd = function(args, previousData) {
  let id = args[args.indexOf("--empId") + 1];
  let extractedTrans = [executeEmpIdQuery(previousData, args)];
  if (args.includes("--date")) {
    extractedTrans = executeDateQuery(previousData, args);
  }
  let totalTrans = extractedTrans.reduce(extractEachEmpForTotal, 0);
  extractedTrans = extractedTrans.map(extractEachEmp.bind(null, id)).join("\n");
  return getQueryMessage() + extractedTrans + "\n" + totalTrans;
};

exports.getNewTransactionObj = getNewTransactionObj;
exports.performSaveCmd = performSaveCmd;
exports.performQueryCmd = performQueryCmd;
exports.extractEachEmpForTotal = extractEachEmpForTotal;
exports.extractEachEmp = extractEachEmp;
