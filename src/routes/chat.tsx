import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Mic, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with your Brophet" },
      { name: "description", content: "Vent, joke, get advice. Your bro is at your disbrosal." },
    ],
  }),
  component: Chat,
});

type Msg = { role: "bro" | "me"; text: string };

const seed: Msg[] = [
  { role: "bro", text: "Yo bro, what's the broblem today? I'm bropen to anything." },
  { role: "me", text: "Honestly just been overthinking everything this week." },
  { role: "bro", text: "Standard behavior. Your brain's running tabs it forgot to close. Wanna talk it out or get a quick lock-in plan?" },
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "me", text: input.trim() };
    const broReply: Msg = {
      role: "bro",
      text: "Bet. Take a breath. We're locking in — one thing at a time, no spirals on my watch.",
    };
    setMessages((m) => [...m, userMsg, broReply]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto bg-card min-h-screen flex flex-col shadow-2xl">
        {/* Header */}
        <header className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-border">
          <Link to="/" aria-label="Back" className="size-9 rounded-full bg-soft-blue flex items-center justify-center hover:scale-105 transition-transform">
            <ArrowLeft className="size-4 text-matte-blue" />
          </Link>
          <div className="size-10 rounded-full bg-gradient-bro flex items-center justify-center text-white font-display font-extrabold">
            B
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">The Chill Ox</p>
            <p className="text-[10px] text-bro-slate/60 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-green-500" /> Bro at your disbrosal
            </p>
          </div>
          <button aria-label="Voice" className="size-9 rounded-full bg-soft-blue flex items-center justify-center hover:scale-105 transition-transform">
            <Mic className="size-4 text-matte-blue" />
          </button>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "me" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "me"
                    ? "bg-gradient-bro text-primary-foreground rounded-br-md"
                    : "bg-soft-blue/60 text-bro-ink rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div className="flex justify-start animate-fade-in">
            <button className="flex items-center gap-2 text-[11px] font-bold text-matte-blue bg-soft-blue/50 px-3 py-2 rounded-full">
              <Sparkles className="size-3" /> Give me a quick lock-in plan
            </button>
          </div>
        </main>

        {/* Composer */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2 bg-soft-blue/50 rounded-full pl-4 pr-1.5 py-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message your bro..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-bro-slate/40"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="size-9 rounded-full bg-gradient-bro flex items-center justify-center text-primary-foreground transition-transform active:scale-90"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
