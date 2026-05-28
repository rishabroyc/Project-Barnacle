import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Sparkles, Loader2 } from "lucide-react";
import { sendMessage, BRO_GREETINGS, type ChatMessage } from "@/lib/ai";
import { BRO_TYPE_INFO } from "@/lib/bro-type";
import { useBroType } from "@/hooks/use-bro-type";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with your Brophet" },
      { name: "description", content: "Vent, joke, get advice. Your bro is at your disbrosal." },
    ],
  }),
  component: Chat,
});

const QUICK_PROMPTS = [
  "Give me a lock-in plan for today",
  "I need to vent about something",
  "How do I stop overthinking?",
  "Roast me a little, I need it",
];

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-soft-blue px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-matte-blue animate-bounce [animation-delay:0ms]" />
        <span className="size-1.5 rounded-full bg-matte-blue animate-bounce [animation-delay:150ms]" />
        <span className="size-1.5 rounded-full bg-matte-blue animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function recordActivity() {
  const count = parseInt(localStorage.getItem("brophet-chat-count") || "0");
  localStorage.setItem("brophet-chat-count", String(count + 1));
  const days: string[] = JSON.parse(localStorage.getItem("brophet-active-days") || "[]");
  const today = new Date().toDateString();
  if (!days.includes(today)) {
    days.push(today);
    localStorage.setItem("brophet-active-days", JSON.stringify(days));
  }
}

function Chat() {
  const { broType, loaded } = useBroType();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loaded) return;
    setMessages([{ role: "assistant", content: BRO_GREETINGS[broType] }]);
    setError(null);
  }, [broType, loaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendUserMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const result = await sendMessage({ data: { messages: updated, broType } });
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
      recordActivity();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setMessages(messages);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const info = loaded ? BRO_TYPE_INFO[broType] : null;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto bg-card min-h-screen flex flex-col">

        {/* Header */}
        <header className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-border">
          <Link to="/" aria-label="Back" className="size-9 rounded-full bg-soft-blue flex items-center justify-center hover:scale-105 transition-transform">
            <ArrowLeft className="size-4 text-matte-blue" />
          </Link>
          <div className={`size-10 rounded-full bg-linear-to-br ${info?.gradient ?? "from-violet-500 to-blue-500"} flex items-center justify-center text-lg shrink-0`}>
            {info?.emoji ?? "🤝"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-bro-ink truncate">{loaded ? broType : "Your Brophet"}</p>
            <p className="text-[10px] text-bro-slate flex items-center gap-1">
              <span className={`size-1.5 rounded-full flex-shrink-0 ${isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
              {isLoading ? "Thinking…" : "Bro at your disbrosal"}
            </p>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-bro text-white rounded-br-md"
                    : "bg-soft-blue text-bro-ink rounded-bl-md"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <div className="flex justify-center">
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full max-w-[80%] text-center">
                {error}
              </p>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div className="space-y-2 pt-2">
              {QUICK_PROMPTS.map((prompt) => (
                <div key={prompt} className="flex justify-start">
                  <button
                    onClick={() => sendUserMessage(prompt)}
                    className="flex items-center gap-2 text-[11px] font-bold text-matte-blue bg-soft-blue px-3 py-2 rounded-full border border-border hover:border-matte-blue/40 transition-colors"
                  >
                    <Sparkles className="size-3 flex-shrink-0" />
                    {prompt}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        {/* Composer */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2 bg-soft-blue rounded-full pl-4 pr-1.5 py-1.5 border border-border">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendUserMessage(input)}
              placeholder="Message your bro…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-bro-slate/50 text-bro-ink"
              disabled={isLoading}
            />
            <button
              onClick={() => sendUserMessage(input)}
              aria-label="Send"
              disabled={!input.trim() || isLoading}
              className="size-9 rounded-full bg-gradient-bro flex items-center justify-center text-white transition-transform active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
