const fs = require("fs");

const recordTransaction = function(transactionObj, fileOperations) {
  let encoding = fileOperations.encoding;
  let write = fileOperations.write;
  let path = fileOperations.path;
  let transactionStr = JSON.stringify(transactionObj);
  write(path, transactionStr, encoding);
};

const getBeverageRecord = function(fileOperations) {
  let exist = fileOperations.exist;
  let read = fileOperations.read;
  let write = fileOperations.write;
  let encoding = fileOperations.encoding;
  let content = fileOperations.content;
  let path = fileOperations.path;
  if (!exist(path) || read(path, encoding) == "") {
    write(path, content, encoding);
  }
  return read(path, encoding);
};

const getFileOperations = function(path) {
  let fileOperations = {};
  fileOperations.read = fs.readFileSync;
  fileOperations.write = fs.writeFileSync;
  fileOperations.exist = fs.existsSync;
  fileOperations.encoding = "utf8";
  fileOperations.content = "[]";
  fileOperations.path = path;
  return fileOperations;
};

exports.getBeverageRecord = getBeverageRecord;
exports.recordTransaction = recordTransaction;
exports.getFileOperations = getFileOperations;
