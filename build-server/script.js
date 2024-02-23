const { exec } = require("child_process");
const path = require("path");

// function publishLog(message) {
//   console.log(message);
// }
async function init() {
  console.log("Executing build script");
  //   publishLog("Executing script");
  const outDirPath = path.join(__dirname, "output");
  const p = exec(`cd {$outDirPath} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log(data);
  });

  p.stdout.on("error", function (data) {
    console.log(data);
  });

  p.on("close", function () {
    console.log("Build completed");
  });
}
