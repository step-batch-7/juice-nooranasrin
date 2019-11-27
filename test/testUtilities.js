const assert = require("chai").assert;
const utilities = require("../src/utilities.js");
const { getBeverageRecord } = utilities;

//------------------------testBeverageRecord-----------------------

describe("testBeverageRecord", function() {
  it("should create file if the file is already exists", function() {
    assert.deepStrictEqual(getBeverageRecord("./testFile"), {});
  });
  it("should write if the file is already exists", function() {
    assert.deepStrictEqual(getBeverageRecord("./testFile"), {});
  });
});
