import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/products", "/selector", "/compare", "/applications", "/about", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...products];
}
