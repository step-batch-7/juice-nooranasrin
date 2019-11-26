const assert = require("assert");
const printMsg = require("../src/printingMessegeLib");
const {
  getSaveMessage,
  getQueryMessage,
  getSavedDetails,
  getUsageMsg
} = printMsg;

describe("getSaveMessage", function() {
  it("should return the expected string back", function() {
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n";
    let actual = getSaveMessage();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getQueryMessage", function() {
  it("should return the expected string back", function() {
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    let actual = getQueryMessage();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getSaveDetails", function() {
  it("should return the expected formatted string", function() {
    let date = new Date().toJSON();
    let expected = "111,orange,3" + "," + date;
    let testInput = {
      111: { beverage: "orange", qty: "3", dateAndTime: date }
    };
    let actual = getSavedDetails(testInput, 111);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testGetUsageMsg", function() {
  it("should return the specified message", function() {
    let usageSave = "save ==> --save --beverage [beverageName]";
    usageSave = usageSave + " --empId [empId] --qty [quantity]\n ";
    let usageQuery = "query ==> --query --empId [existingEmployee]";
    let expected = usageSave + usageQuery;
    assert.deepStrictEqual(getUsageMsg(), expected);
  });
});
