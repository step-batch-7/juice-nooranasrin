const fs = require("fs");

const recordTransaction = function(path, transactionObj) {
  let transactionStr = JSON.stringify(transactionObj);
  fs.writeFileSync(path, transactionStr, "utf8");
};

exports.recordTransaction = recordTransaction;
