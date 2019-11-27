const executeCmd = require("./src/executeCmdLib.js").executeCmd;
const utilFunc = require("./src/utilities");
const chalk = require("chalk");

const main = function(cmdLineArg) {
  console.log(chalk.red("Anna Juice Ltd"));
  let path = "./transactionDetails.json";
  console.log(executeCmd(cmdLineArg, utilFunc, path));
};

main(process.argv.slice(2));
