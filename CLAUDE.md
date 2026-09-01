# 3S Technology — v2 codebase

**Read [`../CLAUDE.md`](../CLAUDE.md) first** — it holds where the project stands,
what is blocking it, and the rules that govern this site. This file is the code.

Next 16.2.12 · React 19.2.4 · Tailwind 4 · TypeScript. Same versions as Sigma,
deliberately — this is the house stack, and decision **#45** put it here.

```bash
npm install
npm run dev -- -p 3006     # 3006 because that is where it was left running
npm run build              # must stay at 40 routes, 25 of them /products/<slug>
npx tsc --noEmit           # strict; it has never been allowed to fail
```

---

## Architecture in one screen

Everything is static except three routes. There is no database client in the
browser and no state library — the two pieces of client state are a React context
over `localStorage` and a `data-theme` attribute.

```
src/
  app/
    layout.tsx            root: fonts, JSON-LD org, RfqProvider, no-flash theme script
    page.tsx              home
    products/page.tsx     catalogue shell → <ProductBrowser> in <Suspense>
    products/[slug]/      25 SSG pages — generateStaticParams + generateMetadata
    selector/page.tsx     the duty finder + unit converter
    compare/page.tsx      side-by-side spec table
    enquiry/page.tsx      the RFQ basket + form          (noindex)
    contact/  about/  applications/
    admin/page.tsx        server-gated inbox              (force-dynamic, noindex)
    api/enquiry/          POST → Supabase REST, server-side
    api/admin/login|logout
    sitemap.ts robots.ts not-found.tsx globals.css
  components/             all the UI; "use client" only where it must be
  data/                   products · site · selector · themes   ← the four sources of truth
  lib/                    units · enquiry · admin
```

### The four data files — change content here, never in a component

| file | holds | rule |
|---|---|---|
| `data/products.ts` | 25 instruments, every spec | **the** source for numbers. `Spec = {label, values[]}` |
| `data/site.ts` | addresses, phones, GSTIN, industries, capabilities | one place; the footer/header/contact all read it |
| `data/selector.ts` | what each instrument is *for* | judgement about duty, kept out of the spec sheet |
| `data/themes.ts` | the theme table | see below |

`data/selector.ts` must contain **a rule for every slug in `products.ts`**. Verify
after any product change:

```bash
python - <<'PY'
import re, io
p = re.findall(r'slug: "([^"]+)"', io.open("src/data/products.ts", encoding="utf-8").read())
s = io.open("src/data/selector.ts", encoding="utf-8").read()
b = s.split("export const RULES")[1].split("export type Match")[0]
k = set(re.findall(r'^\s{2}"?([a-z0-9-]+)"?:\s*\{', b, re.M))
print("missing:", [x for x in p if x not in k] or "none", "| extra:", [x for x in k if x not in p] or "none")
PY
```

---

## Visual QA — how to actually look at this

