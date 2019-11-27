const assert = require("chai").assert;
const printMsg = require("../src/printingMessegeLib");
const {
  getSaveMessage,
  getHeader,
  getTransactionDetails,
  getUsageMsg
} = printMsg;

//-------------------------getSaveMessage-------------------------------

describe("getSaveMessage", function() {
  it("should return the expected string back", function() {
    let expected = "Transaction Recorded:\n";
    let actual = getSaveMessage();
    assert.deepStrictEqual(actual, expected);
  });
});

//---------------------------getHeader---------------------------

describe("getHeader", function() {
  it("should return the expected string back", function() {
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    let actual = getHeader();
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------getTransactionDetails---------------------------

describe("getTransactionDetails", function() {
  it("should return the expected formatted string", function() {
    let date = new Date().toJSON();
    let expected = "111,orange,3" + "," + date;
    let testInput = {
      id: "111",
      beverage: "orange",
      qty: "3",
      dateAndTime: date
    };
    let actual = getTransactionDetails(testInput, 111);
    assert.deepStrictEqual(actual, expected);
  });
});

//--------------------------------testGetUsageMsg--------------------

describe("testGetUsageMsg", function() {
  it("should return the specified message", function() {
    let usageSave = "save ==> --save --beverage [beverageName]";
    usageSave = usageSave + " --empId [empId] --qty [quantity]\n ";
    let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
    usageQuery =
      usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
    usageQuery = usageQuery + "--query --date [valid date]";
    let expected = usageSave + usageQuery;
    assert.strictEqual(getUsageMsg(), expected);
  });
});
