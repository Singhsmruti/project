// Cloudflare worker build. Wraps `opennextjs-cloudflare build` for one reason:
// it has to run with CF_BUILD=1, and an inline env prefix is not portable
// across PowerShell, cmd and bash.
//
// CF_BUILD tells next.config.ts to stop marking nodemailer as a server-external
// package. OpenNext copies traced external packages by symlink, and a symlink on
// Windows without Developer Mode is EPERM — the bundle dies there. Bundling it
// normally costs nothing on Workers, where the Turbopack socket rewrite that
// made it external in the first place does not apply.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// The adapter's JS entry is called directly rather than through npx. Node 20.12+
// refuses to spawn a .cmd shim without `shell: true`, and it fails SILENTLY here
// — status null, no output, exit 1, nothing to read. Going straight at the
// module skips the shim and the shell both.
const cli = fileURLToPath(
  new URL("../node_modules/@opennextjs/cloudflare/dist/cli/index.js", import.meta.url),
);

const r = spawnSync(
  process.execPath,
  [cli, "build", ...process.argv.slice(2)],
  { stdio: "inherit", env: { ...process.env, CF_BUILD: "1" } },
);
process.exit(r.status ?? 1);
