const assert = require("chai").assert;
const operations = require("../src/operations");
const {
  executeEmpIdQuery,
  save,
  extractEachEmp,
  isTransOfTheDay,
  executeDateQuery
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
  });
});

//----------------------------------testExecuteEmpIdQuery-----------------------------

describe("testQuery", function() {
  let date = new Date().toJSON();
  it("should return an empty array when the previous value is an empty array", function() {
    let expected = [];
    let actual = executeEmpIdQuery([], ["--empId", "1"]);
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
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------------------------testIsTransOfTheDay-----------------

describe("testIsTransOfTheDay", function() {
  it("should return true when the transaction date and input date are equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", dateAndTime: "2019-11-27" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.ok(actual);
  });
  it("should return false when the transaction date and input date are not equal", function() {
    let date = "2019-11-27";
    let empTrans = { id: "111", dateAndTime: "2019-11-26" };
    let actual = isTransOfTheDay(date, empTrans);
    assert.ok(!actual);
  });
});

//----------------------------------------testExecuteDateQuery------------------

describe("testExecuteDateQuery", function() {
  it("should return transactions of a perticular employee on a perticular day", function() {
    let allTrans = [
      { id: "111", dateAndTime: "2020-11-27" },
      { id: "111", dateAndTime: "2020-11-26" }
    ];
    let args = ["--query", "--date", "2020-11-27", "--empId", "111"];
    let actual = executeDateQuery(allTrans, args);
    let expected = [{ id: "111", dateAndTime: "2020-11-27" }];
    assert.deepStrictEqual(actual, expected);
  });
  it("hould return informations about all those who made transaction in a perticular day", function() {
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
    assert.deepStrictEqual(actual, expected);
  });
});
