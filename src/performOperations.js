const operations = require("./operations");
const {
  save,
  executeEmpIdQuery,
  executeDateQuery,
  executeBeverageQuery,
  isKeyPresent,
  isTransOfTheDay,
  executeQuery
} = operations;
const printMsg = require("./printingMessegeLib");
const {
  getSaveMessage,
  getHeader,
  getTransactionDetails,
  getTotalMsg
} = printMsg;

const total = function(totalQty, transaction) {
  let quantity = +transaction.qty;
  return totalQty + quantity;
};

const performSaveCmd = function(args, previousData, fileOperations, date) {
  let timeStamp = date();
  let cmdLineArg = [...args, "--date", timeStamp];
  let newTransaction = getNewTransactionObj(cmdLineArg);
  let savedDetails = save(previousData, newTransaction, fileOperations);
  savedDetails[0].date = savedDetails[0].date.toJSON();
  savedDetails = savedDetails.map(getTransactionDetails);
  return getSaveMessage() + getHeader() + savedDetails;
};

const getNewTransactionObj = function(cmdLineArg) {
  let args = {};
  for (let index = 1; index < cmdLineArg.length; index += 2) {
    args[cmdLineArg[index].slice(2)] = cmdLineArg[index + 1];
  }
  return args;
};

const performQueryCmd = function(args, previousData) {
  const cmdLineArg = getNewTransactionObj(args);
  const { beverage, date, empId } = cmdLineArg;
  let extractedTrans = executeQuery(beverage, date, empId, previousData);
  let totalTrans = extractedTrans.reduce(total, 0);
  extractedTrans = extractedTrans.map(getTransactionDetails).join("\n");
  return `${getHeader()}${extractedTrans}\n${getTotalMsg(totalTrans)}`;
};

exports.getNewTransactionObj = getNewTransactionObj;
exports.performSaveCmd = performSaveCmd;
exports.performQueryCmd = performQueryCmd;
exports.total = total;
