export type BroType = "The Chill Ox" | "Coach Prime" | "The Realist" | "The Sage";
export type ChatMessage = { role: "user" | "assistant"; content: string };

// Persona system prompts + the 988 safety footer now live server-side
// (see /server, issue #7) so the API key and prompt content never ship to the client.
export const BRO_GREETINGS: Record<BroType, string> = {
  "The Chill Ox": "Yo bro, what's the broblem today? I'm bropen to anything.",
  "Coach Prime": "LOCK IN. What are we tackling today, bro? Let's get it.",
  "The Realist": "Alright, I'm here. What's going on — and don't sugarcoat it.",
  "The Sage": "Hey. I'm here. What's been weighing on you?",
};

export async function sendMessage({
  sessionId,
  broType,
  messages,
}: {
  sessionId: string;
  broType: BroType;
  messages: ChatMessage[];
}): Promise<{ text: string }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, personaId: broType, messages }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong. Try again.");
  }

  return res.json();
}
