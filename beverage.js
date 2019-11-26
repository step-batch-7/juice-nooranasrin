const executeCmd = require("./src/executeCmdLib.js").executeCmd;
const getPreviousData = require("./src/utilities").getPreviousData;
const chalk = require("chalk");

const main = function(cmdLineArg) {
  console.log(chalk.red("Anna Juice Ltd"));
  let timeStamp = new Date().toJSON();
  let previousData = getPreviousData("./transactionDetails.json");
  console.log(
    executeCmd(cmdLineArg, timeStamp, previousData, "./transactionDetails.json")
  );
};

main(process.argv.slice(2));
