const recordTransaction = require("./utilities").recordTransaction;

const getSaveMessage = function() {
  let printingMsg = "Transaction Recorded:";
  printingMsg = printingMsg + "\nEmployee ID, Beverage, Quantity, Date\n";
  return printingMsg;
};

const getQueryMessage = function() {
  let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
  return printingMsg;
};

const addNewTransaction = function(allTransactions, newTransaction, id) {
  allTransactions[id].push(newTransaction);
  return allTransactions;
};

const getSavedDetails = function(newTransaction, id) {
  let savedDetails = id + ",";
  savedDetails = savedDetails + newTransaction[id]["beverage"];
  savedDetails = savedDetails + "," + newTransaction[id]["qty"];
  savedDetails = savedDetails + "," + newTransaction[id]["dateAndTime"];
  return savedDetails;
};

const save = function(allTransactions, newTransaction, path) {
  let id = Object.keys(newTransaction)[0];
  if (!Object.keys(allTransactions).includes(id)) {
    allTransactions[id] = [];
  }
  allTransactions = addNewTransaction(allTransactions, newTransaction[id], id);
  recordTransaction(path, allTransactions);
  let printingMsg = getSaveMessage();
  let savedDetails = getSavedDetails(newTransaction, id);
  return printingMsg + savedDetails;
};

const getTransactionDetails = function(id, allTransactions) {
  let beverage = allTransactions.beverage;
  let qty = allTransactions.qty;
  let date = allTransactions.dateAndTime;
  return id + "," + beverage + "," + qty + "," + date;
};

const total = function(sum, element) {
  let quantity = +element.qty;
  return sum + quantity;
};

const query = function(allTransactions, id) {
  let extractedTransactions = allTransactions[id];
  let transactionsStr = extractedTransactions
    .map(getTransactionDetails.bind(null, id))
    .join("\n");
  let totalTransactions = extractedTransactions.reduce(total, 0).toString();
  let printingMsg = getQueryMessage();
  return printingMsg + transactionsStr + "\n" + totalTransactions;
};

exports.query = query;
exports.total = total;
exports.getTransactionDetails = getTransactionDetails;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
exports.getSaveMessage = getSaveMessage;
exports.getQueryMessage = getQueryMessage;
exports.getSavedDetails = getSavedDetails;
