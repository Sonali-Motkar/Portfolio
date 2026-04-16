const { spawn } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm run dev" : "npm run dev";

const spawnNpm = (label, cwd) => {
  const child = spawn(npmCommand, {
    cwd,
    stdio: "inherit",
    shell: true
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`);
      process.exitCode = code;
      shutdown();
    }
  });

  return child;
};

const server = spawnNpm("server", path.join(root, "server"));
const client = spawnNpm("client", path.join(root, "client"));

let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;

  for (const child of [server, client]) {
    if (child && !child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(process.exitCode || 0), 250);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
