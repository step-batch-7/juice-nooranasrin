const getSaveMessage = function() {
  return `Transaction Recorded:\n`;
};

const getHeader = function() {
  return `Employee ID, Beverage, Quantity, Date\n`;
};

const getTotalMsg = function(total) {
  return total == 1 ? `Total: ${total} Juice` : `Total: ${total} Juices`;
};

const getTransactionDetails = function(transaction) {
  let empId = transaction.empId;
  let beverage = transaction.beverage;
  let qty = transaction.qty;
  let date = transaction.date;
  return `${empId},${beverage},${qty},${date}`;
};

const getUsageMsg = function() {
  let usageSave = `save ==> --save --beverage [beverageName]`;
  usageSave = usageSave + " --empId [empId] --qty [quantity]\n ";
  let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
  usageQuery =
    usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
  usageQuery = usageQuery + "--query --date [valid date]";
  return `${usageSave}${usageQuery}`;
};

exports.getSaveMessage = getSaveMessage;
exports.getHeader = getHeader;
exports.getTransactionDetails = getTransactionDetails;
exports.getUsageMsg = getUsageMsg;
exports.getTotalMsg = getTotalMsg;
