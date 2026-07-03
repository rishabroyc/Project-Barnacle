import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Heart, MessageCircle, Share2, Plus } from "lucide-react";

type Tag = "All" | "Broblem" | "Win" | "Wisdom" | "Hyped";

const POSTS = [
  {
    tag: "BROBLEM",
    body: "Got ghosted after 3 weeks of solid back and forth. Trying to keep it together but honestly it just stings. Anyone been here?",
    hearts: 248,
    replies: 42,
    time: "2h ago",
    accent: "text-blue-400",
    pill: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    tag: "WIN",
    body: "Went to the gym alone for the first time ever. Awkward as hell, didn't know what I was doing. But I showed up. Day 1.",
    hearts: 1024,
    replies: 88,
    time: "4h ago",
    accent: "text-emerald-400",
    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  {
    tag: "WISDOM",
    body: "Reminder: being tired isn't weakness. Recovery IS the training. You're not falling behind — you're refuelling.",
    hearts: 612,
    replies: 19,
    time: "6h ago",
    accent: "text-violet-400",
    pill: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  },
  {
    tag: "BROBLEM",
    body: "Haven't texted my close friends in like 2 weeks because I 'don't want to be a burden.' The irony is heavy.",
    hearts: 894,
    replies: 107,
    time: "9h ago",
    accent: "text-blue-400",
    pill: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    tag: "WIN",
    body: "Finished therapy after 8 months. Used to be ashamed to even admit I was going. Now I just flex it. Mental health is gains.",
    hearts: 2341,
    replies: 156,
    time: "12h ago",
    accent: "text-emerald-400",
    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  {
    tag: "HYPED",
    body: "After 30 chats with my bro I actually quit my job to start the thing I kept talking about. No joke. The accountability was real.",
    hearts: 3812,
    replies: 241,
    time: "1d ago",
    accent: "text-amber-400",
    pill: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
];

const FILTERS: { label: string; value: Tag }[] = [
  { label: "All", value: "All" },
  { label: "Broblems", value: "Broblem" },
  { label: "Wins", value: "Win" },
  { label: "Wisdom", value: "Wisdom" },
  { label: "Hyped", value: "Hyped" },
];

export function Brommunity() {
  const [active, setActive] = useState<Tag>("All");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = active === "All"
    ? POSTS
    : POSTS.filter((p) => p.tag.toLowerCase().startsWith(active.toLowerCase()));

  const toggleLike = (i: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <PhoneShell>
      <BroHeader title="BROMMUNITY" subtitle="Anonymous · Bros worldwide" />

      <main className="flex-1 px-5 space-y-4 animate-fade-in pb-4">

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                active === value
                  ? "bg-gradient-bro text-white border-transparent shadow-bro"
                  : "bg-card text-bro-slate border-border hover:border-matte-blue/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Post CTA */}
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-2xl border border-dashed border-border hover:border-matte-blue/40 transition-colors">
          <div className="size-8 rounded-full bg-gradient-bro flex items-center justify-center">
            <Plus className="size-4 text-white" />
          </div>
          <span className="text-sm text-bro-slate">Drop something anonymously…</span>
        </button>

        {/* Posts */}
        {filtered.map((p, i) => (
          <article key={i} className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full border ${p.pill}`}>
                {p.tag}
              </span>
              <span className="text-[10px] text-bro-slate">{p.time}</span>
            </div>

            <p className="text-sm leading-relaxed text-bro-ink mb-4">{p.body}</p>

            <div className="flex items-center gap-5">
              <button
                onClick={() => toggleLike(i)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  liked.has(i) ? "text-red-400" : "text-bro-slate hover:text-red-400"
                }`}
              >
                <Heart className={`size-4 ${liked.has(i) ? "fill-red-400" : ""}`} />
                {p.hearts + (liked.has(i) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-bro-slate hover:text-matte-blue transition-colors">
                <MessageCircle className="size-4" />
                {p.replies}
              </button>
              <button className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-bro-slate hover:text-matte-blue transition-colors">
                <Share2 className="size-4" />
              </button>
            </div>
          </article>
        ))}

      </main>
    </PhoneShell>
  );
}
