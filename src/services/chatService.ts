import { retrieveRelevantChunks } from '../data/ragKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sources?: {
    title: string;
    source: string;
    link?: string;
    linkLabel?: string;
  }[];
  suggestedQuestions?: string[];
}

export interface ChatResponse {
  answer: string;
  sources?: {
    title: string;
    source: string;
    link?: string;
    linkLabel?: string;
  }[];
  suggestedQuestions?: string[];
  modelUsed?: string;
}

/**
 * Sends a user query to the RAG backend (/api/chat).
 * Works on both Vercel production and local Vite dev server.
 * Automatically falls back to smart client-side RAG synthesis if offline.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<ChatResponse> {
  const cleanMessage = message.trim();
  if (!cleanMessage) {
    throw new Error('Message cannot be empty');
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: cleanMessage,
        history: history.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.answer) {
        return {
          answer: data.answer,
          sources: data.sources || [],
          suggestedQuestions: data.suggestedQuestions || [],
          modelUsed: data.modelUsed,
        };
      }
    } else {
      console.warn(`/api/chat responded with status ${res.status}`);
    }
  } catch (error) {
    console.warn('Network call to /api/chat failed, activating smart client-side RAG fallback:', error);
  }

  // Graceful smart client-side RAG Fallback
  return fallbackClientRAG(cleanMessage);
}

function fallbackClientRAG(query: string): ChatResponse {
  const retrieved = retrieveRelevantChunks(query, 4);
  const q = query.toLowerCase();

  let answerText = '';

  // 1. Projects count or list
  if (
    q.includes('project') &&
    (q.includes('total') || q.includes('how many') || q.includes('number') || q.includes('count') || q.includes('all'))
  ) {
    answerText = `Varshid Shekhat has released **25+ commercial mobile applications** on the Apple App Store and Google Play throughout his 6+ years of engineering experience.\n\nHis portfolio features **6 flagship production platforms**:\n1. **Invitem** — Event Management & RSVP Platform with sub-100ms SignalR chat and Stripe payments.\n2. **Enterprise IoT Smart Home & Device Automation** — Hardware pairing, telemetry, and automated Detox testing.\n3. **High-Volume E-Commerce Platform** — Retail app serving 100,000+ active shoppers with ML recommendations.\n4. **Healthcare Staffing & Shift Management Platform** — 100% geofenced attendance and on-device biometric PDF signing.\n5. **Agentic AI Workflow & Multi-Agent Orchestrator** — Autonomous FastAPI microservice with Model Context Protocol (MCP) and RAG.\n6. **Published Open-Source Social Auth NPM Packages** — 3 published libraries (\`google-easy-login\`, \`fb-easy-login\`, \`twitter-easy-login\`) used across 20+ repositories.\n\nYou can explore each project under the **[Work / Projects](#projects)** section!`;
  }
  // 2. Resume / CV
  else if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    answerText = `You can download Varshid Shekhat's official resume directly in PDF format:\n\n📄 **[Download Varshid_Shekhat_Resume.pdf](/Varshid_Shekhat_Resume.pdf)**\n\nIt covers his 6+ years in React Native, native Android/iOS bridge modules, AI systems, verified awards, and education.`;
  }
  // 3. Contact & Hiring
  else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('whatsapp') || q.includes('phone') || q.includes('reach')) {
    answerText = `You can connect with Varshid Shekhat directly through any of these channels:\n\n- **Email:** [shekhatvarshid5145@gmail.com](mailto:shekhatvarshid5145@gmail.com)\n- **WhatsApp & Phone:** [+91 80008 49533](https://wa.me/918000849533)\n- **LinkedIn:** [linkedin.com/in/varshid-shekhat-1853b2184](https://linkedin.com/in/varshid-shekhat-1853b2184)\n- **GitHub:** [github.com/varshid-android](https://github.com/varshid-android)\n\nVarshid is based in Ahmedabad, India and is currently open for **Senior / Lead Mobile & AI roles**, as well as high-impact consulting contracts.`;
  }
  // 4. Skills & Tech Stack
  else if (q.includes('skill') || q.includes('tech stack') || q.includes('languages') || q.includes('tools')) {
    answerText = `Varshid's technical mastery spans across:\n\n- **Mobile:** React Native (96%), Native Android Java/Kotlin (88%), IoT Mobile Communication (86%), iOS Bridges (82%), Flutter.\n- **Languages & State:** TypeScript (95%), Python (85%), Redux Toolkit (94%), Zustand (90%).\n- **AI & Automation:** Retrieval-Augmented Generation / RAG (90%), Model Context Protocol / MCP (88%), Agent-to-Agent (A2A), LLM Fine-Tuning.\n- **Backend & Real-Time:** REST & GraphQL (94%), SignalR WebSockets (92%), FastAPI, Node.js, Firebase (95%), Stripe/PayPal.\n- **DevOps & QA:** Azure DevOps CI/CD (92%), Detox E2E Testing (88%), Jest, Sentry Telemetry.`;
  }
  // 5. Awards & Recognition
  else if (q.includes('award') || q.includes('honor') || q.includes('trophy') || q.includes('speaker') || q.includes('recognition')) {
    answerText = `Varshid has been recognized with the following honors:\n\n1. **Best Team Player Award (Q2 2026)** — MobMaxime Quarterly Excellence Awards for outstanding leadership and client delivery on the Invitem project.\n2. **Keynote Speaker & Certificate of Appreciation (2026)** — MobMaxime Technical Forum on *"LLM Fine-Tuning with Custom Data"* exploring enterprise adaptation of foundation models.\n\nYou can view the verified award photos and LinkedIn announcement in the **[Awards & Honors](#awards)** section.`;
  }
  // 6. Generic Top Chunk Grounding
  else {
    const primary = retrieved[0];
    answerText = `**${primary.title}**\n\n${primary.content}\n\n*Looking for more details?* Connect with Varshid on WhatsApp at **+91 80008 49533** or via email at **shekhatvarshid5145@gmail.com**.`;
  }

  const suggested: string[] = [
    'What are Varshid’s core technical skills?',
    'Tell me about the Invitem project',
    'How do I hire or contact him?',
  ];

  return {
    answer: answerText,
    sources: retrieved.map((c) => ({
      title: c.title,
      source: c.source,
      link: c.link,
      linkLabel: c.linkLabel,
    })),
    suggestedQuestions: suggested,
  };
}
