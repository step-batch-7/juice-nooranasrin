const recordTransaction = require("./utilities").recordTransaction;

const addNewTransaction = function(beverageRecords, newTransaction) {
  let beverageLog = beverageRecords.slice();
  beverageLog.push(newTransaction);
  return beverageLog;
};

const save = function(beverageRecords, newTransaction, fileOperations) {
  let beverageLog = addNewTransaction(beverageRecords, newTransaction);
  recordTransaction(beverageLog, fileOperations);
  return [newTransaction];
};
//------------------------------------------------------------------------------//

const filterTransactions = function(beverage, date, empId, transaction) {
  let empIdOpt = empId || transaction.empId;
  let dateOpt = date || transaction.date;
  let beverageOpt = beverage || transaction.beverage;
  let validId = empIdOpt == transaction.empId;
  let validBeverage = beverageOpt == transaction.beverage;
  let validDate = isTransOfTheDay(dateOpt, transaction);
  return validBeverage && validId && validDate;
};

const isTransOfTheDay = function(date, transaction) {
  let transDate = new Date(transaction.date);
  let inputDate = new Date(date);
  let isMonthEqual = inputDate.getMonth() == transDate.getMonth();
  let isDayEqual = inputDate.getDate() == transDate.getDate();
  let isYearEqual = inputDate.getYear() == transDate.getYear();
  return isMonthEqual && isDayEqual && isYearEqual;
};

const executeQuery = function(beverage, date, empId, beverageRecords) {
  return beverageRecords.filter(
    filterTransactions.bind(null, beverage, date, empId)
  );
};
//------------------------------------------------------------------------------

exports.save = save;
exports.addNewTransaction = addNewTransaction;
exports.isTransOfTheDay = isTransOfTheDay;
exports.filterTransactions = filterTransactions;
exports.executeQuery = executeQuery;
