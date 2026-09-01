import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductViewer from "@/components/ProductViewer";
import RfqButton from "@/components/RfqButton";
import { SHIP_3D_MODELS } from "@/data/flags";
import { modelFor } from "@/data/models";
import { PRODUCTS, bySlug, CATEGORIES } from "@/data/products";
import { SITE } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return { title: "Product not found" };

  const key = p.specs
    .slice(0, 3)
    .map((s) => `${s.label}: ${s.values[0]}`)
    .join(" · ");

  return {
    title: p.name,
    description: `${p.summary} ${key}. Manufactured by 3S Technology, Vasai, Maharashtra.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} — ${SITE.name}`,
      description: p.summary,
      images: [{ url: p.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.key === product.category)!;
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${SITE.url}${product.image}`,
    category: category.label,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: SITE.name },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.values.join("; "),
    })),
  };

  // SHIP_3D_MODELS is off for this release (Onkar, 2026-09-01): every product
  // page opens on the photograph. The models are parked, not gone — flip the
  // flag and move _parked/models back into public/ and they return untouched.
  const model = SHIP_3D_MODELS ? modelFor(product.slug) : null;

  const waText = `Hello 3S Technology — I would like a quotation for: ${product.name} (${SITE.url}/products/${product.slug})`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------- breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="no-print border-b border-rule bg-paper-2"
      >
        <ol className="spec mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3 text-[13px] tracking-[0.08em] text-ink-soft uppercase">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-faint">
            /
          </li>
          <li>
            <Link href="/products" className="hover:text-ink">
              Products
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-faint">
            /
          </li>
          <li>
            <Link
              href={`/products?category=${category.key}`}
              className="hover:text-ink"
            >
              {category.label}
            </Link>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ------------------------------------------- the instrument itself */}
          {/* self-start is load-bearing: a grid item stretches to the row height
              by default, and combined with aspect-square that made the photo as
              TALL as the spec list, then as WIDE as it was tall — starving the
              text column. Let its height follow its own width instead.

              This release ships the PHOTOGRAPH on all 25 pages — SHIP_3D_MODELS
              is false, so `model` is always null and this is always the Image
              branch. When the flag goes back on, a page with a confirmed model
              hands the slot to ProductViewer and the photograph becomes its
              poster, its fallback and its alternate view; which pages have one
              comes from data/models.ts, generated from public/models/ itself. */}
          {model ? (
            <ProductViewer
              slug={product.slug}
              model={model}
              image={product.image}
              name={product.name}
              summary={product.summary}
            />
          ) : (
            <div className="gridpaper relative aspect-square self-start border border-rule">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.summary}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
                priority
              />
            </div>
          )}

          {/* ------------------------------------------------------ the pitch */}
          {/* min-w-0: a grid child defaults to min-width:auto, so the long mono
              spec strings below would force the column — and the whole grid —
              wider than the container. Measured 1464px in a 1425px viewport. */}
          <div className="min-w-0">
            <p className="eyebrow">{category.label}</p>
            <h1 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.025em] text-balance md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">
              {product.summary}
            </p>

            <div className="no-print mt-8 flex flex-wrap gap-3">
              <RfqButton slug={product.slug} size="lg" />
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="spec border border-rule px-6 py-3.5 text-[15px] tracking-[0.08em] text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink"
              >
                Ask on WhatsApp
              </a>
            </div>

            {/* --------------------------------------------------- datasheet */}
            <div className="mt-12">
              {/* The datasheet's five type sizes, as Onkar set them 2026-09-01:
                  name bold and large · summary regular grey · SPECIFICATION small
                  uppercase and letter-spaced · label smaller grey · value dark and
                  medium. The label is ink-SOFT, not ink-faint — faint grey on paper
                  is under 3:1 and the size bump means nothing if the contrast
                  still hides it. */}
              <p className="spec text-[13px] tracking-[0.16em] text-ink-soft uppercase">
                Specification
              </p>
              <dl className="mt-4 divide-y divide-rule border-y border-rule">
                {product.specs.map((s) => (
                  <div
                    key={s.label}
                    className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[15px] text-ink-soft">{s.label}</dt>
                    <dd className="spec-value min-w-0 text-base leading-relaxed break-words">
                      {s.values.length === 1 ? (
                        s.values[0]
                      ) : (
                        <ul className="space-y-1">
                          {s.values.map((v) => (
                            <li key={v} className="flex gap-2">
                              <span
                                className="shrink-0 text-signal"
                                aria-hidden="true"
                              >
                                ·
                              </span>
                              {/* min-w-0 again: a flex child will not shrink below
                                  its content without it, and these connection
                                  strings are long and unbreakable. */}
                              <span className="min-w-0 break-words">{v}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[15px] text-ink-soft">HSN code</dt>
                  <dd className="spec-value text-base">{product.hsn}</dd>
                </div>
              </dl>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                Non-standard ranges, dials, materials and connections are made to
                order. Send us the media, the working pressure and the connection —
                we quote against a specification.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- related */}
        {related.length > 0 && (
          <section className="no-print mt-20 border-t border-rule pt-12">
            <p className="eyebrow">Also in {category.label.toLowerCase()}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group border border-rule bg-white transition-colors hover:border-ink"
                >
                  <div className="gridpaper relative aspect-4/3 border-b border-rule">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base leading-snug font-semibold group-hover:text-signal">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
