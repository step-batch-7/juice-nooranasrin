const getSaveMessage = function() {
  let printingMsg = "Transaction Recorded:\n";
  return printingMsg;
};

const getHeader = function() {
  let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
  return printingMsg;
};

const getTransactionDetails = function(transaction) {
  let id = transaction["id"];
  let beverage = transaction["beverage"];
  let qty = transaction["qty"];
  let date = transaction["dateAndTime"];
  return `${id},${beverage},${qty},${date}`;
};

const getUsageMsg = function() {
  let usageSave = "save ==> --save --beverage [beverageName]";
  usageSave = usageSave + " --empId [empId] --qty [quantity]\n ";
  let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
  usageQuery =
    usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
  usageQuery = usageQuery + "--query --date [valid date]";
  return usageSave + usageQuery;
};

exports.getSaveMessage = getSaveMessage;
exports.getHeader = getHeader;
exports.getTransactionDetails = getTransactionDetails;
exports.getUsageMsg = getUsageMsg;
