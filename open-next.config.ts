import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare Workers. Defaults, with one deliberate override.
 *
 * No incremental cache is configured: every route here is either prerendered at
 * build time or `force-dynamic` (/admin and the three API routes). There is no
 * ISR and nothing to revalidate, so an R2 cache binding would be a resource to
 * create, pay for and forget about. Add one the day a route revalidates.
 */
const config = defineCloudflareConfig();

/**
 * THE ADAPTER BUILDS THE APP BY RUNNING `npm run build` — read that twice.
 *
 * `buildNextjsApp` defaults to `${packager} run build`. Cloudflare Workers Builds
 * also runs `npm run build`, and that script has to produce `.open-next/` or the
 * deploy step dies with "Could not find compiled Open Next config". Wire the two
 * together naively — make `build` call the adapter — and `build` invokes the
 * adapter which invokes `build` which invokes the adapter, forever. Measured on
 * 2026-09-01: it forks until the process dies, and on CI it would burn the whole
 * build minute limit before failing.
 *
 * Pointing the adapter at `next build` directly is what breaks the loop.
 */
config.buildCommand = "npx --no-install next build";

export default config;
