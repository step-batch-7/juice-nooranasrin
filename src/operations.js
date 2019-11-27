const recordTransaction = require("./utilities").recordTransaction;

const addNewTransaction = function(allTransactions, newTransaction) {
  let beverageLog = allTransactions.slice();
  beverageLog.push(newTransaction);
  return beverageLog;
};

const save = function(allTransactions, newTransaction, path, utilFuc) {
  allTransactions = addNewTransaction(allTransactions, newTransaction);
  utilFuc.recordTransaction(path, allTransactions);
  return [newTransaction];
};

const isThisEmployee = function(id, transaction) {
  return transaction["id"] === id;
};

const executeEmpIdQuery = function(allTransactions, args) {
  let id = args[args.indexOf("--empId") + 1];
  return allTransactions.filter(isThisEmployee.bind(null, id));
};

const isTransOfTheDay = function(date, empTrans) {
  let transDate = new Date(empTrans["dateAndTime"]);
  let inputDate = new Date(date);
  let isMonthEqual = inputDate.getMonth() == transDate.getMonth();
  let isDayEqual = inputDate.getDate() == transDate.getDate();
  let isYearEqual = inputDate.getYear() == transDate.getYear();
  return isMonthEqual && isDayEqual && isYearEqual;
};

const executeDateQuery = function(allTransactions, args) {
  let transDetails = allTransactions.slice();
  let date = args[args.indexOf("--date") + 1];
  if (args.includes("--empId")) {
    transDetails = executeEmpIdQuery(allTransactions, args);
  }
  return transDetails.filter(isTransOfTheDay.bind(null, date));
};

exports.executeEmpIdQuery = executeEmpIdQuery;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
exports.executeDateQuery = executeDateQuery;
exports.isTransOfTheDay = isTransOfTheDay;
