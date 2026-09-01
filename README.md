# 3S Technology — v2 (Next 16)

The house-stack rebuild of https://3stechnology.in. Decision #45, 2026-08-23.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 36 static routes
```

## Features

| route | what it does |
|---|---|
| `/selector` | Two questions — what you measure, what the service is — scored against a duty table in `src/data/selector.ts`, every recommendation carrying its reason. Includes the pressure/temperature converter. |
| `/compare` | Up to three instruments in columns, one row per spec label, `—` where an instrument does not carry it. |
| `/enquiry` | The RFQ basket: per-line quantity and a spec note, printable as a standalone quotation request, sendable whole over WhatsApp or the form. |
| `/products` | Spec-aware search plus facet chips (size, IP 65, stainless, NPT/BSP, liquid-fillable). |
| `/admin` | The enquiry inbox — the fix for leads landing in a table nobody opens. |

### The admin back office

One shared password in `ADMIN_PASSWORD`, checked in constant time; the cookie is
an HMAC over an expiry, keyed by a hash *derived* from the password, so the
cookie is never the password and cannot be replayed as a login. Sessions last
12 hours. Read/unread is per-device in localStorage — marking a lead read must
never write to the client's own database.

**This is sized for a one-person back office reading its own leads.** If it ever
guards more than that, replace it with real auth rather than extending it.

## Environment

Create `.env.local` — **never commit it**:

```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_KEY=<anon or service key>
```

Both are **server-only** (no `NEXT_PUBLIC_` prefix) and are read solely by
`src/app/api/enquiry/route.ts`. The key never reaches the browser. If either is
missing the API answers `{stored:false}` and the form shows the WhatsApp/email
fallback rather than claiming the message was sent — which is precisely the
failure the old site hid.

## Themes

Two are kept. Switch live with the preview control at bottom-left, or set
`data-theme` on `<html>` by hand. Both are defined in `src/app/globals.css`
under the same token names, so no component knows which one is on — only the
values swap. The table itself is `src/data/themes.ts`.

| token | **Flame** (default) | Graphite |
|---|---|---|
| origin | sampled from `public/3s-mark.png` | the first pass, kept |
| `--color-signal` | `#d03731` — the logo's flame, exactly | `#c8102e` |
| `--color-signal-2` | `#a82a25` | `#a20d25` |
| `--color-paper` | `#f7f7f8` neutral | `#faf8f5` warm cream |
| `--color-paper-2` | `#edeef0` | `#f1eee8` |
| `--color-paper-3` | `#e0e1e4` | `#e6e2da` |
| `--color-ink` | `#101214` | `#14181c` |
| `--color-ink-3` | `#35393d` | `#39424b` |
| `--color-ink-soft` | `#6b7075` | `#626d78` |
| `--color-ink-faint` | `#9ca1a6` | `#98a1aa` |
| `--color-rule` | `#dcdce0` | `#ded9d0` |
| `--color-rule-dark` | `#282b2e` | `#2c343b` |

**Why Flame is the default.** The mark is a red flame over a near-black `3S`,
and its own grey ramp is neutral. The measured logo red is `#d03731` — warmer
and more vermilion than Graphite's crimson — and Graphite's cream ground fought
the mark's neutral greys, so the header logo read as pasted on. Flame matches it.

`ThemeSwitch.tsx` is a **preview control, not a customer feature**. Delete the
component and its import from `layout.tsx` before deploy; the themes survive
without it.

## Where things are

| path | what |
|---|---|
| `src/data/products.ts` | all 25 instruments and every spec — the single source |
| `src/data/site.ts` | addresses, phones, GSTIN, industries, capabilities |
| `src/app/globals.css` | both theme token blocks |
| `src/data/themes.ts` | the theme table — names, swatches, why |
| `src/components/Rfq.tsx` | the enquiry-list store (localStorage) |
| `src/components/Dial.tsx` | the drawn gauge face used as the brand motif |

## Deploy

Cloudflare, same as v1. `next build` then deploy — set the two env vars in the
Cloudflare dashboard, not in a file.
