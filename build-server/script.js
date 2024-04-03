const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { s3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const s3Client = new s3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async (init) => {
  console.log("Executing script.js");
  const outDir = path.join(__dirname, "output");

  const p = exec(`cd ${outDir} && npm install && npm run build`);

  p.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  p.stdout.on("error", (data) => {
    console.error(data.toString());
  });

  p.stdout.on("close", async () => {
    console.log("Build completed");
    const distFolderPath = path.join(outDir, "dist");
    const distFolderContents = fs.readdirSync(distFolder, { recursive: true });

    for (const filePath of distFolderContents) {
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log(`Uploading ${filePath}`);

      const command = new PutObjectCommand({
        Bucket: "rohan-vercel-clone",
        Key: `__outputs/${PROJECT_ID}/${filePath}`,
        Body: fs.createReadStream(filePath),
        contentType: mime.lookup(filePath),
      });

      await s3Client.send(command);

      console.log(`Uploaded ${filePath}`);
    }
    console.log("Done...");
  });
};

init();
