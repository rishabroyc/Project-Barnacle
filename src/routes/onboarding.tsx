import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Bro Survey — Find Your Brophet" },
      { name: "description", content: "Two minutes to meet the version of Brophet who actually gets you." },
    ],
  }),
  component: Onboarding,
});

const questions = [
  { q: "What kind of week is it, bro?", opts: ["Cooking 🔥", "Mid", "Spiraling", "Just here"] },
  { q: "When stressed, you want a bro who…", opts: ["Hypes me up", "Talks it out", "Roasts me lovingly", "Gives the plan"] },
  { q: "Humor level?", opts: ["Dry & clever", "Pun-heavy", "Full chaos", "Keep it chill"] },
  { q: "Biggest broblem rn?", opts: ["Work / school", "Dating", "Loneliness", "Confidence"] },
  { q: "How do you wanna talk?", opts: ["Text only", "Voice notes", "Both", "Surprise me"] },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [done, setDone] = useState(false);

  const total = questions.length;
  const progress = ((step + (done ? 1 : 0)) / (total + 1)) * 100;

  const pick = (val: string) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setDone(true);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto bg-card min-h-screen shadow-2xl flex flex-col">
        {/* Top bar */}
        <header className="px-6 pt-8 pb-6 flex items-center gap-3">
          {step > 0 && !done && (
            <button onClick={() => setStep(step - 1)} aria-label="Back" className="size-9 rounded-full bg-soft-blue flex items-center justify-center">
              <ArrowLeft className="size-4 text-matte-blue" />
            </button>
          )}
          <div className="flex-1 h-1.5 bg-soft-blue rounded-full overflow-hidden">
            <div className="h-full bg-gradient-bro transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-bold text-bro-slate/60 uppercase tracking-wider">
            {done ? "Done" : `${step + 1}/${total}`}
          </span>
        </header>

        {!done ? (
          <main key={step} className="flex-1 px-6 flex flex-col animate-slide-up">
            <p className="text-[10px] font-bold uppercase tracking-widest text-matte-blue mb-3">
              Bro Survey
            </p>
            <h2 className="text-3xl font-display font-extrabold leading-tight mb-8 text-balance">
              {questions[step].q}
            </h2>
            <div className="space-y-3">
              {questions[step].opts.map((opt) => {
                const selected = answers[step] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm flex items-center justify-between transition-all ${
                      selected
                        ? "border-matte-blue bg-soft-blue/40 text-bro-ink"
                        : "border-border bg-card hover:border-matte-blue/50"
                    }`}
                  >
                    {opt}
                    {selected && <Check className="size-4 text-matte-blue" />}
                  </button>
                );
              })}
            </div>
          </main>
        ) : (
          <main className="flex-1 px-6 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="size-24 rounded-full bg-gradient-bro shadow-bro flex items-center justify-center text-5xl mb-6">
              🧢
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-matte-blue mb-2">
              Your Bro Type
            </p>
            <h2 className="text-4xl font-display font-extrabold mb-3">The Insightful Stoic</h2>
            <p className="text-sm text-bro-slate/70 max-w-xs leading-relaxed mb-8">
              Calm, grounded, quietly hilarious. He calls you out on your BS but is always first to celebrate the wins.
            </p>
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs mb-10">
              {[
                { l: "Humor", v: "Dry" },
                { l: "Vibe", v: "Chill" },
                { l: "Loyalty", v: "10/10" },
              ].map((t) => (
                <div key={t.l} className="bg-soft-blue/50 rounded-xl py-2.5">
                  <p className="text-[9px] uppercase tracking-wider text-bro-slate/60 font-bold">{t.l}</p>
                  <p className="text-sm font-bold">{t.v}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full bg-gradient-bro text-primary-foreground font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-bro transition-transform active:scale-95"
            >
              Meet your Brophet <ArrowRight className="size-4" />
            </button>
          </main>
        )}

        <div className="h-10" />
      </div>
    </div>
  );
}