Chrome-in-Claude is banned (Onkar, 2026-08-13) and the local `look_screen`
drop-ins do not resolve. Drive Chrome's debug protocol from Node instead — no
dependencies, Node 24 has a global `WebSocket`. **`../tools/shot.mjs` is the
script**; it lived in the session scratchpad twice and was deleted twice by
another process cleaning that directory, so it is in the repo now. It reports
`scrollW` vs `innerW` and the viewer's `loaded` / `modelIsVisible` alongside the
picture. Give Chrome a `--user-data-dir` OUTSIDE the scratchpad too, or the same
cleanup empties the profile mid-session and every request fails
`ERR_CACHE_READ_FAILURE`.

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new   --remote-debugging-port=9222 --user-data-dir=/tmp/cdp about:blank &
node overflow.mjs http://localhost:3006/products 390   # what is wider than the viewport
node shot.mjs http://localhost:3006/ out.png 390 1400  # full-page, real emulation
```

**To see a 3D model in that headless Chrome you need `--enable-unsafe-swiftshader`**
— without it there is no WebGL, `<model-viewer>` fires `error`, ProductViewer
correctly falls back to the photograph, and you conclude the models are broken
when the *browser* was. Verified working 2026-08-31 on Chrome 151: `next build`,
`next start -p 3007`, then read `el.loaded` / `el.modelIsVisible` off the element
(not `getAttribute("src")` — React sets it as a property).


**Do NOT use old headless `--screenshot` for mobile.** It ignores device
emulation and produced screenshots that looked catastrophically clipped on every
page when nothing was wrong — an hour chasing a bug that did not exist. Trust
`document.documentElement.scrollWidth` over a picture.

### Bugs this found and fixed, 2026-08-23

| symptom | cause | fix |
|---|---|---|
| Product page overflowed 39px at 1440 | grid child defaults to `min-width:auto`; long mono spec strings forced the column wider than the container | `min-w-0` on the pitch column and on `dd`/flex children |
| Then specs broke one character per line | `aspect-square` photo **stretched to row height**, so a long spec list made it tall → then square → then 966px wide, starving the text column | `self-start` on the photo wrapper |
| Header printed the company name twice | the logo PNG *contains* the words "3S TECHNOLOGY", and it was paired with a text wordmark; at header size the PNG lettering was illegible | `public/3s-lockup.png` — the original mark (flame + `3S` + the gauge needle through it), transparent, 3× upscaled, with **only the TECHNOLOGY line cropped off**; the word is set in the site typeface beside it |
| Red needle slashed across the hero stats on mobile | dial body at 7% opacity but the needle was full-strength `--color-signal` | `needleOpacity` prop, hero passes `0.3`; also repositioned on small screens |
| A hero stat wrapped after its arrow | `−50 → 650` broke at the space | value is `−50…650`, `whitespace-nowrap` on all four |

**Every route is verified clean at 1440 and 390** — run the sweep after layout work.

### Known, not yet fixed

- On mobile `/selector`, the results sit below all ten service options, so
  answering step 1 shows no visible change without scrolling. Needs either a
  scroll-to-results or a results-first order on small screens. **Onkar's call.**

## Things that will bite you

**The logo is the original, minus one line.** `public/3s-lockup.png` is cropped
from `3s-mark.png` at `(6,0,199,156)` — everything above the "TECHNOLOGY" row,
whose first inked row is 159. Onkar asked for the real `3S` mark, not a
flame-only abstraction: keep the flame, the `3S`, and the needle drawn through
it. `3s-mark.png` stays as the untouched original. Do not re-crop tighter.

**Themes.** Two token blocks in `globals.css` under the *same* names — `@theme`
(Flame, default) and `:root[data-theme="graphite"]`. Components never know which
is on; only values swap. Adding a third theme = one entry in `data/themes.ts` +
one CSS block. Colours are sampled from `public/3s-mark.png`, not invented.

**Hydration.** `<html>` renders `data-theme={DEFAULT_THEME}` **in SSR** and carries
`suppressHydrationWarning`. Both are load-bearing: the pre-paint script in `<head>`
rewrites the attribute before React hydrates, and without the SSR default that is
a mismatch. This was a real bug, already fixed once — do not "tidy" either away.

**The enquiry fallback is the point of the rebuild.** `api/enquiry` returns
`{delivered:false}` rather than throwing when every channel fails, and
`EnquiryForm` then shows WhatsApp + mailto with the message written out. v1 told
visitors their message was sent when it never was. Never restore that behaviour.

**Pressing "Send enquiry" now actually sends an email.** Two independent routes
run in parallel (`Promise.all`) and *either* one succeeding means the lead is safe:

| route | goes to | configured by |
|---|---|---|
| SMTP email | `ENQUIRY_TO`, default `SITE.emails[0]` | `SMTP_*` in `.env.local` |
| Supabase row | `inquiries`, read by `/admin` | `SUPABASE_*` |

`{delivered, emailed, stored}` comes back; the form says "Sent" only when
`emailed`, "Received" when only `stored`, and falls back when neither. **Do not
collapse this to a boolean** — the distinction is what keeps the promise honest.
`GET /api/enquiry` reports which channels are wired without sending anything.

**The sending account is NOT the receiving account, deliberately.** `SMTP_USER`
is a dedicated throwaway Gmail that only ever sends; `ENQUIRY_TO` is the real
company inbox. A Gmail app password grants full mailbox access, so putting one
for `3stechnology2024@gmail.com` into a `.env` would hand every credential-holder
Smruti's actual mail. The throwaway holds nothing worth stealing and can be
revoked without touching the business account. **Do not collapse the two vars.**

Gmail needs an **app password**, not the account password (2-Step Verification
must be on for the *sending* account). `from` is the site, never the buyer —
spoofing the buyer's address fails SPF/DMARC and Gmail rewrites it anyway.
`replyTo` carries the buyer, so hitting reply answers them directly.

```bash
npm run mail:check           # are the credentials good? sends nothing
npm run mail:check -- send   # send one real test email to ENQUIRY_TO
```

**Test enquiries must use reserved domains — `example.com`, `example.in`.**
Never invent a realistic company address. A plausible Indian firm name is
plausible *because* firms like it exist: `krishnaengg.co.in` was made up for a
test on 2026-08-25 and turned out to be a real business on live Zoho mail. The
mail lands in your own inbox either way, but `replyTo` carries that address —
so one Reply sends a quotation to a stranger who never enquired.

First real send from a brand-new Gmail often lands in **spam**. Open it once and
mark "Not spam", or the leads pile up unseen in a folder nobody opens.

**`serverExternalPackages: ["nodemailer"]`** is set in `next.config.ts`. Keep it.

**The form is now a spam vector into someone's real inbox.** It was only a
database write before. Two guards, both in `api/enquiry/route.ts`: an off-screen
honeypot `website` field (a filled one gets a *fake success* — telling a bot it
failed only teaches it to retry), and a 5-per-10-minutes-per-IP throttle held in
memory. Keep both if you touch that route.

### Testing mail without real credentials

Do not test against Gmail. Run a local SMTP sink and point the server at it:

```bash
node smtp-catcher.mjs            # ~60 lines, listens on 2525, prints messages
SMTP_HOST=127.0.0.1 SMTP_PORT=2525 SMTP_USER=x SMTP_PASS=y npx next start -p 3007
```

**If you write your own catcher, handle `AUTH PLAIN <base64>` on one line.**
Answering it with an AUTH LOGIN username challenge deadlocks the session, and
nodemailer reports that as `ETIMEDOUT / command: 'CONN'` — which reads exactly
like an unreachable host and sends you hunting a networking bug that isn't there.
`next start` also serves the **built** output: rebuild after editing, or you will
test the previous version and not know it.

**Keys are server-only.** `SUPABASE_URL` / `SUPABASE_KEY` have no `NEXT_PUBLIC_`
prefix and are read only in route handlers and `lib/admin.ts`. The browser never
sees a key. Do not "simplify" by adding the Supabase SDK client-side.

**The RFQ store migrates.** `components/Rfq.tsx` reads both the current
`{slug,qty,note}[]` shape and the original `string[]`. Keep `parse()` tolerant —
a buyer's saved list must survive a deploy.

**Admin auth is small on purpose.** One shared password, constant-time compare,
HMAC cookie over an expiry keyed by a hash *derived* from the password (so the
cookie is never the password). 12-hour sessions. Sized for one person reading
their own leads — **if it ever guards more than read-only enquiries, replace it
with real auth rather than extending it.**

**`ThemeSwitch` must not ship.** It is a preview control. Delete the component
and its import in `layout.tsx` before deploy.

---

## The 3D models — SHIPPED, 2026-08-30

**17 of the 25 product pages open on a turnable model of the instrument**, with
the photograph one click away. Onkar's call, 2026-08-27; the models landed on
2026-08-30 and were repaired on 2026-08-31 — see **"What went wrong on 08-30"**
below before you touch any of this.

**Verified means the model was put beside the photograph.** On the morning of
2026-08-31 these were called verified because they *rendered* in a production
build. A GLB that loads proves delivery, not likeness; Onkar looked at the site
and found mismatches the same hour. `python ../tools/render_item.py` through
Blender against every file in `public/models/`, pasted next to `products.ts`'s
`image`, is the check that actually means something. Nothing here is verified
again without it.

| piece | where |
|---|---|
| the models | `public/models/<slug>.glb` — 17 files, 1.08–1.44 MB each, ~20 MB total |
| the generated index | `src/data/models.ts` — **generated, never hand-edited** |
| the viewer | `components/ProductViewer.tsx` |
| the element's types | `src/types/model-viewer.d.ts` — only the attributes actually passed |
| the pipeline | `../tools/publish_models.py` → `../tools/web_export.py` (Blender headless) |

```bash
python ../tools/publish_models.py          # re-export all, rewrite models.ts
python ../tools/publish_models.py 20 21    # just these two
```

**The number→slug mapping is derived, never typed.** A model knows the source
photograph it was reconstructed from (`3d-source/INDEX.md`); a product page knows
the same photograph (`products.ts` `image`). The photo filename **without its
extension** is the join key — the extension is deliberately excluded because
`products.ts` now serves `.webp` while `INDEX.md` still names the `.png` it was
modelled from. Hand-typing seventeen slugs is exactly how a vacuum gauge ends up
on the capsule gauge's page, and nothing downstream would catch it.

**Why a GLB and not the pre-rendered turntable frames** the Alvion `/spec` page
uses: on a datasheet the buyer wants the *back* — the connection, the stem, the
flats on the hex — and a fixed 36-frame orbit only ever offers one elevation.
The cost is paid lazily and only where it earns: `@google/model-viewer` is a
dynamic `import()` inside a `useEffect`, so it is never in the server bundle and
never downloaded on a page with no model.

**The photograph is the poster, the fallback AND the alternate view — all three.**
It is always mounted under the viewer at `opacity-0`, so it paints instantly from
`next/image` while the GLB arrives, and it is what remains on screen if the model
never arrives: no WebGL, a blocked request, a phone that gives up. An SME buyer on
mobile data must never be shown an empty grey box where the product was. The
toggle only renders once the model can actually be shown — **a dead toggle is
worse than no toggle**.

**React sets `src` on `<model-viewer>` as a property, not an attribute.**
`el.getAttribute("src")` reads `null` on a working viewer. Check `el.loaded` and
`el.modelIsVisible` instead — the attribute check will send you chasing a bug
that isn't there.

**Four confirmed models have no page and are skipped, loudly** — 01 Bellotype
Differential and 03 Chamber Type Differential (the site folds both into
`differential-gauges`, whose own model is 07 magnetic), 04 Commercial Compound
Gauge, and 17 Vacuum Gauge, one of the best models in the set. Their source
photographs are still in `public/products/` as untouched PNG, referenced by
nothing, ~5.4 MB. **Both the pages and those files are Onkar's call, not a bug
to route around.**

Eight pages that *do* exist have no model: 22–30, the accessories. Six of those
never reconstructed, and the reason is the photographs, not the tool — 28
Pulsation Dampeners is 277×182, 30 Thermowells is six objects plus burnt-in
orange text, 27 Pressure Snubbers turned the *drawn grey frame* around the parts
into geometry. They want re-shooting — one object, plain ground, 1000 px or
better. `3d-source/INDEX.md` lists every source photo with its pixel dimensions.

**Likeness is confirmed, and here is what that means.** Onkar, 2026-08-30:
opening a model in Blender, editing it and saving *is* the confirmation — it is
not a separate approval step. The standing rule "a model Onkar has not SEEN is
not confirmed" exists to stop *Merci* calling a model good off a render he never
opened; it stops applying the moment his own hands are on the file. All 21 are
confirmed, and 19 is confirmed **with** its slab stem — that is the shipped shape
unless he says otherwise.

## What went wrong on 08-30, and how the dials work now

Onkar looked at the site on 2026-08-31 and said the models did not match the
photographs. He was right, twice over, and both faults were provable rather than
matters of taste.

**Every dial face is cut from the photograph. Nothing is drawn.** Seventeen of
the twenty-one faces in `3d-source/dial-faces/` had been `*-drawn.png` —
synthesised from spec text — so numerals sat off the arc, 05 / 06 / 18 came back
nearly blank, and 10 carried the wrong scale entirely. The real cuts had existed
in `3d-source/dial-crops/` the whole time, and five photo faces had even been
retired into `dial-faces/_superseded/` in favour of drawn ones. That is the
opposite of the project's own rule: **use the client's own product photos.**
The drawn set is kept in `dial-faces/_superseded-drawn/` as evidence. Do not
bring it back.

```bash
python ../tools/dial_reface.py            # re-cut all 21 + a review sheet
python ../tools/dial_reface.py 20 21      # just these
python ../tools/retexture_edited.py       # put the faces on Onkar's discs
```

`dial_reface.py` finds the face by *being a dial*, not by being round: the
instrument from the photograph's alpha, the largest bright blob inside it, then
the outermost strong Canny ring. Its docstring records the three detectors that
failed first and why. **Always look at `3d-source/renders/_REFACE-all.png`
before seating** — it draws the chosen circle on each photograph beside the cut.

**Three models were the wrong product.** The 2026-08-30 recut of 19, 20 and 21
took the wrong grid cells, off by exactly twelve: `19-bi-metal-thermometers.glb`
was a byte-identical copy of 07's mesh, 20 of 08, 21 of 09 — same vertex counts
(198872 / 104018 / 244479), same extents. The Bi-Metal Thermometer page was
showing a differential gauge; both capillary thermometers were showing plain
round pressure gauges with no probe and no coil. Restored from
`products-dialed-v2/`, which still held the correct pre-recut meshes; the wrong
ones are in `products-edited/_wrong-body-2026-08-30/`.

**The cheap check that catches this class of bug outright** — no two products
should share a body:

```python
# 21 distinct, or something has been copied over something else
sig = {}
for f in glob.glob("../3d-source/products-edited/*.glb"):
    g = trimesh.load(f, process=False).geometry["gauge"]
    sig.setdefault((len(g.vertices), len(g.faces)), []).append(os.path.basename(f)[:2])
