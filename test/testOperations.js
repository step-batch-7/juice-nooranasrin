const assert = require("assert");
const operations = require("../src/operations");
const {
  executeEmpIdQuery,
  save,
  extractEachEmp,
  isTransOfTheDay,
  executeDateQuery
} = operations;

describe("testSave", function() {
  let date = new Date().toJSON();
  it("it should push an object into the array of corresponding employee id ", function() {
    let expected = { 1: { beverage: "orange", qty: 1, dateAndTime: date } };
    let actual = save(
      { "1": [] },
      { 1: { beverage: "orange", qty: 1, dateAndTime: date } },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });

  it("should create an employee if employee is not there in record", function() {
    let date = new Date().toJSON();
    let expected = { 2: { beverage: "orange", qty: 1, dateAndTime: date } };
    let actual = save(
      { "1": [] },
      { 2: { beverage: "orange", qty: 1, dateAndTime: date } },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testQuery", function() {
  let date = new Date().toJSON();
  it("should return an empty array if the value of the key of object is an empty array", function() {
    let expected = [];
    let actual = executeEmpIdQuery({ 1: [] }, ["--empId", "1"]);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return the details of all transactions of that perticular employee", function() {
    let expected = [
      { beverage: "orange", qty: 2, dateAndTime: 45 },
      { beverage: "apple", qty: 1, dateAndTime: 65 }
    ];
    let testInput = {
      1: [
        { beverage: "orange", qty: 2, dateAndTime: 45 },
        { beverage: "apple", qty: 1, dateAndTime: 65 }
      ]
    };
    let actual = executeEmpIdQuery(testInput, ["--empId", "1"]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testExtractEachEmp", function() {
  it("should return informations about all those who made transaction in a perticular day", function() {
    let date = "2019-11-27";
    let empTrans = [
      "111",
      [{ dateAndTime: "2019-11-27" }, { dateAndTime: "2019-11-26" }]
    ];
    let actual = extractEachEmp(date, empTrans);
    let expected = [{ dateAndTime: "2019-11-27", id: "111" }];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testIsTransOfTheDay", function() {
  it("should return true when the transaction date and input date are equal", function() {
    let date = "2019-11-27";
    let id = "111";
    let empTrans = { dateAndTime: "2019-11-27" };
    let actual = isTransOfTheDay(date, id, empTrans);
    assert.ok(actual);
  });
  it("should return false when the transaction date and input date are not equal", function() {
    let date = "2019-11-27";
    let id = "111";
    let empTrans = { dateAndTime: "2019-11-26" };
    let actual = isTransOfTheDay(date, id, empTrans);
    assert.ok(!actual);
  });
});

describe("testExecuteDateQuery", function() {
  it("hould return informations about all those who made transaction in a perticular day", function() {
    let allTrans = {
      "111": [{ dateAndTime: "2020-11-27" }, { dateAndTime: "2020-11-26" }]
    };
    let args = ["--query", "--date", "2020-11-27", "--empId", "111"];
    let actual = executeDateQuery(allTrans, args);
    let expected = [[{ id: "111", dateAndTime: "2020-11-27" }]];
    assert.deepStrictEqual(actual, expected);
    allTrans = {
      "111": [{ dateAndTime: "2020-11-27" }, { dateAndTime: "2020-11-26" }],
      "112": [{ dateAndTime: "2020-11-27" }]
    };
    args = ["--query", "--date", "2020-11-27"];
    expected = [
      [{ id: "111", dateAndTime: "2020-11-27" }],
      [{ id: "112", dateAndTime: "2020-11-27" }]
    ];
    actual = executeDateQuery(allTrans, args);
    assert.deepStrictEqual(actual, expected);
  });
});
