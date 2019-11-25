const assert = require("assert");
const utilities = require("../src/utilities.js");
const { getPreviousData } = utilities;

describe("testGetPreviousData", function() {
  it("should create file if the file is already exists", function() {
    assert.deepStrictEqual(getPreviousData("./testFile"), {});
  });
  it("should write if the file is already exists", function() {
    assert.deepStrictEqual(getPreviousData("./testFile"), {});
  });
});