```

**A disc is placed from the photograph, not searched for in the mesh.**
`../tools/reseat_dial.py` maps the dial's position within the instrument's
silhouette onto the mesh's own box — **both axes invert**, because the
reconstruction came back rotated 180° from the sheet. Two geometric head-finders
failed first and are recorded in its docstring so nobody tries them a third time.

**`--lift-only` is how you touch a disc Onkar placed by hand.** It keeps his
centre and radius to the millimetre and moves the disc along the viewing axis
alone — the one thing his edit could not judge from the front. Tripo modelled a
pointer and a boss on the dial face, and a flush disc lets them poke through, so
10 and 19 were rendering with two needles.

**The dial must export OPAQUE or the JPEG setting is silently ignored.** Blender
falls back to PNG for any material needing alpha, and the disc arrives with
`alphaMode BLEND` from `seat_dial.py`. It never needed it — the disc is a 96-gon
whose UVs run to the inscribed circle, so the square corners are unsampled — but
the flag alone kept the face as a 0.97 MB PNG inside a 2.03 MB model.
`web_export.py` now unlinks Principled Alpha on the dial. That is the whole
difference between 1.17 MB and 2.20 MB a model.

Still rough, and honestly so: **20 and 21 are the weakest reconstructions in the
set.** They are now the right instrument with the right dial, but Tripo made a
poor job of a thin coiled capillary — the coil does not close and the probe
reads as detached. Re-shooting those two would fix it; nothing in software will.

## The product photographs are WebP, 2026-08-31

`public/products` went from **22.8 MB to 1.4 MB** — every referenced PNG and JPEG
re-encoded to WebP at quality 95 (90 for the opaque photographs), alpha intact,
`gaugesaver` also downscaled from its 5472×3648 camera frame to 2000 px.

Measured before committing: worst-case per-channel difference **11/255**, PSNR
**~47 dB** — invisible at any size the site renders. That mattered, because these
are photographs of a real instrument and a subtly wrong one is worse than a flat one.

The originals are **not lost** — they are tracked in v1 at
`../3S_Technology/src/pages/images/`. Re-encode from there, never from the WebP.

Two things this touches, both already handled: `publish_models.py` joins on the
photo filename *without* extension (above), and `src/app/page.tsx` carries three
of these paths besides `products.ts`. Grep both before renaming any image.

## The type floor, 2026-09-01

Onkar: *"the user of website cant see small things."* The hierarchy on a product
page was right — name bold and large, summary regular grey, `SPECIFICATION` small
uppercase and letter-spaced, label smaller grey, value dark and medium — but the
whole site was built on an 11–14px floor that an SME buyer on a phone, or a works
manager at arm's length from a plant-office monitor, cannot actually read.

**195 class occurrences were bumped one tier in a single pass**, so nothing sits
below 12px now and body/spec text lands at 15–16px:

| was | is | what it is |
|---|---|---|
| `text-[10px]` | `text-[12px]` | the smallest mono chips |
| `text-[11px]` | `text-[13px]` | eyebrows, breadcrumb, section labels |
| `text-[12px]` | `text-[14px]` | filter chips, form labels |
| `text-[13px]` | `text-[15px]` | buttons, notes |
| `text-sm` | `text-base` | spec labels and values, card titles, footer |

`.eyebrow` went 0.6875rem → 0.8125rem in `globals.css` to match, and the product
page's spec label is now `text-[15px]` so it stays *smaller* than its value —
the hierarchy is preserved, only the floor moved.

**Size without contrast is theatre.** `--color-ink-faint` was `#9ca1a6`, about
2.5:1 on paper — under the 4.5:1 floor, so half the bump would have been wasted
on text still too pale to read. The token is now `#71767c` (`#6e7883` in
Graphite). But the header strip, every page hero and the footer sit on `bg-ink`,
where faint must go the *other* way — so `globals.css` puts the light value back
inside `.bg-ink, .gridpaper-dark`. **That override is load-bearing: darken the
token without it and the whole footer goes muddy.** No component knows which
ground it is on, which is the point.

