import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BroHeader } from "@/components/BroHeader";
import { Flame, Share2, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useBroType } from "@/hooks/use-bro-type";
import { useMainClass } from "@/lib/viewport";
import { BRO_TYPE_INFO } from "@/lib/bro-type";
import type { BroType } from "@/lib/ai";

const WISDOM = [
  "Touching grass is good. Touching iron is better. Calling your mom is goated.",
  "Your worth isn't your output. Some days, existing is the flex.",
  "Hydrate before you spiral. 95% of problems look different after water and sleep.",
  "Comparison is the thief of gains. Run your own race — and actually run.",
  "The hard conversation you've been avoiding is exactly the one you need to have.",
];

function useStats() {
  const [stats, setStats] = useState({ chatCount: 0, streak: 0, weekDots: Array(7).fill(false) });

  useEffect(() => {
    const chatCount = parseInt(localStorage.getItem("brophet-chat-count") || "0");
    const activeDays: string[] = JSON.parse(localStorage.getItem("brophet-active-days") || "[]");

    // Streak: consecutive days ending today
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (activeDays.includes(d.toDateString())) streak++;
      else break;
    }

    // This week Mon–Sun
    const startOfWeek = new Date(today);
    const dow = today.getDay();
    startOfWeek.setDate(today.getDate() - ((dow + 6) % 7)); // Monday
    const weekDots = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return activeDays.includes(d.toDateString());
    });

    setStats({ chatCount, streak, weekDots });
  }, []);

  return stats;
}

