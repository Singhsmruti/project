import type { Metadata } from "next";
import EnquiryList from "@/components/EnquiryList";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Your enquiry list",
  description:
    "The gauges you have selected. Send the whole list to 3S Technology in one message.",
  robots: { index: false },
};

export default function EnquiryPage() {
  return (
    <>
      <section className="gridpaper-dark border-b border-rule-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="eyebrow text-ink-faint">Request for quotation</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Your enquiry list
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <EnquiryList />
        <EnquiryForm />
      </div>
    </>
  );
}
