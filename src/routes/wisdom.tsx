import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Share2, Download } from "lucide-react";

export const Route = createFileRoute("/wisdom")({
  head: () => ({
    meta: [
      { title: "Bro Wisdom — Shareable Quotes" },
      { name: "description", content: "AI-generated Bro Wisdom. Built to be screenshotted." },
    ],
  }),
  component: Wisdom,
});

const quotes = [
  "Touching grass is good. Touching iron is better. Call your mom too.",
  "Bro, your worth isn't tied to your output. Existing is the flex.",
  "Comparison is the thief of gains. Run your own race, bro.",
  "Hydrate before you spiral.",
];

function Wisdom() {
  return (
    <PhoneShell>
      <BroHeader title="BRO WISDOM" subtitle="Bro Bono • Free for the boys" />

      <main className="flex-1 px-6 space-y-5 animate-fade-in">
        {quotes.map((q, i) => (
          <article
            key={i}
            className="relative bg-card rounded-3xl p-7 border border-border shadow-bro animate-slide-up"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="size-10 rounded-xl bg-gradient-bro" />
              <span className="text-[10px] font-mono text-bro-slate/40">BRO-{7700 + i}</span>
            </div>
            <blockquote className="text-2xl font-display font-bold tracking-tight leading-snug mb-6">
              "{q}"
            </blockquote>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-bold italic text-bro-slate/70">@thebrophet</span>
              <div className="flex gap-2">
                <button aria-label="Save" className="size-9 rounded-full bg-soft-blue/60 flex items-center justify-center hover:scale-105 transition-transform">
                  <Download className="size-4 text-matte-blue" />
                </button>
                <button className="bg-bro-ink text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 hover:scale-[1.02] transition-transform">
                  <Share2 className="size-3.5" /> Share
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>
    </PhoneShell>
  );
}
