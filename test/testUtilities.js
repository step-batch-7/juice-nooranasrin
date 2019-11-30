const fs = require("fs");
const assert = require("chai").assert;
const utilities = require("../src/utilities.js");
const { getBeverageRecord, recordTransaction, getFileOperations } = utilities;

//---------------------------testRecordTransaction---------------------
describe("testRecordTransaction", function() {
  it("should write the content to the file", function() {
    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("{}", content);
      assert.strictEqual("utf8", encoding);
    };

    let fileOperations = {
      write: write,
      encoding: "utf8",
      content: "[]",
      path: "./test/testFile"
    };

    let expected = undefined;
    let actual = recordTransaction({}, fileOperations);
    assert.strictEqual(actual, expected);
  });
});

//--------------------------testGetBeverageRecord----------------------
describe("testGetBeverageRecord", function() {
  it("should read content of the file when the file is already exists and contains some content", function() {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "hello";
    };

    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("[]", content);
      assert.strictEqual("utf8", encoding);
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return true;
    };

    let fileOperations = {
      read: read,
      write: write,
      exist: exist,
      encoding: "utf8",
      content: "[]",
      path: "./test/testFile"
    };

    let expected = "hello";
    let actual = getBeverageRecord(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });

  it("should create one file if the file is not exists", function() {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "{}";
    };

    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("{}", content);
      assert.strictEqual("utf8", encoding);
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return false;
    };

    let fileOperations = {
      read: read,
      write: write,
      exist: exist,
      encoding: "utf8",
      content: "{}",
      path: "./test/testFile"
    };

    let expected = "{}";
    let actual = getBeverageRecord(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });
});

//-------------------------getFileOperations---------------------------
describe("testFileOperations", function() {
  it("should give an object with specified properties and values", function() {
    let expected = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: "utf8",
      content: "[]",
      path: "./transactionDetails.json"
    };
    let actual = getFileOperations();
    assert.deepStrictEqual(actual, expected);
  });
});
