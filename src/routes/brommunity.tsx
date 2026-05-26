import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export const Route = createFileRoute("/brommunity")({
  head: () => ({
    meta: [
      { title: "Brommunity — The Brophet" },
      { name: "description", content: "Anonymous feed. Vent, share wins, realize you're not the only one going through it." },
    ],
  }),
  component: Brommunity,
});

const posts = [
  { tag: "BROBLEM", body: "Got ghosted after 3 weeks of texting. Trying not to spiral.", hearts: 248, replies: 42, hue: "from-blue-50" },
  { tag: "WIN", body: "Hit the gym 5 days in a row. First time in my life. Locked in.", hearts: 1024, replies: 88, hue: "from-emerald-50" },
  { tag: "BRO BONO", body: "Reminder: your worth isn't your output. Sometimes existing is the flex.", hearts: 612, replies: 19, hue: "from-amber-50" },
  { tag: "BROBLEM", body: "Haven't talked to a friend in 11 days. The silence is loud.", hearts: 489, replies: 64, hue: "from-rose-50" },
];

function Brommunity() {
  return (
    <PhoneShell>
      <BroHeader title="BROMMUNITY" subtitle="Anonymous • 12k bros online" />

      <main className="flex-1 px-6 space-y-4 animate-fade-in">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {["All", "Broblems", "Wins", "Bro Wisdom", "Hyped"].map((t, i) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                i === 0 ? "bg-gradient-bro text-primary-foreground shadow-bro" : "bg-soft-blue/60 text-bro-slate"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {posts.map((p, i) => (
          <article
            key={i}
            className={`relative rounded-3xl p-5 bg-gradient-to-br ${p.hue} to-card border border-border animate-slide-up`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold tracking-widest text-matte-blue bg-card px-2 py-1 rounded-md border border-border">
                {p.tag}
              </span>
              <span className="text-[10px] text-bro-slate/50 uppercase tracking-wider">anon bro</span>
            </div>
            <p className="text-sm leading-relaxed text-bro-ink">{p.body}</p>
            <div className="mt-4 flex items-center gap-5 text-bro-slate/70">
              <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-matte-blue transition-colors">
                <Heart className="size-4" /> {p.hearts}
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-matte-blue transition-colors">
                <MessageCircle className="size-4" /> {p.replies}
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold ml-auto hover:text-matte-blue transition-colors">
                <Share2 className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </main>
    </PhoneShell>
  );
}
