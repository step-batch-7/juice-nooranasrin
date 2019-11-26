const fs = require("fs");

const recordTransaction = function(path, transactionObj) {
  let transactionStr = JSON.stringify(transactionObj);
  fs.writeFileSync(path, transactionStr, "utf8");
};

const getPreviousData = function(path) {
  if (!fs.existsSync(path) || fs.readFileSync(path, "utf8") == "") {
    fs.writeFileSync(path, "{}", "utf8");
  }
  let previousData = fs.readFileSync(path, "utf8");
  return JSON.parse(previousData);
};

exports.getPreviousData = getPreviousData;
exports.recordTransaction = recordTransaction;
