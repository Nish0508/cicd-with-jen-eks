const { build } = require("vite");
const path = require("path");
const glob = require("glob");
const fs = require("fs/promises");
const crypto = require("node:crypto");

const ROOT_DIR = path.join(__dirname, "../");
const STAGE_HASH_PATH = path.join(ROOT_DIR, "stage-hash.txt");
const COMMIT_HASH_PATH = path.join(ROOT_DIR, "commit-hash.txt");

const stageHash = async () => {
  const indexHTML = path.join(ROOT_DIR, "./dist", "index.html");
  let hash = "";
  try {
    const fileBuffer = await fs.readFile(indexHTML);
    const secret = "abcdefg";
    hash = crypto.createHmac("sha256", secret).update(fileBuffer).digest("hex");
  } catch {
    // ignor
  }
  console.log(`hash: ${hash}`);
  // write the commit hash to a file inside the dist folder
  await fs.writeFile(STAGE_HASH_PATH, hash);
};

const commitHash = async () => {
  await fs.copyFile(STAGE_HASH_PATH, COMMIT_HASH_PATH);
  fs.unlink(STAGE_HASH_PATH).catch(() => {
    // ignore error
  });
};

const run = async () => {
  await stageHash();
  let tempDist = path.resolve(ROOT_DIR, "tempdist");
  let mainDist = path.resolve(ROOT_DIR, "dist");
  await build({
    build: {
      outDir: tempDist
    }
  });
  // delete source maps
  let sourceMaps = await glob.sync(`${tempDist}/assets/*.js.map`);

  await Promise.all(sourceMaps.map((each) => fs.unlink(each)));
  console.log(`found & removed ${sourceMaps.length} total sourcemaps`);
  // overwrite main dist
  await fs.rm(mainDist, { recursive: true, force: true });
  await fs.rename(tempDist, mainDist);

  await commitHash();
};

run();
