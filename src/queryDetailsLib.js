const getTransactionDetails = function(id, allTransactions) {
  let beverage = allTransactions.beverage;
  let qty = allTransactions.qty;
  let date = allTransactions.dateAndTime;
  return id + "," + beverage + "," + qty + "," + date;
};
const total = function(sum, element) {
  let quantity = +element.qty;
  return sum + quantity;
};

exports.total = total;
exports.getTransactionDetails = getTransactionDetails;
