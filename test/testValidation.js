const assert = require("assert");
const validation = require("../src/validation");
const {
  isValidLength,
  isValidOption,
  isValidNumber,
  isValidBeverage,
  isValidSavePair,
  isValidQueryPair,
  isValidId
} = validation;

describe("testIsValidation", function() {
  it("should return true if the length equal to the size", function() {
    assert.ok(isValidLength(4, 4));
  });
  it("should return false if the length not equal to the size", function() {
    assert.ok(!isValidLength(4, 6));
  });
});

describe("testIsValidNumber", function() {
  it("should give true for positive intiger", function() {
    assert.ok(isValidNumber("45"));
  });
  it("should give false for floating Point numbers", function() {
    assert.ok(!isValidNumber("4.5"));
  });
  it("should give false for negative numbers", function() {
    assert.ok(!isValidNumber("-45"));
  });
  it("should give false for anything other than positive intiger", function() {
    assert.ok(!isValidNumber("hello"));
  });
});

describe("testIsValidOption", function() {
  it("should return true if the option is --beverage", function() {
    assert.ok(isValidOption("--beverage"));
  });
  it("should return true if the option is --qty", function() {
    assert.ok(isValidOption("--qty"));
  });
  it("should return true if the option is --empId", function() {
    assert.ok(isValidOption("--empId"));
  });
  it("should return false if the option is not --beverage,--qty or --empId", function() {
    assert.ok(!isValidOption("--shape"));
  });
});

describe("testIsValidBeverage", function() {
  it("should retur true for all available juices", function() {
    assert.ok(isValidBeverage("orange"));
    assert.ok(isValidBeverage("mango"));
    assert.ok(isValidBeverage("papaya"));
    assert.ok(isValidBeverage("grapes"));
    assert.ok(isValidBeverage("pomegranate"));
    assert.ok(isValidBeverage("watermelon"));
    assert.ok(isValidBeverage("tomato"));
    assert.ok(isValidBeverage("carrot"));
    assert.ok(isValidBeverage("lemon"));
    assert.ok(isValidBeverage("strawberry"));
    assert.ok(isValidBeverage("pineapple"));
    assert.ok(isValidBeverage("butterfruit"));
    assert.ok(isValidBeverage("muskmelon"));
    assert.ok(isValidBeverage("apple"));
  });
  it("should return false for all unavailable juices", function() {
    assert.ok(!isValidBeverage("chilly"));
  });
});

describe("testIsValidSavePair", function() {
  it("should return true for option --beverage and value is an available juice", function() {
    assert.ok(isValidSavePair(["--beverage", "mango"]));
  });
  it("should return true for option --qty and value is a number", function() {
    assert.ok(isValidSavePair(["--qty", "7"]));
  });
  it("should return true for option --empId and value is a number", function() {
    assert.ok(isValidSavePair(["--empId", "111"]));
  });
  it("should return false for all other combinations", function() {
    assert.ok(!isValidSavePair(["--beverage", "123"]));
  });
});

describe("testIsValidQueryPair", function() {
  it("should return true for option --empId and value is a number", function() {
    assert.ok(isValidQueryPair(["--empId", "111"], { 111: [] }));
  });
  it("should return false for all other combinations", function() {
    assert.ok(!isValidQueryPair(["--beverage", "123"], { 111: [] }));
  });
});

describe("testIsValidId", function() {
  it("should return true for existing id", function() {
    assert.ok(isValidId("1", { 1: "hai" }));
  });
  it("should return false for not existing id", function() {
    assert.ok(!isValidId("2", { 1: "hai" }));
  });
});
