const assert = require("assert");
const operations = require("../src/operations");
const { query, total, getTransactionDetails } = operations;

describe("testQuery", function() {
  let date = new Date();
  it("should return total as the same quantity if the employee has only one transaction", function() {
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let actual = query(
      { 1: [{ beverage: "orange", qty: 3, dateAndTime: date }] },
      1
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should return the printing msg with two new lines if the input object contains id and an empty array", function() {
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + "\n" + "0";
    let actual = query({ 1: [] }, 1);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return the details of all transactions of that perticular employee", function() {
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,2,45\n" + 1 + "," + "apple,1,65\n3";
    let testInput = {
      1: [
        { beverage: "orange", qty: 2, dateAndTime: 45 },
        { beverage: "apple", qty: 1, dateAndTime: 65 }
      ]
    };
    let actual = query(testInput, 1);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return total transactions of that perticular employee", function() {
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,2,45\n" + 1 + "," + "apple,1,65\n3";
    let testInput = {
      1: [
        { beverage: "orange", qty: 2, dateAndTime: 45 },
        { beverage: "apple", qty: 1, dateAndTime: 65 }
      ]
    };
    let actual = query(testInput, 1);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testGetTransactionDetails", function() {
  it("shoul retutn the given object in the form of string", function() {
    let expected = ["1,orange,3,45"];
    let actual = [
      {
        beverage: "orange",
        qty: 3,
        dateAndTime: 45
      }
    ].map(getTransactionDetails.bind(null, 1));
    assert.deepStrictEqual(actual, expected);
  });
  it("should return undefined if the object is empty", function() {
    let expected = ["1,undefined,undefined,undefined"];
    let actual = [{}].map(getTransactionDetails.bind(null, 1));
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testTotal", function() {
  it("should return 0 if the qty is 0", function() {
    assert.deepStrictEqual(total(0, { qty: 0 }), 0);
  });
  it("should return NaN if id the key is not present", function() {
    assert.deepStrictEqual(total(0, { beverage: "orange" }), NaN);
  });
  it("should return NaN if the object is empty", function() {
    assert.deepStrictEqual(total(0, {}), NaN);
  });
  it("should return the total if the quantity key is present", function() {
    assert.deepStrictEqual(total(0, { qty: 6 }), 6);
  });
});