Verified after the change: `next build` clean at 40 routes, and `scrollW ===
innerW` at 1440 and 390 on `/`, `/products`, a model product page, a plain
product page, `/selector`, `/compare`, `/contact`, `/about`, `/applications`,
`/enquiry`, `/admin`. Nothing overflowed; the bi-metal model still loads.

## House conventions in this codebase

- Hairline rules (`border-rule`), never drop shadows. Datasheet, not SaaS.
- `.spec` class on every specification value — mono, tabular figures, so columns align.
- `.eyebrow` for section labels; the red tick comes from CSS, not markup.
- `.gridpaper` behind cut-out product photos so they sit on something.
- `.no-print` on anything that must not appear on a printed RFQ.
- `next/image` everywhere — the sources are WebP now, but it still does the sizing.
- Server components by default; `"use client"` only for real interactivity.

## Environment

`.env.local`, never committed (`.gitignore` covers it; `.env.example` documents it).

```
SUPABASE_URL=          # server-only
SUPABASE_KEY=          # server-only
ADMIN_PASSWORD=        # /admin; without it the page says so and stays shut
ADMIN_SESSION_SECRET=  # optional; rotate to kill every admin session at once
SMTP_HOST=             # smtp.gmail.com
SMTP_PORT=             # 465 (implicit TLS) or 587 (STARTTLS)
SMTP_USER=             # the THROWAWAY sender, never the company inbox
SMTP_PASS=             # APP PASSWORD on that throwaway, 16 chars, no spaces
ENQUIRY_TO=            # the real inbox; defaults to SITE.emails[0]
```

Currently holds a throwaway `ADMIN_PASSWORD=letmein-3s-preview`. **Change before deploy.**
