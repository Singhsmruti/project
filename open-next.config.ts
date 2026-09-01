import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare Workers. Defaults on purpose.
 *
 * No incremental cache is configured: every route here is either prerendered at
 * build time or `force-dynamic` (/admin and the three API routes). There is no
 * ISR and nothing to revalidate, so an R2 cache binding would be a resource to
 * create, pay for and forget about. Add one the day a route revalidates.
 */
export default defineCloudflareConfig();
