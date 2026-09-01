// `npm run build` — and, on a Linux CI, the Cloudflare Worker bundle too.
//
// Cloudflare Workers Builds runs `npm run build` and then `npx wrangler deploy`.
// Wrangler sees an OpenNext project and delegates to `opennextjs-cloudflare
// deploy`, which needs `.open-next/` to already exist. Plain `next build` does
// not make it — that is the exact failure of the 2026-09-01T13:15Z build:
//
//     ERROR Could not find compiled Open Next config, did you run the build command?
//
// So the CI build has to produce the bundle. The dashboard needs no change.
//
// It is skipped on Windows on purpose: OpenNext copies traced external packages
// by SYMLINK, which is EPERM here without Developer Mode. `npm run cf:build`
// sets CF_BUILD=1 to dodge that, but it also un-externalises nodemailer, and a
// `.next` built that way breaks SMTP under `next start` (Turbopack rewrites the
// socket handling — every send dies ETIMEDOUT on CONN). The local preview flow
// must keep that working, so here Windows gets a plain `next build` and the
// worker bundle is an explicit `npm run cf:build` when you actually want it.
//
// FORCE_CF_BUILD=1 overrides, for testing the CI path on this machine.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const wantsWorker = process.platform !== "win32" || process.env.FORCE_CF_BUILD === "1";

const run = (args, env = {}) =>
  spawnSync(process.execPath, args, { stdio: "inherit", env: { ...process.env, ...env } }).status ?? 1;

const bin = (pkg, sub) => fileURLToPath(new URL(`../node_modules/${pkg}/${sub}`, import.meta.url));

if (wantsWorker) {
  // The adapter runs `next build` itself, then bundles.
  process.exit(run([bin("@opennextjs/cloudflare", "dist/cli/index.js"), "build"], { CF_BUILD: "1" }));
}

const status = run([bin("next", "dist/bin/next"), "build"]);
if (status === 0) {
  console.log("\nWindows: worker bundle skipped. `npm run cf:build` makes .open-next/worker.js.");
}
process.exit(status);
