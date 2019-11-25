const recordTransaction = require("./utilities").recordTransaction;

const addNewTransaction = function(allTransactions, newTransaction, id) {
  allTransactions[id].push(newTransaction);
  return allTransactions;
};

const save = function(allTransactions, newTransaction, path) {
  let id = Object.keys(newTransaction)[0];
  if (!Object.keys(allTransactions).includes(id)) {
    allTransactions[id] = [];
  }
  allTransactions = addNewTransaction(allTransactions, newTransaction[id], id);
  recordTransaction(path, allTransactions);
  let printingMsg =
    "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n";
  let savedDetails =
    "," +
    newTransaction[id]["beverage"] +
    "," +
    newTransaction[id]["qty"] +
    "," +
    newTransaction[id]["dateAndTime"];
  return printingMsg + id + savedDetails;
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
  let transactionsStr = extractedTransactions.map(
    getTransactionDetails.bind(null, id)
  );
  let totalTransactions = extractedTransactions.reduce(total, 0);
  let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
  return (
    printingMsg +
    transactionsStr.join("\n") +
    "\n" +
    totalTransactions.toString()
  );
};

exports.query = query;
exports.total = total;
exports.getTransactionDetails = getTransactionDetails;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
