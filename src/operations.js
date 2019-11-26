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
  return newTransaction;
};

const query = function(allTransactions, args) {
  let id = args[args.indexOf("--empId") + 1];
  let extractedTransactions = allTransactions[id];
  return extractedTransactions;
};

exports.query = query;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
