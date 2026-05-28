import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Flame, Trophy, Users, Shield, Sparkles, MessageCircle, ChevronRight } from "lucide-react";
import { useBroType } from "@/hooks/use-bro-type";
import { BRO_TYPE_INFO } from "@/lib/bro-type";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Bro Profile" },
      { name: "description", content: "Your Bro Type, streaks, and achievements." },
    ],
  }),
  component: Profile,
});

function useProfileStats() {
  const [stats, setStats] = useState({
    chatCount: 0,
    streak: 0,
    joinDays: 0,
    achievements: [] as string[],
  });

  useEffect(() => {
    const chatCount = parseInt(localStorage.getItem("brophet-chat-count") || "0");
    const joinDate = localStorage.getItem("brophet-join-date");
    const activeDays: string[] = JSON.parse(localStorage.getItem("brophet-active-days") || "[]");

    const joinDays = joinDate
      ? Math.max(1, Math.floor((Date.now() - new Date(joinDate).getTime()) / 86400000))
      : 1;

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (activeDays.includes(d.toDateString())) streak++;
      else break;
    }

    // Compute earned achievements
    const earned: string[] = [];
    if (chatCount >= 1) earned.push("first-chat");
    if (chatCount >= 10) earned.push("10-chats");
    if (chatCount >= 50) earned.push("50-chats");
    if (streak >= 3) earned.push("3-streak");
    if (streak >= 7) earned.push("7-streak");
    if (joinDays >= 7) earned.push("week-one");

    setStats({ chatCount, streak, joinDays, achievements: earned });
  }, []);

  return stats;
}

const ACHIEVEMENT_DEFS = [
  { id: "first-chat", emoji: "💬", name: "Bropen Book", desc: "Sent your first message" },
  { id: "10-chats", emoji: "🔟", name: "Ten Deep", desc: "10 messages sent" },
  { id: "50-chats", emoji: "💯", name: "Century Bro", desc: "50 messages sent" },
  { id: "3-streak", emoji: "🔥", name: "On a Roll", desc: "3-day streak" },
  { id: "7-streak", emoji: "⚡", name: "Lock-In Legend", desc: "7-day streak" },
  { id: "week-one", emoji: "🏅", name: "Week One", desc: "7 days since joining" },
];

const NEXT_STEPS = [
  { id: "first-chat", emoji: "💬", name: "Bropen Book", desc: "Send your first message", cta: "/chat" },
  { id: "10-chats", emoji: "🔟", name: "Ten Deep", desc: "Send 10 messages", cta: "/chat" },
  { id: "3-streak", emoji: "🔥", name: "On a Roll", desc: "Chat 3 days in a row", cta: "/chat" },
];

function Profile() {
  const { broType, loaded } = useBroType();
  const { chatCount, streak, joinDays, achievements } = useProfileStats();
  const info = loaded ? BRO_TYPE_INFO[broType] : null;

  const earned = ACHIEVEMENT_DEFS.filter((a) => achievements.includes(a.id));
  const nextUp = NEXT_STEPS.find((a) => !achievements.includes(a.id));

  return (
    <PhoneShell>
      <BroHeader title="YOUR BRO" subtitle={`Day ${joinDays} of the journey`} />

      <main className="flex-1 px-5 space-y-5 animate-fade-in pb-4">

        {/* Bro Type Card */}
        {info && loaded && (
          <section className={`relative rounded-3xl p-6 bg-linear-to-br ${info.gradient} overflow-hidden shadow-bro`}>
            <div className="absolute -right-8 -top-8 size-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Your Bro Type</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{info.emoji}</span>
                <div>
                  <h2 className="text-2xl font-display font-extrabold text-white leading-tight">{broType}</h2>
                  <p className="text-xs text-white/70 font-semibold">{info.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{info.description}</p>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20 hover:bg-white/25 transition-colors"
              >
                <Sparkles className="size-3" /> Retake Bro Survey
              </Link>
            </div>
          </section>
        )}

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-2.5">
          <StatTile
            icon={<MessageCircle className="size-5 text-matte-blue" />}
            value={String(chatCount)}
            label="Chats"
          />
          <StatTile
            icon={<Flame className="size-5 text-orange-400" />}
            value={String(streak)}
            label={streak === 1 ? "Day streak" : "Day streak"}
          />
          <StatTile
            icon={<Trophy className="size-5 text-amber-400" />}
            value={String(earned.length)}
            label="Badges"
          />
        </section>

        {/* Next Achievement */}
        {nextUp && (
          <section className="bg-card rounded-2xl p-4 border border-border border-dashed">
            <p className="text-[10px] font-bold uppercase tracking-widest text-bro-slate mb-2">Next Up</p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-soft-blue flex items-center justify-center text-xl opacity-50">
                {nextUp.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-bro-ink">{nextUp.name}</p>
                <p className="text-xs text-bro-slate">{nextUp.desc}</p>
              </div>
              <Link to={nextUp.cta as "/"} className="text-xs font-bold text-matte-blue px-3 py-1.5 rounded-full bg-matte-blue/10">
                Go →
              </Link>
            </div>
          </section>
        )}

        {/* Earned Achievements */}
        {earned.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-bro-slate mb-3">
              Achievements
            </h3>
            <div className="space-y-2">
              {earned.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border">
                  <div className="size-10 rounded-xl bg-soft-blue flex items-center justify-center text-xl">
                    {a.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-bro-ink">{a.name}</p>
                    <p className="text-xs text-bro-slate">{a.desc}</p>
                  </div>
                  <ChevronRight className="size-4 text-bro-slate/40" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state if no achievements yet */}
        {earned.length === 0 && (
          <section className="bg-card rounded-2xl p-6 border border-border text-center">
            <div className="text-3xl mb-3">🏆</div>
            <p className="font-bold text-bro-ink mb-1">No badges yet</p>
            <p className="text-xs text-bro-slate mb-4">Start chatting to unlock your first achievement.</p>
            <Link to="/chat" className="inline-flex items-center gap-2 bg-gradient-bro text-white text-xs font-bold px-4 py-2 rounded-full">
              Start chatting
            </Link>
          </section>
        )}

        {/* Bring the Squad */}
        <section className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-1">
            <div className="size-9 rounded-xl bg-soft-blue flex items-center justify-center">
              <Users className="size-4 text-matte-blue" />
            </div>
            <div>
              <p className="text-sm font-bold text-bro-ink">Bring Your Bros</p>
              <p className="text-xs text-bro-slate">Refer friends, earn Bro Bono badges</p>
            </div>
          </div>
        </section>

        {/* Safety Net */}
        <section className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="size-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-bro-ink">Safety Net</p>
              <p className="text-xs text-bro-slate leading-relaxed mt-0.5">
                If you're ever in crisis, your bro will point to real human support. Real friends &gt; AI, always.
              </p>
              <p className="text-xs font-bold text-emerald-400 mt-2">988 Suicide & Crisis Lifeline — call or text 988</p>
            </div>
          </div>
        </section>

      </main>
    </PhoneShell>
  );
}

function StatTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center text-center gap-1">
      {icon}
      <p className="text-2xl font-display font-extrabold text-bro-ink leading-none">{value}</p>
      <p className="text-[10px] text-bro-slate uppercase tracking-wider font-bold">{label}</p>
    </div>
  );
}
