import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // nodemailer must NOT be bundled. Turbopack rewrites its socket handling and
  // every send dies with ETIMEDOUT on CONN against a server that is demonstrably
  // reachable — a full hour's worth of wrong diagnosis if you don't know it.
  serverExternalPackages: ["nodemailer"],
  // Dev-only. Without this, `next dev` blocks /_next/* dev resources from any
  // host that isn't localhost, so a site shared over an ngrok tunnel renders
  // but never hydrates — links work, every button is dead. Ignored by `build`.
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
