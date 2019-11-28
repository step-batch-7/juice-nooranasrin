const assert = require("chai").assert;
const operations = require("../src/operations");
const {
  executeEmpIdQuery,
  save,
  addNewTransaction,
  isTransOfTheDay,
  executeDateQuery,
  isKeyPresent,
  executeBeverageQuery
} = operations;

//-----------------------------------------testSave-----------------------------------

describe("testSave", function() {
  it("it should push an object into the array when the array is empty", function() {
    let date = new Date();
    let expected = [
      {
        beverage: "orange",
        qty: "1",
        dateAndTime: date.toJSON(),
        id: "1"
      }
    ];

    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [{ beverage: "orange", qty: "1", dateAndTime: date.toJSON(), id: "1" }],
        allTrans
      );
    };
    let utilFunc = { recordTransaction, recordTransaction };
    let actual = save(
      [],
      { id: "1", beverage: "orange", qty: "1", dateAndTime: date.toJSON() },
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
        id: "2",
        beverage: "orange",
        qty: "2",
        dateAndTime: date.toJSON()
      }
    ];
    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [
          { id: "1" },
          { id: "2", beverage: "orange", qty: "2", dateAndTime: date.toJSON() }
        ],
        allTrans
      );
    };
    let utilFunc = { recordTransaction: recordTransaction };
    let actual = save(
      [{ id: "1" }],
      { id: "2", beverage: "orange", qty: "2", dateAndTime: date.toJSON() },
      "./test/testFile",
      utilFunc
    );
    assert.deepStrictEqual(actual, expected);
    assert(Array.isArray(actual));
  });
});

//----------------------------------testExecuteEmpIdQuery-----------------------------

describe("testEmpIdQuery", function() {
  let date = new Date().toJSON();
  it("should return an empty array when the previous value is an empty array", function() {
    let expected = [];
    let actual = executeEmpIdQuery([], ["--empId", "1"]);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, expected);
  });

  it("should return an empty array when the previous date doesnot have that employee", function() {
    let expected = [];
    let actual = executeEmpIdQuery(
      [{ id: "2", beverage: "orange", qty: "2", dateAndTime: date }],
      ["--empId", "1"]
    );
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, expected);
  });

  it("should return the details of all transactions of that perticular employee when the employee is present", function() {
    let expected = [
      { id: "1", beverage: "orange", qty: 2, dateAndTime: 45 },
      { id: "1", beverage: "apple", qty: 1, dateAndTime: 65 }
    ];
    let testInput = [
      { id: "1", beverage: "orange", qty: 2, dateAndTime: 45 },
      { id: "1", beverage: "apple", qty: 1, dateAndTime: 65 },
      { id: "2", beverage: "apple", qty: 1, dateAndTime: 65 }
    ];
    let actual = executeEmpIdQuery(testInput, ["--empId", "1"]);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------------------------testIsTransOfTheDay-----------------

describe("testIsTransOfTheDay", function() {
  it("should return true when the transaction date and input date are equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", dateAndTime: "2019-11-27" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.isBoolean(actual);
    assert.isTrue(actual);
  });
  it("should return false when the transaction date and input date are not equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", dateAndTime: "2019-11-26" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.isBoolean(actual);
    assert.isFalse(actual);
  });
});

//----------------------------------------testExecuteDateQuery------------------

describe("testExecuteDateQuery", function() {
  it("should return transactions of an employee on a day when the input contains empId and date", function() {
    let allTrans = [
      { id: "111", dateAndTime: "2020-11-27" },
      { id: "111", dateAndTime: "2020-11-26" }
    ];
    let args = ["--query", "--date", "2020-11-27", "--empId", "111"];
    let actual = executeDateQuery(allTrans, args);
    let expected = [{ id: "111", dateAndTime: "2020-11-27" }];
    assert.isArray(actual);
    assert.deepStrictEqual(actual, expected);
  });
  it("hould return informations about all those who made transaction in a day when the inputs contains only date", function() {
    allTrans = [
      { id: "111", dateAndTime: "2020-11-27" },
      { id: "111", dateAndTime: "2020-11-26" },
      { id: "112", dateAndTime: "2020-11-27" }
    ];
    args = ["--query", "--date", "2020-11-27"];
    expected = [
      { id: "111", dateAndTime: "2020-11-27" },
      { id: "112", dateAndTime: "2020-11-27" }
    ];
    actual = executeDateQuery(allTrans, args);
    assert.isArray(actual);
    assert.deepStrictEqual(actual, expected);
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
//--------------------------testIsKeyPresent-----------------------//
describe("testIsKeyPresent", function() {
  it("should return true when the value is present", function() {
    let actual = isKeyPresent("1", "id", { id: "1" });
    assert.isTrue(actual);
  });
  it("should return false when the value is not present", function() {
    let actual = isKeyPresent("2", "beverage", { beverage: "orange" });
    assert.isFalse(actual);
  });
});

//-----------------------------testExecuteBeverageQuery------------//
describe("testExecuteBeverageQuery", function() {
  it("should return transactions of a perticular beverage when input contains only beverage", function() {
    let beverageRecord = [
      { beverage: "orange", id: "111", qty: "1" },
      { beverage: "apple", id: "111", qty: "1" }
    ];
    let args = ["--beverage", "orange"];
    let actual = executeBeverageQuery(beverageRecord, args);
    let expected = [{ beverage: "orange", id: "111", qty: "1" }];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transactions of an employee on a beverage when input contains both empId and beverage", function() {
    let beverageRecord = [
      { beverage: "orange", id: "111", qty: "1" },
      { beverage: "orange", id: "112", qty: "1" }
    ];
    let args = ["--beverage", "orange", "--empId", "111"];
    let actual = executeBeverageQuery(beverageRecord, args);
    let expected = [{ beverage: "orange", id: "111", qty: "1" }];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transactions of a beverage on a day when input contains both date and beverage", function() {
    let date = new Date().toJSON();
    let beverageRecord = [
      { beverage: "orange", id: "111", qty: "1", dateAndTime: date },
      { beverage: "apple", id: "112", qty: "1", dateAndTime: date }
    ];
    let args = ["--beverage", "orange", "--date", "2019-11-28"];
    let actual = executeBeverageQuery(beverageRecord, args);
    let expected = [
      { beverage: "orange", id: "111", qty: "1", dateAndTime: date }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transactions of a beverage on a day of an employee when input contains empId,date and beverage", function() {
    let date = new Date().toJSON();
    let beverageRecord = [
      { beverage: "orange", id: "111", qty: "1", dateAndTime: date },
      { beverage: "orange", id: "112", qty: "1", dateAndTime: date }
    ];
    let args = [
      "--beverage",
      "orange",
      "--date",
      "2019-11-28",
      "--empId",
      "111"
    ];
    let actual = executeBeverageQuery(beverageRecord, args);
    let expected = [
      { beverage: "orange", id: "111", qty: "1", dateAndTime: date }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
