const fs = require("fs");

const recordTransaction = function(path, transactionObj) {
  let transactionStr = JSON.stringify(transactionObj);
  fs.writeFileSync(path, transactionStr, "utf8");
};

const getBeverageRecord = function(path) {
  if (!fs.existsSync(path) || fs.readFileSync(path, "utf8") == "") {
    fs.writeFileSync(path, "{}", "utf8");
  }
  let previousData = fs.readFileSync(path, "utf8");
  return JSON.parse(previousData);
};

const generateDate = function() {
  return new Date();
};

exports.getBeverageRecord = getBeverageRecord;
exports.recordTransaction = recordTransaction;
exports.generateDate = generateDate;
