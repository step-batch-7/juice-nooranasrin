const assert = require("assert");
const queryDetails = require("../src/queryDetailsLib");
const { getTransactionDetails, total } = queryDetails;

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
    assert.strictEqual(total(0, { qty: 0 }), 0);
  });
  it("should return NaN if id the key is not present", function() {
    assert.strictEqual(total(0, { beverage: "orange" }), NaN);
  });
  it("should return NaN if the object is empty", function() {
    assert.strictEqual(total(0, {}), NaN);
  });
  it("should return the total if the quantity key is present", function() {
    assert.strictEqual(total(0, { qty: 6 }), 6);
  });
});
