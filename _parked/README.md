# Parked for a future update — the 3D models

Onkar, **2026-09-01**: *"place all 3d model for future update and ship only image
one."* The first shipped version of v2 shows the **photograph** on every product
page. The seventeen models are finished, confirmed and kept here — they are not
deleted, not regressed, and not re-done when they go live.

```
_parked/models/*.glb    17 files, 19 MB   (was public/models/)
```

`_parked/` is outside `public/`, so nothing here is served or deployed. The
viewer code, the generated index and the pipeline all stay in the repo exactly
as they were.

## Turning them back on

Two moves, in this order:

```bash
mv _parked/models public/models                       # back into the served tree
# src/data/flags.ts → SHIP_3D_MODELS = true
npm run build
```

`src/data/models.ts` still lists all seventeen and needs no change — it is
generated, and `SHIP_3D_MODELS` is read at the call site in
`app/products/[slug]/page.tsx`, never inside the generated file.

**If you re-run the pipeline while they are parked**, `tools/publish_models.py`
writes to `3S_Technology_v2/public/models/` and will recreate that folder. That
is not a bug — but move it back into `_parked/` afterwards, or the build ships
19 MB nobody downloads.

## What is still true of these models

- All 21 in `../../3d-source/products-edited/` are confirmed by Onkar's own hand.
- Every dial face is cut from the real photograph; nothing is drawn.
- **20 and 21 are the weakest** — the right instrument with the right dial, but
  Tripo made a poor job of the thin coiled capillary. Re-shooting fixes it;
  software will not.
- Four confirmed models still have no page (01, 03, 04, 17 Vacuum Gauge).

The full account is in `../CLAUDE.md` under "The 3D models" and "What went wrong
on 08-30".
