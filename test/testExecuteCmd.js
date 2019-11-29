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
  let date = new Date();
  it("should record transaction when the option is --save", function() {
    const generateDate = function() {
      return date;
    };
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [{ id: "111" }];
      return previousData;
    };
    const recordTransaction = function(path, allTrans) {
      assert.equal("./test/testFile", path);
      assert.deepStrictEqual(
        [
          { id: "111" },
          { beverage: "orange", empId: "111", qty: "2", date: date }
        ],
        allTrans
      );
    };
    let utilFunc = {
      getBeverageRecord: getBeverageRecord,
      recordTransaction: recordTransaction,
      generateDate: generateDate
    };
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date" +
      "\n" +
      "111,orange,2," +
      date.toJSON();
    let cmdLineArg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "2"
    ];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.strictEqual(actual, expected);
  });

  it("should give transactions of an employee when the option is --query and value is empId", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: date.toJSON() }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3," + date.toJSON() + "\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give all transactions of a perticular day when the option is --query and value is a date", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3," + "2019-11-28" + "\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--date", "2019-11-28"];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give transactions of an employee in a day when the option is --query and values are id and date", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--date", "2019-11-28", "--empId", "1"];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give transactions of an employee on perticular beverage when the option is --query and values are id and beverage", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--beverage", "orange", "--empId", "1"];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give transactions a perticular beverage on a day when the option is --query and values are date and beverage", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = [
      "--query",
      "--beverage",
      "orange",
      "--date",
      "2019-11-28"
    ];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give transactions of an employee on a perticular beverage on a day when the option is --query and values are date and beverage", function() {
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = [
      "--query",
      "--beverage",
      "orange",
      "--date",
      "2019-11-28",
      "--empId",
      "1"
    ];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give usage if the input is not valid", function() {
    let usageSave =
      "save ==> --save --beverage [beverageName] --empId [empId] --qty [quantity]\n ";
    let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
    usageQuery =
      usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
    usageQuery = usageQuery + "--query --date [valid date]";
    const getBeverageRecord = function(path) {
      assert.equal("./test/testFile", path);
      let previousData = [
        { beverage: "orange", qty: 3, date: date, id: "2345" }
      ];
      return previousData;
    };
    let utilFunc = { getBeverageRecord: getBeverageRecord };
    let expected = usageSave + usageQuery;
    let cmdLineArg = ["--update", "--empId", "111"];
    let actual = executeCmd(cmdLineArg, utilFunc, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });
});
