import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Flame, Trophy, Users, Shield, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Bro Profile" },
      { name: "description", content: "Your Bro Type, streaks, achievements, and squad." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <PhoneShell>
      <BroHeader title="YOUR BRO" subtitle="Member since Day 1" />

      <main className="flex-1 px-6 space-y-6 animate-fade-in">
        {/* Bro Type card */}
        <section className="bg-gradient-bro rounded-3xl p-6 text-white shadow-bro relative overflow-hidden">
          <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-2xl" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Your Bro Type</p>
          <h2 className="text-3xl font-display font-extrabold mt-1">The Insightful Stoic</h2>
          <p className="text-sm text-white/85 mt-2 leading-relaxed">
            Calm, grounded, and quietly hilarious. Calls you out on your BS but always celebrates your wins.
          </p>
          <Link
            to="/onboarding"
            className="mt-5 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-xs font-bold hover:bg-white/25 transition-colors"
          >
            <Sparkles className="size-3.5" /> Retake the Bro Survey
          </Link>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-3">
          <StatTile icon={<Flame className="size-5 text-orange-500" />} value="12" label="Day streak" />
          <StatTile icon={<Trophy className="size-5 text-amber-500" />} value="7" label="Achievements" />
          <StatTile icon={<Users className="size-5 text-matte-blue" />} value="4" label="Bros brought" />
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-xs font-bold text-bro-slate/50 uppercase tracking-widest mb-3">
            Recent Achievements
          </h3>
          <div className="space-y-2">
            {[
              { name: "Bropen Book", desc: "Shared your first feeling" },
              { name: "Lock-In Legend", desc: "10-day streak unlocked" },
              { name: "Bro Bono", desc: "Posted wisdom 3 times" },
            ].map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border">
                <div className="size-10 rounded-xl bg-soft-blue flex items-center justify-center">
                  <Trophy className="size-5 text-matte-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{a.name}</p>
                  <p className="text-xs text-bro-slate/60">{a.desc}</p>
                </div>
                <ChevronRight className="size-4 text-bro-slate/40" />
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="bg-card rounded-2xl p-5 border border-border flex items-start gap-3">
          <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Shield className="size-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Safety Net</p>
            <p className="text-xs text-bro-slate/60 leading-relaxed mt-0.5">
              If you're in crisis, your bro will gently point to real human support. Real friends &gt; AI, always.
            </p>
            <button className="text-[11px] font-bold text-matte-blue mt-2 uppercase tracking-wider">
              Hotline resources →
            </button>
          </div>
        </section>
      </main>
    </PhoneShell>
  );
}

function StatTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center text-center">
      <div className="mb-1">{icon}</div>
      <p className="text-2xl font-display font-extrabold text-bro-ink">{value}</p>
      <p className="text-[10px] text-bro-slate/60 uppercase tracking-wider font-bold">{label}</p>
    </div>
  );
}
