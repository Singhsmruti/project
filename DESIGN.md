# DESIGN.md — 3S Technology

**The design DNA of the v2 rebuild, in the one format an agent can act on.**

Read this before touching a component. Where this file and a component
disagree, this file is right and the component is a bug.

> **STATUS — v2 has not had Onkar's visual verdict.**
> This file is a *record* of what v2 already is. It is not a licence to
> redesign. Do not move a pixel on the strength of it until he has walked the
> pages and said so. Written 2026-08-26.

- Stack: **Next 16.2.12 · React 19.2.4 · Tailwind 4 · TypeScript** (house stack)
- Tokens live in `src/app/globals.css`; the theme table is `src/data/themes.ts`
- Content lives in the four data files — **never in a component** (§7)

---

## 1. What this site is

A **heavy-duty pressure and temperature gauge manufacturer** in Vasai (East),
Palghar. 25 instruments, 5 industries, 38 real product photographs.

The buyer is a purchase engineer or a plant manager. He is looking for a
**range, a connection size and a case material** — and then a number to
WhatsApp. He is not looking to be delighted.

> **The register is a datasheet, not a SaaS landing page.**
> Hairline rules, tabular figures, no drop shadows, no gradients, no glass.

---

## 2. Colour

**The theme comes off the logo.** The mark is a red flame over a near-black
`3S` with a gauge needle drawn through it. Every value in *Flame* was
**measured from `public/3s-mark.png` with PIL** — not picked, not guessed.

The mark's own anti-alias ramp is **neutral grey**, so the ground is neutral
too. It is deliberately not cream: cream was the first pass, and it is kept as
a second theme rather than thrown away.

### Flame — the default

| token | value | role |
|---|---|---|
| `--color-paper` | `#f7f7f8` | page ground — neutral steel |
| `--color-paper-2` | `#edeef0` | alternating band |
| `--color-paper-3` | `#e0e1e4` | recessed / table header |
| `--color-ink` | `#101214` | headings, spec values |
| `--color-ink-2` | `#191c1f` | dark section ground |
| `--color-ink-3` | `#35393d` | body on light |
| `--color-ink-soft` | `#6b7075` | captions, `.eyebrow` |
| `--color-ink-faint` | `#9ca1a6` | disabled, placeholder |
| `--color-rule` | `#dcdce0` | the hairline — the site's only separator |
| `--color-rule-dark` | `#282b2e` | hairline on a dark band |
| `--color-signal` | `#d03731` | **the flame.** The logo's exact red |
| `--color-signal-2` | `#a82a25` | hover / pressed |

### Graphite — kept, not default

Warm cream paper, colder crimson. Softer and more editorial; reads **less like
the logo**, which is exactly why it is not the default. Kept because Onkar said
it was also good.

`paper #faf8f5` · `paper-2 #f1eee8` · `paper-3 #e6e2da` · `ink #14181c` ·
`ink-2 #1e242a` · `ink-3 #39424b` · `ink-soft #626d78` · `ink-faint #98a1aa` ·
`rule #ded9d0` · `rule-dark #2c343b` · `signal #c8102e` · `signal-2 #a20d25`

Both themes use **the same token names**, so no component knows which is
active — only the values swap. A theme is added by adding a `:root[data-theme]`
block and a row in `themes.ts`. Nothing else moves.

### Two hard colour rules

1. **Never dark mode.** This is a non-tech client and the site stays light.
   There is no dark theme and one must not be added. `--color-ink-2` is a
   *section* ground, not a page ground.
2. **The signal is the flame and nothing else.** It marks the `.eyebrow` tick,
   the active state and the primary action. It is not a decorative accent and
   it is not sprinkled. On the hero dial the needle runs at `0.3` opacity via
   the `needleOpacity` prop — at full strength it slashed across the stats.

---

## 3. Type

| role | face | var |
|---|---|---|
| everything | **Archivo** | `--font-archivo` → `--font-sans` |
| specs, figures, eyebrows | **IBM Plex Mono** | `--font-mono-spec` → `--font-mono` |

`.spec` goes on **every specification value** — mono, `tabular-nums`,
`font-feature-settings: "tnum"`. Columns of ranges and connection sizes must
line up down the page. A spec table where the digits wander is the fastest way
to look like you do not make instruments.

`.eyebrow` — the label above every section heading. Mono, `0.6875rem`, tracking
`0.18em`, uppercase, `--color-ink-soft`, with a **1.25rem × 2px flame tick**
drawn by `::before`. The tick comes from CSS, never from markup.

---

## 4. Material

There is almost none, and that is the point.

| device | what it is |
|---|---|
| `border-rule` hairline | the **only** separator. Never a drop shadow. |
| `.gridpaper` | 22px graph-paper wash behind cut-out product photos, so a gauge on white still reads as sitting on something |
| `.gridpaper-dark` | the same at 28px on a dark band |
| `.no-print` | anything that must not appear on a printed RFQ |

