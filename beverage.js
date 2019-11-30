const executeCmd = require("./src/executeCmdLib.js").executeCmd;
const utilFunc = require("./src/utilities");
const { getFileOperations } = utilFunc;
const chalk = require("chalk");

const main = function(cmdLineArg) {
  console.log(chalk.red("Anna Juice Ltd"));
  let fileOperations = getFileOperations();
  let timeStamp = () => new Date();
  console.log(executeCmd(cmdLineArg, fileOperations, timeStamp));
};

main(process.argv.slice(2));
