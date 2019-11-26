const getSaveMessage = function() {
  let printingMsg = "Transaction Recorded:";
  printingMsg = printingMsg + "\nEmployee ID, Beverage, Quantity, Date\n";
  return printingMsg;
};

const getQueryMessage = function() {
  let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
  return printingMsg;
};

const getSavedDetails = function(newTransaction, id) {
  let savedDetails = id + ",";
  savedDetails = savedDetails + newTransaction[id]["beverage"];
  savedDetails = savedDetails + "," + newTransaction[id]["qty"];
  savedDetails = savedDetails + "," + newTransaction[id]["dateAndTime"];
  return savedDetails;
};

const getUsageMsg = function() {
  let usageSave = "save ==> --save --beverage [beverageName]";
  usageSave = usageSave + " --empId [empId] --qty [quantity]\n ";
  let usageQuery = "query ==> --query --empId [existingEmployee]";
  return usageSave + usageQuery;
};

exports.getSaveMessage = getSaveMessage;
exports.getQueryMessage = getQueryMessage;
exports.getSavedDetails = getSavedDetails;
exports.getUsageMsg = getUsageMsg;
