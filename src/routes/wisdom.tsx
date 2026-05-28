import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Share2, Heart, Bookmark } from "lucide-react";

export const Route = createFileRoute("/wisdom")({
  head: () => ({
    meta: [
      { title: "Bro Wisdom — The Brophet" },
      { name: "description", content: "AI-generated Bro Wisdom. Built to be screenshotted and shared." },
    ],
  }),
  component: Wisdom,
});

const QUOTES = [
  {
    text: "Touching grass is good. Touching iron is better. Calling your mom is goated.",
    tag: "HEALTH",
    votes: "4.7k",
    color: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
  },
  {
    text: "Your worth isn't your output. Some days, existing is the flex.",
    tag: "MINDSET",
    votes: "3.2k",
    color: "from-violet-500/20 to-purple-500/10",
    accent: "text-violet-400",
  },
  {
    text: "Hydrate before you spiral. 95% of problems look different after water and sleep.",
    tag: "REAL TALK",
    votes: "6.1k",
    color: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
  },
  {
    text: "Comparison is the thief of gains. Run your own race — and actually run.",
    tag: "MOTIVATION",
    votes: "2.9k",
    color: "from-orange-500/20 to-amber-500/10",
    accent: "text-orange-400",
  },
  {
    text: "The hard conversation you've been avoiding is exactly the one you need to have.",
    tag: "REAL TALK",
    votes: "5.4k",
    color: "from-red-500/20 to-rose-500/10",
    accent: "text-red-400",
  },
  {
    text: "Being vulnerable isn't weakness. It's just telling the truth at full volume.",
    tag: "MINDSET",
    votes: "8.2k",
    color: "from-violet-500/20 to-indigo-500/10",
    accent: "text-violet-400",
  },
  {
    text: "You can't pour from an empty cup. Fill yours first — then show up for everyone else.",
    tag: "HEALTH",
    votes: "3.8k",
    color: "from-emerald-500/20 to-green-500/10",
    accent: "text-emerald-400",
  },
  {
    text: "Accountability without cruelty. Discipline without shame. That's the move.",
    tag: "MOTIVATION",
    votes: "7.1k",
    color: "from-amber-500/20 to-yellow-500/10",
    accent: "text-amber-400",
  },
];

function Wisdom() {
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleSave = (i: number) =>
    setSaved((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const toggleLike = (i: number) =>
    setLiked((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <PhoneShell>
      <BroHeader title="BRO WISDOM" subtitle="Bro Bono · Free for the people" />

      <main className="flex-1 px-5 space-y-4 animate-fade-in pb-4">
        {QUOTES.map((q, i) => (
          <article
            key={i}
            className={`relative rounded-2xl p-6 bg-linear-to-br ${q.color} border border-border animate-slide-up`}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-card border border-border ${q.accent}`}>
                {q.tag}
              </span>
              <span className="text-[10px] font-mono text-bro-slate/50">BRO-{7700 + i}</span>
            </div>

            <blockquote className="text-xl font-display font-bold text-bro-ink leading-snug mb-6">
              "{q.text}"
            </blockquote>

            <div className="flex items-center justify-between border-t border-border/50 pt-4">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gradient-bro" />
                <span className="text-xs font-bold italic text-bro-slate">@thebrophet</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike(i)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    liked.has(i) ? "text-red-400" : "text-bro-slate hover:text-red-400"
                  }`}
                >
                  <Heart className={`size-4 ${liked.has(i) ? "fill-red-400" : ""}`} />
                  {q.votes}
                </button>
                <button
                  onClick={() => toggleSave(i)}
                  aria-label="Save"
                  className={`size-8 rounded-full flex items-center justify-center border transition-all ${
                    saved.has(i)
                      ? "bg-matte-blue/15 border-matte-blue/40 text-matte-blue"
                      : "bg-card border-border text-bro-slate hover:border-matte-blue/30"
                  }`}
                >
                  <Bookmark className={`size-3.5 ${saved.has(i) ? "fill-matte-blue" : ""}`} />
                </button>
                <button className="bg-soft-blue border border-border text-bro-ink px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:border-matte-blue/30 transition-colors">
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
