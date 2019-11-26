const assert = require("assert");
const performOperations = require("../src/performOperations");
const {
  getNewTransactionObj,
  getUsageMsg,
  addNewTransaction,
  total,
  getTransactionDetails,
  performQueryCmd,
  performSaveCmd
} = performOperations;

describe("testGetNewTransactionObj", function() {
  let date = new Date().toJSON();
  it("should create a new object with specified keys", function() {
    let actual = getNewTransactionObj(
      ["--beverage", "orange", "--qty", "1", "--empId", "111"],
      date
    );
    let expected = {
      "111": { beverage: "orange", qty: "1", dateAndTime: date }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should assign undefined if the key is not exist", function() {
    let actual = getNewTransactionObj([], date);
    let expected = {
      undefined: { beverage: undefined, qty: undefined, dateAndTime: date }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testPerformSaveCmd", function() {
  it("should record transaction if the option is --save", function() {
    let date = new Date().toJSON();
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date" +
      "\n" +
      "111,orange,2," +
      date;
    let cmdLineArg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "2"
    ];
    let actual = performSaveCmd(
      cmdLineArg,
      date,
      { 1: [{ beverage: "orange", qty: 1, dateAndTime: date }] },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testPerformQueryCmd", function() {
  it("should return transactions if the option is --query", function() {
    let date = new Date();
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = performQueryCmd(
      cmdLineArg,
      date,
      { 1: [{ beverage: "orange", qty: 3, dateAndTime: date }] },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});
