const assert = require("chai").assert;
const operations = require("../src/operations");
const {
  save,
  addNewTransaction,
  isTransOfTheDay,
  filterTransactions,
  executeQuery
} = operations;

//-----------------------------------------testSave-----------------------------------

describe("testSave", function() {
  it("it should push an object into the array when the array is empty", function() {
    let date = new Date();
    let expected = [
      {
        beverage: "orange",
        qty: "1",
        date: date,
        empId: "1"
      }
    ];

    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [{ empId: "1", beverage: "orange", qty: "1", date: date }],
        allTrans
      );
    };
    let utilFunc = { recordTransaction, recordTransaction };
    let actual = save(
      [],
      { empId: "1", beverage: "orange", qty: "1", date: date },
      "./test/testFile",
      utilFunc
    );
    assert.deepStrictEqual(actual, expected);
    assert(Array.isArray(actual));
  });

  it("it should push an empty object into the array when the object is empty", function() {
    let date = new Date();
    let expected = [{}];

    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual([{}], allTrans);
    };
    let utilFunc = { recordTransaction, recordTransaction };
    let actual = save([], {}, "./test/testFile", utilFunc);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, expected);
  });

  it("it should push the input data to the array when the input is not an object", function() {
    let date = new Date();
    let expected = [1];

    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual([1], allTrans);
    };
    let utilFunc = { recordTransaction, recordTransaction };
    let actual = save([], 1, "./test/testFile", utilFunc);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, expected);
  });

  it("should add new details to the array when the array contains some elements", function() {
    let date = new Date();
    let expected = [
      {
        empId: "2",
        beverage: "orange",
        qty: "2",
        date: date
      }
    ];
    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [
          { empId: "1" },
          { empId: "2", beverage: "orange", qty: "2", date: date }
        ],
        allTrans
      );
    };
    let utilFunc = { recordTransaction: recordTransaction };
    let actual = save(
      [{ empId: "1" }],
      { empId: "2", beverage: "orange", qty: "2", date: date },
      "./test/testFile",
      utilFunc
    );
    assert.deepStrictEqual(actual, expected);
    assert(Array.isArray(actual));
  });
});

//----------------------------------------------testIsTransOfTheDay-----------------

describe("testIsTransOfTheDay", function() {
  it("should return true when the transaction date and input date are equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", date: "2019-11-27" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.isBoolean(actual);
    assert.isTrue(actual);
  });
  it("should return false when the transaction date and input date are not equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", date: "2019-11-26" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.isBoolean(actual);
    assert.isFalse(actual);
  });
});

//-----------------------------testAddNewTransaction--------------------//
describe("testAddNewTransaction", function() {
  it("should push the input date to the array", function() {
    let expected = [1];
    let actual = addNewTransaction([], 1);
    assert.deepStrictEqual(actual, expected);
  });
});
//--------------------------testFilterTransactions-----------------------//
describe("testIsKeyPresent", function() {
  it("should return true when the value is present", function() {
    let beverage = undefined;
    let date = undefined;
    let empId = "1";
    let transaction = {
      beverage: "orange",
      date: new Date().toJSON(),
      empId: "1"
    };
    let actual = filterTransactions(beverage, date, empId, transaction);
    assert.isTrue(actual);
  });
  it("should return false when the value is not present", function() {
    let beverage = undefined;
    let date = undefined;
    let empId = "2";
    let transaction = {
      beverage: "orange",
      date: new Date().toJSON(),
      empId: "1"
    };
    let actual = filterTransactions(beverage, date, empId, transaction);
    assert.isFalse(actual);
  });
});

//---------------------------testExecuteQuery-------------------------
describe("testExecuteQuery", function() {
  it("should return all matching records", function() {
    let beverage = undefined;
    let date = undefined;
    let empId = "1";
    let transactions = [
      {
        beverage: "orange",
        date: new Date().toJSON(),
        empId: "1"
      },
      {
        beverage: "orange",
        date: new Date().toJSON(),
        empId: "2"
      }
    ];
    let expected = [
      {
        beverage: "orange",
        date: new Date().toJSON(),
        empId: "1"
      }
    ];
    let actual = executeQuery(beverage, date, empId, transactions);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return an empty array when there is no matching transactions", function() {
    let beverage = undefined;
    let date = undefined;
    let empId = "1";
    let transactions = [
      {
        beverage: "orange",
        date: new Date().toJSON(),
        empId: "2"
      }
    ];
    let actual = executeQuery(beverage, date, empId, transactions);
    assert.deepStrictEqual(actual, []);
  });
});
