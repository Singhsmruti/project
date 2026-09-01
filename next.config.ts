import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // nodemailer must NOT be bundled. Turbopack rewrites its socket handling and
  // every send dies with ETIMEDOUT on CONN against a server that is demonstrably
  // reachable — a full hour's worth of wrong diagnosis if you don't know it.
  // ...but the Cloudflare build must NOT mark it external. OpenNext copies every
  // traced external package by SYMLINK, and creating one on Windows without
  // Developer Mode is EPERM — the worker bundle dies on `nodemailer`. On
  // Workers there is no Turbopack socket rewrite to avoid anyway, so the
  // Cloudflare build bundles it normally. scripts/cf-build.mjs sets CF_BUILD.
  serverExternalPackages: process.env.CF_BUILD === "1" ? [] : ["nodemailer"],
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
