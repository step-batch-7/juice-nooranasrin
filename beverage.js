const executeCmd = require("./src/executeCmdLib.js").executeCmd;
const utilFunc = require("./src/utilities");
const configurations = require("./src/configuration");
const { getDataStorePath, timeStamp } = configurations;
const { getFileOperations } = utilFunc;

const main = function(cmdLineArg) {
  let path = getDataStorePath(process.env);
  let fileOperations = getFileOperations(path);
  let timeStampWithEnv = timeStamp.bind(null, process.env);
  console.log(executeCmd(cmdLineArg, fileOperations, timeStampWithEnv));
};

main(process.argv.slice(2));
