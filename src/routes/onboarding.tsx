import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QUESTIONS, computeBroType, BRO_TYPE_INFO } from "@/lib/bro-type";
import type { BroType } from "@/lib/ai";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Bro Survey — Find Your Brophet" },
      { name: "description", content: "Two minutes to find the version of Brophet who actually gets you." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const [result, setResult] = useState<BroType | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const progress = ((step) / total) * 100;

  const pick = (idx: number) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);

    setTimeout(() => {
      if (step < total - 1) {
        setStep((s) => s + 1);
        setAnimKey((k) => k + 1);
      } else {
        const broType = computeBroType(next.filter((a) => a !== null) as number[]);
        setResult(broType);
        // Persist
        localStorage.setItem("brophet-bro-type", broType);
        localStorage.setItem("brophet-join-date", new Date().toISOString());
        localStorage.setItem("brophet-survey-answers", JSON.stringify(next));
      }
    }, 160);
  };

  const goBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setAnimKey((k) => k + 1);
    }
  };

  if (result) {
    const info = BRO_TYPE_INFO[result];
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-scale-in">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className={`size-28 rounded-full bg-linear-to-br ${info.gradient} flex items-center justify-center text-5xl shadow-bro glow-bro`}>
              {info.emoji}
            </div>
          </div>

          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-matte-blue mb-2 animate-fade-in">
            Your Bro Type
          </p>
          <h1 className="text-center text-4xl font-display font-extrabold text-bro-ink mb-1 animate-fade-in delay-100">
            {result}
          </h1>
          <p className="text-center text-sm font-bold text-bro-slate mb-5 animate-fade-in delay-100">
            {info.tagline}
          </p>
          <p className="text-center text-sm text-bro-slate leading-relaxed mb-7 animate-fade-in delay-200">
            {info.description}
          </p>

          {/* Traits */}
          <div className="grid grid-cols-3 gap-2 mb-8 animate-fade-in delay-300">
            {(Object.entries(info.traits) as [string, string][]).map(([label, val]) => (
              <div key={label} className="bg-card rounded-2xl py-3 px-2 text-center border border-border">
                <p className="text-[9px] uppercase tracking-widest text-bro-slate font-bold mb-1">
                  {label}
                </p>
                <p className="text-sm font-bold text-bro-ink">{val}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate({ to: "/" })}
            className="w-full bg-gradient-bro text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-bro active:scale-95 transition-transform animate-fade-in delay-400"
          >
            Meet your Brophet <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="max-w-sm mx-auto w-full flex flex-col flex-1 px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-8">
          {step > 0 ? (
            <button
              onClick={goBack}
              aria-label="Back"
              className="size-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-matte-blue/40 transition-colors"
            >
              <ArrowLeft className="size-4 text-bro-slate" />
            </button>
          ) : (
            <div className="size-9" />
          )}
          <div className="flex-1 h-1 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-bro rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-bro-slate tabular-nums">
            {step + 1}/{total}
          </span>
        </div>

        {/* Question */}
        <div key={animKey} className="flex-1 flex flex-col animate-slide-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-matte-blue mb-3">
            {q.label}
          </p>
          <h2 className="text-[1.65rem] font-display font-extrabold text-bro-ink leading-tight mb-8">
            {q.question}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              const selected = answers[step] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => pick(idx)}
                  className={`relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                    selected
                      ? "border-matte-blue bg-matte-blue/10 shadow-bro"
                      : "border-border bg-card hover:border-matte-blue/30"
                  }`}
                >
                  <span className="text-2xl mb-2">{opt.emoji}</span>
                  <span className="font-bold text-sm text-bro-ink">{opt.text}</span>
                  <span className="text-[11px] text-bro-slate mt-0.5">{opt.sub}</span>
                  {selected && (
                    <div className="absolute top-3 right-3 size-5 rounded-full bg-gradient-bro flex items-center justify-center">
                      <Check className="size-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
