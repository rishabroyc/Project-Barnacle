import type { BroType } from "./ai";

export type { BroType };

export const QUESTIONS = [
  {
    label: "The Situation",
    question: "Real talk — what's life like right now?",
    options: [
      { text: "Lowkey a mess", emoji: "🌊", sub: "Too much going on" },
      { text: "Grinding but burnt out", emoji: "💪", sub: "Need a breather" },
      { text: "Fine outside, heavy inside", emoji: "🌙", sub: "Hard to explain" },
      { text: "Bored, just existing", emoji: "🎮", sub: "Waiting for something" },
    ],
  },
  {
    label: "Your Need",
    question: "When you open this app, you're really looking for...",
    options: [
      { text: "Someone to listen", emoji: "👂", sub: "No advice, just ears" },
      { text: "A kick in the ass", emoji: "⚡", sub: "Accountability mode" },
      { text: "Brutal honesty", emoji: "💀", sub: "Don't sugarcoat it" },
      { text: "Help making sense of things", emoji: "🧩", sub: "Big picture thinking" },
    ],
  },
  {
    label: "Humor Style",
    question: "Your humor is more...",
    options: [
      { text: "Dry & deadpan", emoji: "😐", sub: "Sarcasm is a love language" },
      { text: "Chaotic meme brain", emoji: "🤪", sub: "Unhinged but loveable" },
      { text: "Self-deprecating", emoji: "😂", sub: "I joke before they can" },
      { text: "Wholesome dad energy", emoji: "🤝", sub: "Laughing with, not at" },
    ],
  },
  {
    label: "The Broblem",
    question: "What's been occupying your headspace most?",
    options: [
      { text: "Work or school", emoji: "💼", sub: "The grind is relentless" },
      { text: "Loneliness / connection", emoji: "🤝", sub: "Feels disconnected" },
      { text: "Dating / relationships", emoji: "💔", sub: "It's complicated" },
      { text: "Identity / purpose", emoji: "🧭", sub: "Who am I even?" },
    ],
  },
  {
    label: "Communication Style",
    question: "When your bro checks in, how real do you want it?",
    options: [
      { text: "Validate me first", emoji: "🫂", sub: "Then we can get real" },
      { text: "No sugarcoating", emoji: "🎯", sub: "I can handle the truth" },
      { text: "Just hype me up", emoji: "📣", sub: "I need the push" },
      { text: "Ask questions", emoji: "🤔", sub: "Help me think it through" },
    ],
  },
  {
    label: "Your Energy",
    question: "One word — your vibe right now is...",
    options: [
      { text: "Exhausted", emoji: "😮‍💨", sub: "Running on empty" },
      { text: "Motivated", emoji: "🚀", sub: "Ready to lock in" },
      { text: "Frustrated", emoji: "😤", sub: "Things need to change" },
      { text: "Searching", emoji: "🔍", sub: "Looking for something" },
    ],
  },
];

// Each question's options (0-3) map to bro type scores
const SCORING: Array<Array<Partial<Record<BroType, number>>>> = [
  // Q1: Current life situation
  [
    { "The Chill Ox": 2 },
    { "Coach Prime": 2 },
    { "The Sage": 2 },
    { "The Realist": 2 },
  ],
  // Q2: What they're looking for
  [
    { "The Chill Ox": 3 },
    { "Coach Prime": 3 },
    { "The Realist": 3 },
    { "The Sage": 3 },
  ],
  // Q3: Humor style
  [
    { "The Realist": 2, "The Sage": 1 },
    { "Coach Prime": 3 },
    { "The Chill Ox": 2 },
    { "The Chill Ox": 1, "The Sage": 2 },
  ],
  // Q4: Biggest concern
  [
    { "Coach Prime": 2 },
    { "The Chill Ox": 2 },
    { "The Realist": 2 },
    { "The Sage": 2 },
  ],
  // Q5: How real do you want it
  [
    { "The Chill Ox": 3 },
    { "The Realist": 3 },
    { "Coach Prime": 3 },
    { "The Sage": 3 },
  ],
  // Q6: Current energy
  [
    { "The Chill Ox": 2 },
    { "Coach Prime": 2 },
    { "The Realist": 2 },
    { "The Sage": 2 },
  ],
];

export function computeBroType(answers: number[]): BroType {
  const scores: Record<BroType, number> = {
    "The Chill Ox": 0,
    "Coach Prime": 0,
    "The Realist": 0,
    "The Sage": 0,
  };

  answers.forEach((answerIndex, qIndex) => {
    const pts = SCORING[qIndex]?.[answerIndex] ?? {};
    for (const [broType, score] of Object.entries(pts)) {
      scores[broType as BroType] += score;
    }
  });

  const sorted = (Object.entries(scores) as [BroType, number][]).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

export const BRO_TYPE_INFO: Record<BroType, {
  emoji: string;
  tagline: string;
  description: string;
  traits: { humor: string; vibe: string; support: string };
  gradient: string;
}> = {
  "The Chill Ox": {
    emoji: "🧢",
    tagline: "High EQ, Zero Drama",
    description: "Calm, grounded, and genuinely present. He validates your feelings before anything else — no judgment, no rush. The bro who actually remembers what you said last time.",
    traits: { humor: "Chill", vibe: "Laid Back", support: "Emotional" },
    gradient: "from-sky-500 to-cyan-400",
  },
  "Coach Prime": {
    emoji: "🔥",
    tagline: "Pure Energy, Zero BS",
    description: "He'll push you harder than you push yourself. Equal parts hype man and accountability partner. When you're spiraling, he turns it into a sprint.",
    traits: { humor: "Hype", vibe: "On Fire", support: "Motivational" },
    gradient: "from-orange-500 to-amber-400",
  },
  "The Realist": {
    emoji: "👀",
    tagline: "Honest. Dry. Real.",
    description: "He'll tell you what your other friends won't. Dry humor, straight facts, zero tolerance for excuses — but always from a place of love. No fluff, no fake hype.",
    traits: { humor: "Dry AF", vibe: "Unfiltered", support: "Real Talk" },
    gradient: "from-violet-500 to-purple-400",
  },
  "The Sage": {
    emoji: "🧠",
    tagline: "Quiet Wisdom, Loud Impact",
    description: "Thoughtful, patient, and strangely wise for someone who just sent you a Marcus Aurelius meme. He helps you zoom out, find perspective, and stop spiraling.",
    traits: { humor: "Deadpan", vibe: "Zen", support: "Philosophical" },
    gradient: "from-emerald-500 to-teal-400",
  },
};
