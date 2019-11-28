const assert = require("chai").assert;
const validation = require("../src/validation");
const {
  isValidLength,
  isValidOption,
  isValidNumber,
  isValidBeverage,
  isValidSavePair,
  isValidQueryPair,
  isValidId,
  isValidSaveArgs,
  isValidQueryArgs,
  isValidDate
} = validation;

//-------------------------testIsValidLength------------------------

describe("testIsValidLength", function() {
  it("should return true if the length equal to the size", function() {
    assert.ok(isValidLength(4, 4));
  });
  it("should return false if the length not equal to the size", function() {
    assert.ok(!isValidLength(4, 6));
  });
});

//-----------------------------testIsValidNumber---------------------

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

//-------------------------------testIsValidOption--------------------

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

//----------------------------testIsValidBeverage-------------------

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

//------------------------------testIsValidSavePair---------------------------

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

//------------------------------testIsValidQueryPair---------------------------

describe("testIsValidQueryPair", function() {
  it("should return true for option --empId and value is a number", function() {
    assert.ok(isValidQueryPair([{ id: "111" }], ["--empId", "111"]));
  });
  it("should return true for option --date and valid date", function() {
    assert.ok(isValidQueryPair([{ id: "111" }], ["--date", "2000-2-1"]));
  });
  it("should return false for all other combinations", function() {
    assert.ok(!isValidQueryPair([{ id: "111" }], ["--beverage", "123"]));
  });
});

//-------------------------------testIsValidId--------------------------------

describe("testIsValidId", function() {
  it("should return true for existing id", function() {
    assert.ok(isValidId("1", { id: "1" }));
  });
  it("should return false for not existing id", function() {
    assert.notOk(isValidId("2", { id: "1" }));
  });
});

//---------------------------------estIsValidSaveArgs--------------------------

describe("testIsValidSaveArgs", function() {
  it("should return true for valid save arguments", function() {
    let pairs = [
      ["--beverage", "orange"],
      ["--empId", "111"],
      ["--qty", "1"]
    ];
    let cmdLineArg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "1"
    ];
    assert.ok(isValidSaveArgs(pairs, cmdLineArg));
  });
  it("should return false for invalid save arguments", function() {
    let pairs = [
      ["--beverage", "orange"],
      ["--empId", "111"],
      ["--qty", "1"]
    ];
    let cmdLineArg = [
      "--query",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "1"
    ];
    assert.ok(!isValidSaveArgs(pairs, cmdLineArg));
  });
});

//----------------------------------testIsValidQueryArgs---------------------

describe("testIsValidQueryArgs", function() {
  it("should return true for valid query arguments", function() {
    let pairs = [["--empId", "111"]];
    let cmdLineArg = ["--query", "--empId", "111"];
    let previousData = [{ id: "111" }];
    assert.ok(isValidQueryArgs(pairs, cmdLineArg, previousData));
    pairs = [
      ["--empId", "111"],
      ["--date", "2000-2-9"]
    ];
    cmdLineArg = ["--query", "--empId", "111", "--date", "2000-2-9"];
    previousData = [{ id: "111" }];
    assert.ok(isValidQueryArgs(pairs, cmdLineArg, previousData));
  });
  it("should return false for invalid query arguments", function() {
    let pairs = [["--empId", "111"]];
    let cmdLineArg = ["--save", "--empId", "111"];
    let previousData = [{ id: "111" }];
    assert.ok(!isValidQueryArgs(pairs, cmdLineArg, previousData));
  });
});

//---------------------testIsDateValid---------------------------

describe("testIsDateValid", function() {
  it("should return true for all valid dates", function() {
    assert.isTrue(isValidDate("2019-2-10"));
    assert.isTrue(isValidDate("2000-2-29"));
    assert.isTrue(isValidDate("2000-02-1"));
    assert.isTrue(isValidDate("2000-12-1"));
    assert.isTrue(isValidDate("2000-12-31"));
  });
  it("should return false for all invalid dates", function() {
    assert.isFalse(isValidDate("2001-2-30"));
    assert.isFalse(isValidDate("0-0-0"));
    assert.isFalse(isValidDate("0-2-1"));
    assert.isFalse(isValidDate("2000-2-30"));
    assert.isFalse(isValidDate("2000-3-32"));
    assert.isFalse(isValidDate("2000-13-30"));
    assert.isFalse(isValidDate("date"));
  });
});
