import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Flame, Share2, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Brophet — A Bro In Your Pocket" },
      { name: "description", content: "Your funniest, most loyal AI bro. Vent, get hyped, lock in. No clinical vibes, just brofessional advice." },
      { property: "og:title", content: "The Brophet — A Bro In Your Pocket" },
      { property: "og:description", content: "Your funniest, most loyal AI bro. Vent, get hyped, lock in." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PhoneShell>
      <BroHeader title="BROPHET" subtitle="Locked In • Day 12" />

      <main className="flex-1 px-6 space-y-7 animate-fade-in">
        {/* Hero Mood Card */}
        <section className="relative bg-gradient-bro rounded-3xl p-6 text-primary-foreground overflow-hidden shadow-bro">
          <div className="relative z-10">
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md uppercase tracking-widest">
              Daily Vibe Check
            </span>
            <h2 className="text-2xl font-display font-bold mt-4 leading-tight">
              Yo bro, you keeping your head up?
            </h2>
            <p className="text-white/80 text-sm mt-2 font-medium">
              Tap in with your Brophet — today's brofessional advice is loaded.
            </p>
            <Link
              to="/chat"
              className="mt-5 inline-flex items-center gap-2 bg-card text-matte-blue font-bold py-3 px-5 rounded-2xl text-sm transition-transform active:scale-95 hover:scale-[1.02]"
            >
              Dap Up Bro <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="absolute -right-12 -bottom-12 size-48 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -left-8 -top-10 size-32 bg-white/10 rounded-full blur-2xl" />
        </section>

        {/* Bro Type Selector */}
        <section>
          <h3 className="text-xs font-bold text-bro-slate/50 uppercase tracking-widest mb-3">
            Choose Your Wingman
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <WingmanCard name="The Chill Ox" tag="High EQ, low stress" emoji="🧢" selected />
            <WingmanCard name="Coach Prime" tag="Motivation & grit" emoji="🔥" />
            <WingmanCard name="The Realist" tag="Loving roasts" emoji="👀" />
            <WingmanCard name="The Sage" tag="Quiet wisdom" emoji="🧠" />
          </div>
        </section>

        {/* Bro Wisdom */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-bro-slate/50 uppercase tracking-widest">
              Today's Bro Wisdom
            </h3>
            <Link to="/wisdom" className="text-[11px] font-bold text-matte-blue uppercase tracking-wider flex items-center gap-1">
              View Feed <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="p-5 bg-soft-blue/40 rounded-2xl border border-border">
            <Sparkles className="size-4 text-matte-blue mb-2" />
            <p className="text-sm italic text-bro-ink/85 leading-relaxed">
              "Bro, taking a nap isn't weakness — it's an overnight patch for your brain. Lock in or tuck in."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-8 rounded-full bg-gradient-bro" />
              <div className="flex-1">
                <p className="text-xs font-bold">The Brophet</p>
                <p className="text-[10px] text-bro-slate/60">Shared by 1.2k bros today</p>
              </div>
              <button aria-label="Share" className="size-8 rounded-full bg-card flex items-center justify-center border border-border shadow-sm hover:scale-105 transition-transform">
                <Share2 className="size-3.5 text-matte-blue" />
              </button>
            </div>
          </div>
        </section>

        {/* Mental Strength */}
        <section className="bg-card rounded-3xl p-6 border-2 border-soft-blue/70">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-bold text-bro-slate/50 uppercase tracking-widest">
                Mental Strength
              </p>
              <p className="text-4xl font-display font-extrabold text-matte-blue mt-1">88%</p>
            </div>
            <div className="flex items-end gap-1">
              {[6, 8, 5, 10, 7, 9, 4].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full ${i < 5 ? "bg-matte-blue" : "bg-soft-blue"}`}
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-soft-blue h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-bro h-full" style={{ width: "88%" }} />
          </div>
          <p className="text-[10px] mt-4 text-bro-slate/60 text-center uppercase font-bold tracking-widest">
            3 more chats to hit your weekly goal
          </p>
        </section>

        {/* Streak strip */}
        <section className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border">
          <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Flame className="size-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">12-day lock-in streak</p>
            <p className="text-xs text-bro-slate/60">Don't break the chain, bro.</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`size-2 rounded-full ${i < 5 ? "bg-matte-blue" : "bg-soft-blue"}`} />
            ))}
          </div>
        </section>

        {/* Bring the Squad */}
        <section>
          <div className="bg-bro-ink rounded-3xl p-6 text-white">
            <h4 className="text-lg font-display font-bold mb-1">Bring the Squad</h4>
            <p className="text-xs text-white/60 mb-5">
              Don't let the bros suffer in silence. Share the vibe, earn 'Bro Bono' badges.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/10 p-3 rounded-2xl flex items-center gap-2 hover:bg-white/15 transition-colors">
                <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Share2 className="size-4" />
                </div>
                <span className="text-xs font-bold">Refer a Bro</span>
              </button>
              <Link to="/wisdom" className="bg-white/10 p-3 rounded-2xl flex items-center gap-2 hover:bg-white/15 transition-colors">
                <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="size-4" />
                </div>
                <span className="text-xs font-bold">Post Wisdom</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PhoneShell>
  );
}

function WingmanCard({ name, tag, emoji, selected }: { name: string; tag: string; emoji: string; selected?: boolean }) {
  return (
    <button
      className={`p-4 rounded-2xl bg-card flex flex-col items-center text-center transition-all hover:scale-[1.02] ${
        selected ? "border-2 border-matte-blue shadow-bro" : "border-2 border-border opacity-80"
      }`}
    >
      <div className="size-14 rounded-full bg-soft-blue grid place-items-center mb-2 text-2xl">{emoji}</div>
      <span className="font-bold text-sm">{name}</span>
      <span className="text-[10px] text-bro-slate/60 mt-0.5">{tag}</span>
    </button>
  );
}