`next/image` everywhere — it is what keeps the 1–1.8 MB source PNGs
deliverable. (The originals are still uncompressed; that is an open task.)

Server components by default. `"use client"` only for real interactivity.

---

## 5. Photography — the client's own, always

**38 real gauge photographs exist. Do not substitute stock, and do not draw a
replacement.** If a product has no photo, show the spec block, not an
invention.

**The logo is the original, minus one line.** `public/3s-lockup.png` is cropped
from `3s-mark.png` at `(6,0,199,156)` — everything above the "TECHNOLOGY" row.
Onkar asked for the real `3S` mark, not a flame-only abstraction: keep the
flame, the `3S`, and the needle drawn through it. The word "Technology" is set
in the site typeface beside it, because at header size the PNG lettering was
illegible and printing the company name twice looked like a mistake.

---

## 6. Contact — the rule that outranks layout

**An Indian SME buyer answers WhatsApp. He does not fill in a form.**

- A `wa.me` link belongs on **every page**, not only `/contact`.
  `WhatsAppFloat.tsx` is not decoration.
- **Never claim an enquiry was sent when it was not.** When the form cannot
  deliver, it falls back to WhatsApp/email **with the message written out** so
  the buyer can send it himself. That behaviour is the entire reason for this
  rebuild — do not "simplify" it away.

The v1 live form **has never worked**: the deployed bundle contains the literal
string `your-anon-key-here` where the Supabase key should be. Every enquiry
ever submitted was lost. That is the failure this rule exists to prevent.

The client **has** a GSTIN (`27BPMPB9077E1ZN`). Alvion's zero-GST rule is about
Alvion's own invoices, not about what this site may display.

---

## 7. Content lives in data, never in a component

| file | holds |
|---|---|
| `src/data/products.ts` | the 25 instruments and every spec |
| `src/data/selector.ts` | the duty questions and the *why* on each answer |
| `src/data/site.ts` | company facts, numbers, inboxes |
| `src/data/themes.ts` | the theme table |

Change copy there. A string hard-coded into a component is a bug even when it
renders correctly.

---

## 8. Verification

Chrome-in-Claude is banned (Onkar, 2026-08-13) and the local `look_screen`
drop-ins do not resolve. Drive Chrome's DevTools Protocol from Node — no
dependencies, Node 24 has a global `WebSocket`.

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --remote-debugging-port=9222 --user-data-dir=/tmp/cdp about:blank &
node overflow.mjs http://localhost:3006/products 390   # wider than the viewport?
node shot.mjs http://localhost:3006/ out.png 390 1400  # full-page, real emulation
```

**Do NOT use old headless `--screenshot` for mobile.** It ignores device
emulation and produced screenshots that looked catastrophically clipped on
every page when nothing was wrong — an hour spent chasing a bug that did not
exist. Trust `document.documentElement.scrollWidth` over a picture.

Every route is verified clean at **1440** and **390**. Run the sweep after any
layout work.

### The five bugs this method caught — do not reintroduce

| symptom | cause |
|---|---|
| `/products/*` overflowed 39px at 1440 | grid child defaults to `min-width:auto`; long mono spec strings forced the column wider than the container → `min-w-0` |
| specs then broke one character per line | `aspect-square` photo **stretched to row height**, so a long spec list made it tall → then square → then 966px wide, starving the text column → `self-start` |
| header printed the company name twice | the logo PNG *contains* the words; it was paired with a text wordmark → crop, §5 |
| red needle slashed the hero stats on mobile | dial body at 7% opacity but the needle was full-strength → `needleOpacity` |
| a hero stat wrapped after its arrow | `−50 → 650` broke at the space → `−50…650` + `whitespace-nowrap` |

---

## 9. Open, and blocked on a person not on code

1. **The real Supabase anon key.** Until it lands, the v1 live form keeps
   losing enquiries and `/admin` has nothing to read. Highest-value action on
   this project.
2. **Cloudflare access** — `www.3stechnology.in` is HTTP 522, and v2 cannot
   deploy without it.
3. **Has anyone ever opened the `inquiries` table?** Rows mean a working key
   existed briefly and there are real unread leads. `/admin` answers it the
   moment the key arrives.

### Before v2 deploys

- [ ] **Delete `ThemeSwitch`** — the component *and* its import in `layout.tsx`.
      It is a preview control. Themes survive without it.
- [ ] Change `ADMIN_PASSWORD` — `.env.local` still holds the throwaway
      `letmein-3s-preview`.
- [ ] Compress the source images — `next/image` delivers them, but the
      originals are 1–1.8 MB PNGs.
- [ ] Mobile `/selector` shows results below ten options, so answering step 1
      looks like nothing happened. Needs scroll-to-results or a results-first
      order on small screens. **Onkar's call.**
- [ ] Onkar's visual verdict on v2. Ask; do not assume approval.
