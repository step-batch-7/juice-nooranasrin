const recordTransaction = require("./utilities").recordTransaction;

const addNewTransaction = function(beverageRecords, newTransaction) {
  let beverageLog = beverageRecords.slice();
  beverageLog.push(newTransaction);
  return beverageLog;
};

const save = function(beverageRecords, newTransaction, path, utilFuc) {
  let beverageLog = addNewTransaction(beverageRecords, newTransaction);
  utilFuc.recordTransaction(path, beverageLog);
  return [newTransaction];
};

const isThisEmployee = function(id, transaction) {
  return transaction["id"] === id;
};

const executeEmpIdQuery = function(beverageRecords, args) {
  let id = args[args.indexOf("--empId") + 1];
  return beverageRecords.filter(isThisEmployee.bind(null, id));
};

const isTransOfTheDay = function(date, transaction) {
  let transDate = new Date(transaction["dateAndTime"]);
  let inputDate = new Date(date);
  let isMonthEqual = inputDate.getMonth() == transDate.getMonth();
  let isDayEqual = inputDate.getDate() == transDate.getDate();
  let isYearEqual = inputDate.getYear() == transDate.getYear();
  return isMonthEqual && isDayEqual && isYearEqual;
};

const executeDateQuery = function(beverageRecords, args) {
  let beverageLog = beverageRecords.slice();
  let date = args[args.indexOf("--date") + 1];
  if (args.includes("--empId")) {
    beverageLog = executeEmpIdQuery(beverageRecords, args);
  }
  return beverageLog.filter(isTransOfTheDay.bind(null, date));
};

exports.executeEmpIdQuery = executeEmpIdQuery;
exports.save = save;
exports.addNewTransaction = addNewTransaction;
exports.executeDateQuery = executeDateQuery;
exports.isTransOfTheDay = isTransOfTheDay;
exports.isThisEmployee = isThisEmployee;
