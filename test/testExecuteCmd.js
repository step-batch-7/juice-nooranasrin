const assert = require("chai").assert;
const executeCmdFunc = require("../src/executeCmdLib");
const { getPair, executeCmd } = executeCmdFunc;
const utilFunc = require("../src/utilities");

//----------------------------testGetPair--------------------

describe("testGetPair", function() {
  it("should give pairs for array conataining even number of elements", function() {
    assert.deepStrictEqual(getPair([1, 2, 3, 4]), [
      [1, 2],
      [3, 4]
    ]);
  });
  it("should give an empty array for empty array as input", function() {
    assert.deepStrictEqual(getPair([]), []);
  });
  it("should give undefined for last element of last pair if array containing odd number of elements", function() {
    assert.deepStrictEqual(getPair([1]), [[1, undefined]]);
  });
});

//---------------------------testExecuteCmd-------------------------

describe("testExecuteCmd", function() {
  it("should record transaction when the option is --save", function() {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "[]";
    };

    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      assert.strictEqual(
        JSON.stringify([
          { empId: "111", beverage: "orange", qty: "2", date: date }
        ]),
        content
      );
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return true;
    };

    let date = new Date();
    const dateAndTime = function() {
      return date;
    };

    let fileOperations = {
      read: read,
      write: write,
      exist: exist,
      encoding: "utf8",
      content: "[]",
      path: "./test/testFile"
    };

    let args = [
      "--save",
      "--empId",
      "111",
      "--beverage",
      "orange",
      "--qty",
      "2"
    ];
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n";
    expected = expected + "111,orange,2," + date.toJSON();
    let actual = executeCmd(args, fileOperations, dateAndTime);
    assert.deepStrictEqual(actual, expected);
  });

  it("should create one file if the file is not exists", function() {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "[]";
    };

    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      assert.strictEqual(
        JSON.stringify([
          { empId: "111", beverage: "orange", qty: "2", date: date }
        ]),
        content
      );
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
      content: "{}",
      path: "./test/testFile"
    };

    let date = new Date();
    let dateAndTime = () => date;

    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date" +
      "\n" +
      "111,orange,2," +
      date.toJSON();
    let cmdLineArg = [
      "--save",
      "--empId",
      "111",
      "--beverage",
      "orange",
      "--qty",
      "2"
    ];
    let actual = executeCmd(cmdLineArg, fileOperations, dateAndTime);
    assert.strictEqual(actual, expected);
  });

  it("should give transactions of an employee when the option is --query and value is empId", function() {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return JSON.stringify([
        { empId: "1", beverage: "orange", qty: "2", date: "1998-08-28" }
      ]);
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return true;
    };

    let date = new Date();
    const dateAndTime = function() {
      return date;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: "utf8",
      content: "{}",
      path: "./test/testFile"
    };

    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + "1,orange,2,1998-08-28\nTotal: 2 Juices";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = executeCmd(cmdLineArg, fileOperations, dateAndTime);
    assert.deepStrictEqual(actual, expected);
  });

  it("should give usage if the input is not valid", function() {
    let usageSave =
      "save ==> --save --beverage [beverageName] --empId [empId] --qty [quantity]\n ";
    let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
    usageQuery =
      usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
    usageQuery = usageQuery + "--query --date [valid date]";

    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return JSON.stringify([
        { empId: "1", beverage: "orange", qty: "2", date: "1998-08-28" }
      ]);
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return true;
    };

    let date = new Date();
    const dateAndTime = function() {
      return date;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: "utf8",
      content: "{}",
      path: "./test/testFile"
    };

    let expected = usageSave + usageQuery;
    let cmdLineArg = ["--update", "--empId", "111"];
    let actual = executeCmd(cmdLineArg, fileOperations, dateAndTime);
    assert.deepStrictEqual(actual, expected);
  });
});
