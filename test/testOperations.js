const assert = require("assert");
const operations = require("../src/operations");
const { query, getTransactionDetails, save } = operations;

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
    let actual = query({ 1: [] }, ["--empId", "1"]);
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
    let actual = query(testInput, ["--empId", "1"]);
    assert.deepStrictEqual(actual, expected);
  });
});
