import { cpSync, mkdirSync, rmSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist");
if (dirname(output) !== resolve(root) || basename(output) !== "dist") throw new Error("Invalid build directory");
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const path of ["index.html", "css", "js", "assets"]) {
  cpSync(resolve(root, path), resolve(output, path), { recursive: true });
}
console.log("Static site generated in dist/.");
