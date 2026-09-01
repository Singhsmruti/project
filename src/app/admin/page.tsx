import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminInbox from "@/components/AdminInbox";
import {
  ADMIN_COOKIE,
  fetchEnquiries,
  isConfigured,
  verifyToken,
} from "@/lib/admin";

export const metadata: Metadata = {
  title: "Enquiry inbox",
  robots: { index: false, follow: false },
};

// Reads a cookie and live data — must never be cached or prerendered.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const jar = await cookies();
  const authed = verifyToken(jar.get(ADMIN_COOKIE)?.value);

  if (!authed) return <AdminLogin configured={isConfigured()} />;

  const result = await fetchEnquiries();
  return <AdminInbox result={result} />;
}
