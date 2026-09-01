"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        router.refresh();
        return;
      }
      const json = (await res.json()) as { reason?: string };
      setError(
        json.reason === "not-configured"
          ? "No ADMIN_PASSWORD is set on the server."
          : "That password is not right.",
      );
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-24">
      <p className="eyebrow">Back office</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">Enquiry inbox</h1>

      {!configured ? (
        <div className="mt-8 border border-signal/40 bg-signal/5 p-5">
          <p className="spec text-[13px] tracking-[0.14em] text-signal uppercase">
            Not configured
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink-3">
            Set <code className="spec">ADMIN_PASSWORD</code> in the environment to
            open this page, and <code className="spec">SUPABASE_URL</code> plus{" "}
            <code className="spec">SUPABASE_KEY</code> for it to have anything to
            show.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 border border-rule bg-white p-6">
          <label
            htmlFor="password"
            className="spec block text-[13px] tracking-[0.12em] text-ink-soft uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-rule px-4 py-3 text-base focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !password}
            className="spec mt-5 w-full bg-ink px-6 py-3.5 text-[15px] tracking-[0.1em] text-paper uppercase disabled:bg-ink-faint"
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
          {error && (
            <p className="spec mt-4 text-[14px] text-signal">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
