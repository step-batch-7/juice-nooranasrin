const assert = require("chai").assert;
const performOperations = require("../src/performOperations");
const {
  getNewTransaction,
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
  it("should return an object", function() {
    let actual = getNewTransaction([], date);
    assert.isObject(actual);
  });
  it("should create a new object with specified keys", function() {
    let actual = getNewTransaction(
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
  it("should assign undefined when the input doesnot contains the expected values", function() {
    let actual = getNewTransaction([], date);
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
  it("should save the input transaction", function() {
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
  it("should return transactions of an employee when the input contains only empId", function() {
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
  it("should return all transactions of the day when the input contains only date", function() {
    let date = new Date();
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let cmdLineArg = ["--query", "--date", "2019-11-28"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ id: "1", beverage: "orange", qty: 3, dateAndTime: date }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transactions of an employee in a day when the input contains both empId and date", function() {
    let date = new Date();
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let cmdLineArg = ["--query", "--date", "2019-11-28", "--empId", "1"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ id: "1", beverage: "orange", qty: 3, dateAndTime: date }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------testTotal----------------------------

describe("testTotal", function() {
  it("should return 0 when the quantity is 0", function() {
    assert.strictEqual(total(0, { qty: 0 }), 0);
  });
  it("should return NaN when qty key is not present", function() {
    assert.isNaN(total(0, { beverage: "orange" }));
  });
  it("should return NaN when the object is empty", function() {
    assert.isNaN(total(0, {}));
  });
  it("should return the total when the quantity key is present", function() {
    assert.strictEqual(total(0, { qty: 6 }), 6);
  });
});
