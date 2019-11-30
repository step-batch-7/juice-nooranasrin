const assert = require("chai").assert;
const performOperations = require("../src/performOperations");
const {
  getNewTransactionObj,
  total,
  performQueryCmd,
  performSaveCmd
} = performOperations;

//-----------------------testGetNewTransactionObj------------------------

describe("testGetNewTransactionObj", function() {
  let date = new Date().toJSON();
  it("should give an object", function() {
    let actual = getNewTransactionObj([]);
    assert.isObject(actual);
  });
  it("should create a new object with specified keys", function() {
    let actual = getNewTransactionObj(
      ["--save", "--beverage", "orange", "--qty", "1", "--empId", "111"],
      date
    );
    let expected = {
      empId: "111",
      beverage: "orange",
      qty: "1"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give an empty object when the input is an empty array", function() {
    let actual = getNewTransactionObj([]);
    let expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});

//------------------------testPerformSaveCmd------------------------------

describe("testPerformSaveCmd", function() {
  it("should save the input transaction", function() {
    const write = function(path, content, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual(
        JSON.stringify([
          {
            empId: "111",
            beverage: "orange",
            qty: 1,
            date: dateAndTime.toJSON()
          },
          { beverage: "orange", empId: "111", qty: "2", date: dateAndTime }
        ]),
        content
      );
      assert.strictEqual("utf8", encoding);
    };

    let fileOperations = {
      write: write,
      encoding: "utf8",
      content: "[]",
      path: "./test/testFile"
    };

    let dateAndTime = new Date();
    const date = function() {
      return dateAndTime;
    };

    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date" +
      "\n" +
      "111,orange,2," +
      dateAndTime.toJSON();
    let cmdLineArg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "2"
    ];
    let actual = performSaveCmd(
      cmdLineArg,
      [
        { empId: "111", beverage: "orange", qty: 1, date: dateAndTime.toJSON() }
      ],
      fileOperations,
      date
    );
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------testPerformQueryCmd-----------------------------

describe("testPerformQueryCmd", function() {
  it("should give transactions of an employee when the input contains only empId", function() {
    let date = new Date().toJSON();
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3," + date + "\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ empId: "1", beverage: "orange", qty: 3, date: date }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transactions of a beverage when the input contains only beverage", function() {
    let date = new Date().toJSON();
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3," + date + "\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--beverage", "orange"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ empId: "1", beverage: "orange", qty: 3, date: date }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should give all transactions of the day when the input contains only date", function() {
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--date", "2019-11-28"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transactions of an employee in a day when the input contains both empId and date", function() {
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--date", "2019-11-28", "--empId", "1"];
    let actual = performQueryCmd(
      cmdLineArg,
      [{ empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }],
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transactions of an employee on perticular beverage when the options are id and beverage", function() {
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = ["--query", "--beverage", "orange", "--empId", "1"];
    let actual = performQueryCmd(cmdLineArg, [
      { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
    ]);
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transactions on a day on a perticular beverage when the options are date and beverage", function() {
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
    let expected =
      printingMsg + 1 + "," + "orange,3,2019-11-28\nTotal: 3 Juices";
    let cmdLineArg = [
      "--query",
      "--beverage",
      "orange",
      "--date",
      "2019-11-28"
    ];
    let actual = performQueryCmd(cmdLineArg, [
      { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
    ]);
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transactions of an employee on a day on a perticular beverage when the options are id,date and beverage", function() {
    let printingMsg = "Employee ID, Beverage, Quantity, Date\n";
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
    let actual = performQueryCmd(cmdLineArg, [
      { empId: "1", beverage: "orange", qty: 3, date: "2019-11-28" }
    ]);
    assert.deepStrictEqual(actual, expected);
  });
});

//----------------------------testTotal----------------------------

describe("testTotal", function() {
  it("should return 0 when the quantity is 0", function() {
    assert.strictEqual(total(0, { qty: 0 }), 0);
  });
  it("should return NaN when qty key is not present", function() {
    assert.isNaN(total(0, { beverage: "orange" }));
  });
  it("should return NaN when the object is empty", function() {
    assert.isNaN(total(0, {}));
  });
  it("should return the total when the quantity key is present", function() {
    assert.strictEqual(total(0, { qty: 6 }), 6);
  });
});
