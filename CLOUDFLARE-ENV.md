# Setting the environment variables on the Cloudflare worker

Until these are set, the deployed enquiry form shows *"Could not submit the
form"* and hands the buyer WhatsApp and email instead. That is the form working
as designed — both delivery routes report unconfigured, so it refuses to claim a
send. It is not a bug, and setting these is the whole fix.

The worker is **`3stechnology-v2`**. The live v1 worker is `3stechnology` — do
not put these on that one by mistake.

---

## The values, and where they come from

Copy them out of `3S_Technology_v2/.env.local` on Onkar's machine. That file is
gitignored and is the only place they exist.

| name | type | value |
|---|---|---|
| `SMTP_HOST` | Text | `smtp.gmail.com` |
| `SMTP_PORT` | Text | `465` |
| `SMTP_USER` | **Secret** | the throwaway sender Gmail — **never** the company inbox |
| `SMTP_PASS` | **Secret** | the 16-character Gmail **app password**, no spaces |
| `ENQUIRY_TO` | Text | `3stechnology2024@gmail.com` — where enquiries land |
| `ADMIN_PASSWORD` | **Secret** | the `/admin` password. **Change it** — `.env.local` holds a preview throwaway |
| `ADMIN_SESSION_SECRET` | **Secret** | optional; any long random string. Rotating it logs every admin session out at once |
| `SUPABASE_URL` | Text | only once the real project URL is known |
| `SUPABASE_KEY` | **Secret** | the anon key. **Still missing** — this is the one thing blocking `/admin` |

**Secret, not Text, for anything in that column.** A Text var is readable by
anyone who can open the dashboard; a Secret is write-only after saving. The
Gmail app password grants mailbox access — it is a real credential.

**Email alone is enough to make the form work.** `SMTP_*` + `ENQUIRY_TO` gets
every enquiry into the inbox. Supabase only adds the durable record behind
`/admin`, and can be filled in later without touching the rest.

---

## Steps — the dashboard

1. **dash.cloudflare.com** → your account → **Compute (Workers)** → **Workers & Pages**.
2. Open **`3stechnology-v2`**. Check the name at the top before typing anything —
   `3stechnology` is the live site.
3. **Settings** tab → **Variables and Secrets**.
4. **+ Add** for each row in the table above:
   - **Type** — *Secret* or *Text*, per the table.
   - **Variable name** — exactly as written. Case matters. No `NEXT_PUBLIC_`
     prefix on any of them; these are server-only and the browser must never
     see them.
   - **Value** — paste. No surrounding quotes, no trailing space. A Gmail app
     password is shown as `abcd efgh ijkl mnop`; **type it without the spaces**.
5. **Deploy** / **Save and deploy**. Variables only reach the running worker on a
   new deployment — saving alone changes nothing about what is serving.

## Steps — the CLI, if you prefer

From `3S_Technology_v2`, after `npx wrangler login`:

```bash
npx wrangler secret put SMTP_USER            # prompts, paste, Enter
npx wrangler secret put SMTP_PASS
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put SUPABASE_KEY
```

The non-secret ones can live in `wrangler.jsonc` under `"vars"` and be committed:

```jsonc
"vars": {
  "SMTP_HOST": "smtp.gmail.com",
  "SMTP_PORT": "465",
  "ENQUIRY_TO": "3stechnology2024@gmail.com"
}
```

**Never put `SMTP_PASS`, `ADMIN_PASSWORD` or `SUPABASE_KEY` in that file.** It is
committed to a repo that Smruti and anyone with access can read.

---

## Check it worked — without sending anything

Open on the deployed site:

```
https://<the worker URL>/api/enquiry
```

It reports the channels and sends nothing:

```json
{"email":"configured","database":"not-configured"}
```

- `email: configured` → the form will now deliver. This is the one that matters.
- `database: not-configured` → expected until the Supabase anon key exists.
- **both `not-configured`** → the variables did not reach the running worker.
  Nine times out of ten that is a missing redeploy, or a name typo.

Then send one real test enquiry through the form. Use a reserved address —
`buyer@example.com` — never a realistic-looking company domain: `replyTo`
carries whatever you type, and one Reply would send a quotation to a stranger
who never enquired.

**The first mail from a new Gmail sender usually lands in spam.** Open it once
and mark *Not spam*, or the leads pile up in a folder nobody opens.

---

## Two things to do before the domain moves to this worker

1. **Change `ADMIN_PASSWORD`.** `.env.local` carries `letmein-3s-preview`.
2. **Delete `ThemeSwitch`** — the component and its import in `layout.tsx`. It is
   a preview control; the themes work without it.
