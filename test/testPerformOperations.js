const assert = require("chai").assert;
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

//-----------------------testGetNewTransactionObj------------------------

describe("testGetNewTransactionObj", function() {
  let date = new Date().toJSON();
  it("should create a new object with specified keys", function() {
    let actual = getNewTransactionObj(
      ["--beverage", "orange", "--qty", "1", "--empId", "111"],
      date
    );
    let expected = {
      id: "111",
      beverage: "orange",
      qty: "1",
      dateAndTime: date
    };

    assert.deepStrictEqual(actual, expected);
  });
  it("should assign undefined if the key is not exist", function() {
    let actual = getNewTransactionObj([], date);
    let expected = {
      id: undefined,
      beverage: undefined,
      qty: undefined,
      dateAndTime: date
    };
    assert.deepStrictEqual(actual, expected);
  });
});

//------------------------testPerformSaveCmd------------------------------

describe("testPerformSaveCmd", function() {
  it("should record transaction when the option is --save", function() {
    let date = new Date();
    const generateDate = function() {
      return date;
    };
    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [
          { id: "111", beverage: "orange", qty: 1, dateAndTime: date.toJSON() },
          {
            id: "111",
            beverage: "orange",
            qty: "2",
            dateAndTime: date.toJSON()
          }
        ],
        allTrans
      );
    };
    let utilFunc = {
      generateDate: generateDate,
      recordTransaction: recordTransaction
    };
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date" +
      "\n" +
      "111,orange,2," +
      date.toJSON();
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
      [{ id: "111", beverage: "orange", qty: 1, dateAndTime: date.toJSON() }],
      utilFunc,
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------testPerformQueryCmd-----------------------------

describe("testPerformQueryCmd", function() {
  it("should return transactions when the option is --query", function() {
    let date = new Date();
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ id: "1", beverage: "orange", qty: 3, dateAndTime: date }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------testTotal-----------------------------

describe("testTotal", function() {
  it("should return 0 if the qty is 0", function() {
    assert.strictEqual(total(0, { qty: 0 }), 0);
  });
  it("should return NaN if id the key is not present", function() {
    assert.isNaN(total(0, { beverage: "orange" }));
  });
  it("should return NaN if the object is empty", function() {
    assert.isNaN(total(0, {}));
  });
  it("should return the total if the quantity key is present", function() {
    assert.strictEqual(total(0, { qty: 6 }), 6);
  });
});