const WINGMEN: { name: BroType; tag: string; emoji: string }[] = [
  { name: "The Chill Ox", tag: "High EQ, low stress", emoji: "🧢" },
  { name: "Coach Prime", tag: "Motivation & grit", emoji: "🔥" },
  { name: "The Realist", tag: "Loving roasts", emoji: "👀" },
  { name: "The Sage", tag: "Quiet wisdom", emoji: "🧠" },
];

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function Home() {
  const navigate = useNavigate();
  const { broType, setBroType, loaded } = useBroType();
  const { chatCount, streak, weekDots } = useStats();
  const mainClass = useMainClass();
  const [wisdomIdx] = useState(() => Math.floor(Math.random() * WISDOM.length));

  // Redirect to onboarding if no bro type set
  useEffect(() => {
    if (loaded && !localStorage.getItem("brophet-bro-type")) {
      navigate("/onboarding");
    }
  }, [loaded, navigate]);

  const info = loaded ? BRO_TYPE_INFO[broType] : null;

  return (
    <PhoneShell>
      <BroHeader title="BROPHET" subtitle={streak > 0 ? `${streak}-day streak 🔥` : "Day 1 — lock in"} />

      <main className={mainClass}>

        {/* Hero CTA */}
        <section className="relative bg-gradient-bro rounded-3xl p-6 overflow-hidden shadow-bro glow-bro">
          <div className="relative z-10">
            <span className="text-[10px] font-bold bg-white/15 px-2.5 py-1 rounded-full uppercase tracking-widest text-white/80">
              Daily Check-In
            </span>
            <h2 className="text-[1.6rem] font-display font-extrabold text-white mt-3 leading-tight">
              {info ? `Yo, your ${broType} is ready.` : "Yo bro, you keeping your head up?"}
            </h2>
            <p className="text-white/70 text-sm mt-1.5 leading-relaxed">
              {chatCount > 0
                ? `${chatCount} chats deep. Your bro's got you.`
                : "Tap in — brofessional advice is loaded."}
            </p>
            <Link
              to="/chat"
              className="mt-5 inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white font-bold py-2.5 px-5 rounded-xl text-sm border border-white/20 active:scale-95 transition-transform"
            >
              <MessageCircle className="size-4" /> Dap Up Your Bro
            </Link>
          </div>
          <div className="absolute -right-10 -bottom-10 size-44 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-6 -top-8 size-28 bg-white/8 rounded-full blur-2xl pointer-events-none" />
        </section>

        {/* Weekly Activity */}
        {(chatCount > 0 || streak > 0) && (
          <section className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-bro-slate">This Week</p>
              <p className="text-xs font-bold text-matte-blue">{chatCount} total chats</p>
            </div>
            <div className="flex justify-between">
              {weekDots.map((active, i) => {
                const todayIdx = (new Date().getDay() + 6) % 7;
                return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      active
                        ? "bg-gradient-bro text-white shadow-bro"
                        : i === todayIdx
                          ? "border-2 border-matte-blue/40 text-matte-blue"
                          : "bg-soft-blue text-bro-slate"
                    }`}
                  >
                    {active ? "✓" : ""}
                  </div>
                  <span className="text-[9px] font-bold text-bro-slate uppercase">{DAY_LABELS[i]}</span>
                </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Active Bro Type */}
        {info && loaded && (
          <section className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4">
            <div className={`size-14 rounded-2xl bg-linear-to-br ${info.gradient} flex items-center justify-center text-2xl shadow-bro shrink-0`}>
              {info.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-bro-slate mb-0.5">Active Wingman</p>
              <p className="font-bold text-bro-ink">{broType}</p>
              <p className="text-xs text-bro-slate truncate">{info.tagline}</p>
            </div>
            <ArrowRight className="size-4 text-bro-slate flex-shrink-0" />
          </section>
        )}

        {/* Choose Wingman */}
        <section>
          <h3 className="text-[10px] font-bold text-bro-slate uppercase tracking-widest mb-3">
            Switch your Bro
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {WINGMEN.map((w) => (
              <WingmanCard
                key={w.name}
                name={w.name}
                tag={w.tag}
                emoji={w.emoji}
                selected={loaded && broType === w.name}
                onSelect={() => setBroType(w.name)}
              />
            ))}
          </div>
        </section>

        {/* Today's Wisdom */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-bro-slate uppercase tracking-widest">
              Today's Browledge
            </h3>
            <Link to="/wisdom" className="text-[11px] font-bold text-matte-blue flex items-center gap-1">
              More <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="p-5 bg-card rounded-2xl border border-border">
            <Sparkles className="size-4 text-matte-blue mb-3" />
            <p className="text-sm text-bro-ink/90 italic leading-relaxed">
              "{WISDOM[wisdomIdx]}"
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-bro" />
                <p className="text-xs font-bold text-bro-ink">The Brophet</p>
              </div>
              <button aria-label="Share" className="size-8 rounded-full bg-soft-blue flex items-center justify-center border border-border">
                <Share2 className="size-3.5 text-matte-blue" />
              </button>
            </div>
          </div>
        </section>

        {/* Streak or first-time prompt */}
        {streak > 0 ? (
          <section className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border">
            <div className="size-11 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <Flame className="size-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-bro-ink">{streak}-day lock-in streak</p>
              <p className="text-xs text-bro-slate">Don't break the chain, bro.</p>
            </div>
            <div className="flex gap-1">
              {weekDots.slice(0, 7).map((active, i) => (
                <div key={i} className={`size-2 rounded-full ${active ? "bg-orange-400" : "bg-soft-blue"}`} />
              ))}
            </div>
          </section>
        ) : (
          <section className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border border-dashed">
            <div className="size-11 rounded-xl bg-matte-blue/10 flex items-center justify-center">
              <Flame className="size-6 text-matte-blue/60" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-bro-ink">Start your streak today</p>
              <p className="text-xs text-bro-slate">Chat once a day, watch the chain grow.</p>
            </div>
            <Link to="/chat" className="text-xs font-bold text-matte-blue px-3 py-1.5 rounded-full bg-matte-blue/10">
              Start →
            </Link>
          </section>
        )}

        {/* Bring the Squad */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display font-bold text-bro-ink mb-1">Bring the Squad</h4>
          <p className="text-xs text-bro-slate mb-4 leading-relaxed">
            Don't let your bros suffer in silence. Refer them, earn Bro Bono badges.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-soft-blue border border-border rounded-xl p-3 flex items-center gap-2 hover:border-matte-blue/30 transition-colors">
              <Share2 className="size-4 text-matte-blue" />
              <span className="text-xs font-bold text-bro-ink">Refer a Bro</span>
            </button>
            <Link to="/wisdom" className="flex-1 bg-soft-blue border border-border rounded-xl p-3 flex items-center gap-2 hover:border-matte-blue/30 transition-colors">
              <Sparkles className="size-4 text-matte-blue" />
              <span className="text-xs font-bold text-bro-ink">Post Wisdom</span>
            </Link>
          </div>
        </section>

      </main>
    </PhoneShell>
  );
}

function WingmanCard({
  name, tag, emoji, selected, onSelect,
}: {
  name: BroType; tag: string; emoji: string; selected?: boolean; onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all active:scale-95 ${
        selected
          ? "border-2 border-matte-blue bg-matte-blue/8 shadow-bro"
          : "border border-border bg-card hover:border-matte-blue/30"
      }`}
    >
      <div className="size-12 rounded-full bg-soft-blue grid place-items-center mb-2 text-xl">{emoji}</div>
      <span className="font-bold text-sm text-bro-ink">{name}</span>
      <span className="text-[10px] text-bro-slate mt-0.5">{tag}</span>
    </button>
  );
}
