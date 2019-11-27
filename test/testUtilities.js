const assert = require("assert");
const utilities = require("../src/utilities.js");
const { getBeverageRecord } = utilities;

describe("testBeverageRecord", function() {
  it("should create file if the file is already exists", function() {
    assert.deepStrictEqual(getBeverageRecord("./testFile"), {});
  });
  it("should write if the file is already exists", function() {
    assert.deepStrictEqual(getBeverageRecord("./testFile"), {});
  });
});
