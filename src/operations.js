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

const executeEmpIdQuery = function(allTransactions, args) {
  let id = args[args.indexOf("--empId") + 1];
  let extractedTransactions = allTransactions[id];
  return extractedTransactions;
};

const isTransOfTheDay = function(date, id, empTrans) {
  let oneTimeTrans = empTrans;
  oneTimeTrans["id"] = id;
  let dateAndTime = empTrans["dateAndTime"].slice(0, 10);
  return date === dateAndTime;
};

const extractEachEmp = function(date, empTrans) {
  let id = empTrans[0];
  return empTrans[1].filter(isTransOfTheDay.bind(null, date, id));
};

const executeDateQuery = function(allTransactions, args) {
  let transDetails = Object.entries(allTransactions);
  let date = args[args.indexOf("--date") + 1];
  if (args.includes("--empId")) {
    transDetails = executeEmpIdQuery(allTransactions, args);
    transDetails = [[args[args.indexOf("--empId") + 1], transDetails]];
  }
  transDetails = transDetails.map(extractEachEmp.bind(null, date));
  return transDetails;
};

exports.executeEmpIdQuery = executeEmpIdQuery;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
exports.executeDateQuery = executeDateQuery;
exports.extractEachEmp = extractEachEmp;
exports.isTransOfTheDay = isTransOfTheDay;
