const validation = require("./validation");
const { isValidSaveArgs, isValidQueryArgs } = validation;
const getUsageMsg = require("./printingMessegeLib").getUsageMsg;
const transactions = require("./performOperations");
const getBeverageRecord = require("./utilities").getBeverageRecord;
const { performSaveCmd, performQueryCmd } = transactions;

const getPair = function(cmdLineArg) {
  let pairs = [];
  for (let index = 0; index <= cmdLineArg.length - 1; index += 2) {
    pairs.push([cmdLineArg[index], cmdLineArg[index + 1]]);
  }
  return pairs;
};

const executeCmd = function(args, fileOperations, date) {
  let transactionFuncs = {
    "--save": performSaveCmd,
    "--query": performQueryCmd
  };
  let beverageLog = JSON.parse(getBeverageRecord(fileOperations));
  let pairs = getPair(args.slice(1));
  let isArgsValid = isValidSaveArgs(pairs, args);
  isArgsValid = isArgsValid || isValidQueryArgs(pairs, args, beverageLog);
  if (isArgsValid) {
    return transactionFuncs[args[0]](args, beverageLog, fileOperations, date);
  }
  return getUsageMsg();
};

exports.executeCmd = executeCmd;
exports.getPair = getPair;
