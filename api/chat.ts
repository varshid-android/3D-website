import type { IncomingMessage } from 'http';

// Complete Knowledge Base for RAG context
interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  source: string;
  link?: string;
  linkLabel?: string;
}

const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'bio-overview',
    category: 'bio',
    title: 'Varshid Shekhat — Professional Summary & Title',
    content: `Varshid Shekhat is a Senior React Native Developer & AI Solutions Engineer based in Ranip, Ahmedabad, Gujarat, India. He has 6+ years of specialized experience building high-performance cross-platform mobile apps for iOS and Android, native bridge modules (Java/Kotlin/Objective-C), IoT device communications, and scalable AI workflows (FastAPI, RAG, MCP, Multi-Agent systems). He has led client projects from POC through global app-store launch, achieving 100k+ user scale, 99.9% crash-free telemetry, and automated CI/CD releases.`,
    keywords: ['varshid', 'shekhat', 'who is', 'about', 'summary', 'experience', 'role', 'title', 'bio', 'overview', 'years'],
    source: 'Resume & Portfolio Summary',
    link: '#about',
    linkLabel: 'About Varshid',
  },
  {
    id: 'bio-stats',
    category: 'bio',
    title: 'Key Engineering Metrics & Milestones',
    content: `Key metrics: 6+ Years of Professional Experience in Mobile & Full-Stack development; 25+ Commercial Apps released to Apple App Store and Google Play; 99.9% Production Crash-Free Rate across telemetry systems; 100% Client Project Delivery rate from Proof-of-Concept to global app store distribution.`,
    keywords: ['stats', 'metrics', 'apps', 'years', 'crash free', 'delivery', 'track record', 'numbers', 'achievements'],
    source: 'Verified Portfolio Metrics',
    link: '#about',
    linkLabel: 'View Stats',
  },
  {
    id: 'projects-summary',
    category: 'project',
    title: 'Total Projects & Commercial Apps Overview',
    content: `Varshid Shekhat has released over 25+ commercial mobile applications to the Apple App Store and Google Play throughout his 6+ years of engineering experience.

His portfolio specifically showcases 6 flagship production platforms:
1. Invitem — Event Management & RSVP Platform with sub-100ms SignalR chat, dynamic guest lists, and Stripe payments.
2. Enterprise IoT Smart Home & Device Automation — Mobile-to-hardware communication via SignalR, device protocols, and Detox E2E testing.
3. High-Volume E-Commerce Platform & Recommendation Engine — Retail mobile application serving 100,000+ active shoppers with PayPal/Stripe and ML recommendations.
4. Healthcare Staffing & Shift Management Platform — Mission-critical staffing application with 100% geofenced attendance verification and biometric PDF signing.
5. Agentic AI Workflow & Multi-Agent Orchestrator — Autonomous system powered by FastAPI, Model Context Protocol (MCP), and RAG vector pipelines.
6. Published Open-Source Social Auth NPM Packages — Suite of 3 published NPM libraries (google-easy-login, fb-easy-login, twitter-easy-login) used across 20+ repositories.`,
    keywords: [
      'total number of projects',
      'how many projects',
      'total projects',
      'number of projects',
      'project count',
      'list of projects',
      'all projects',
      'flagship projects',
      'commercial apps',
      'projects'
    ],
    source: 'Portfolio Projects Summary',
    link: '#projects',
    linkLabel: 'View Projects Section',
  },
  {
    id: 'contact-details',
    category: 'contact',
    title: 'Contact Information & Direct Channels',
    content: `Varshid Shekhat can be reached directly via:
- Email: shekhatvarshid5145@gmail.com
- Phone & WhatsApp: +91 80008 49533
- WhatsApp Direct Chat: https://wa.me/918000849533?text=Hi%20Varshid,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!
- LinkedIn: https://linkedin.com/in/varshid-shekhat-1853b2184
- GitHub: https://github.com/varshid-android
- Location: Ranip, Ahmedabad - 382480, Gujarat, India
- Availability: Currently open for Senior/Lead roles, high-impact contract opportunities, and AI mobile advisory.`,
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'hire', 'reach', 'connect', 'linkedin', 'github', 'location', 'address', 'city'],
    source: 'Contact Info',
    link: '#contact',
    linkLabel: 'Contact Section',
  },
  {
    id: 'resume-download',
    category: 'contact',
    title: 'Download Resume PDF',
    content: `Varshid Shekhat's official resume is available for instant download in PDF format at the path: /Varshid_Shekhat_Resume.pdf. It outlines his 6+ years of React Native engineering, native Android/iOS bridges, AI architecture projects, verified awards, and education.`,
    keywords: ['resume', 'cv', 'pdf', 'download resume', 'curriculum vitae', 'document'],
    source: 'Official Resume PDF',
    link: '/Varshid_Shekhat_Resume.pdf',
    linkLabel: 'Download Resume PDF',
  },
  {
    id: 'exp-mobmaxime',
    category: 'experience',
    title: 'MobMaxime (Eventtan Pvt Ltd) — Senior React Native & AI Solutions Engineer',
    content: `Period: April 2023 – Present (Current). Location: Ahmedabad, India.
Role: Senior React Native Developer & AI Solutions Engineer.
Highlights:
- Lead client projects from architectural proof of concept through rigorous iOS and Android app-store release across Finance, Healthcare, and Event management.
- Optimized network queries with GraphQL APIs, cutting data fetch latency by 30%.
- Architected predictable state flow with Redux Toolkit slices and Zustand stores.
- Integrated enterprise OAuth 2.0 security and ensured WCAG accessibility compliance.
- Engineered live synchronization using WebSocket and SignalR services with sub-100ms latency.
- Designed and deployed intelligent AI capabilities leveraging Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Agent-to-Agent (A2A) orchestration, n8n toolchains, and fine-tuned LLMs.
Tech Stack: React Native, ReactJS, TypeScript, GraphQL, SignalR, Redux Toolkit, FastAPI, Node.js, OAuth 2.0, Azure DevOps, RAG, MCP, A2A, Firebase, Sentry, SonarQube.`,
    keywords: ['mobmaxime', 'current job', 'present', 'eventtan', 'lead', 'senior', 'rag', 'mcp', 'graphql', 'signalr', 'fastapi'],
    source: 'Work Experience — MobMaxime',
    link: '#experience',
    linkLabel: 'View Experience',
  },
  {
    id: 'exp-innvonix',
    category: 'experience',
    title: 'Innvonix Technologies LLP — React Native & Android Developer',
    content: `Period: January 2022 – April 2023. Location: Ahmedabad, India.
Role: React Native & Android Developer.
Highlights:
- Developed and maintained high-volume cross-platform mobile apps, including a flagship e-commerce application serving 100k+ active shoppers.
- Integrated dual payment gateways (PayPal and Stripe) for secure transactions, biometric authentication, and dynamic deep links.
- Boosted sprint delivery velocity by 20% with modular UI component libraries.
- Executed memory leak diagnostics and profiling to sustain uninterrupted 60fps render loops.
Tech Stack: React Native, Redux Slice, PayPal SDK, Stripe, Firebase, REST APIs, Memory Profiling, JavaScript, Android Studio, iOS.`,
    keywords: ['innvonix', 'ecommerce', '100k', 'stripe', 'paypal', 'payments', 'performance', 'profiling', '60fps'],
    source: 'Work Experience — Innvonix Technologies',
    link: '#experience',
    linkLabel: 'View Experience',
  },
  {
    id: 'exp-fancom',
    category: 'experience',
    title: 'Fancom & Binary Geckos — React Native & Android Developer',
    content: `Period: July 2020 – December 2021. Location: Rajkot, India.
Role: React Native & Android Developer.
Highlights:
- Engineered React Native and native Android apps, migrating legacy mobile features to React Native and cutting code redundancy by 40%.
- Refactored core architectural modules, slashing production app package size by 25%.
- Built native Android bridge modules in Java to connect hardware device capabilities (camera, GPS, background sync) to React Native.
- Automated mobile testing using Jest and Enzyme test suites, eliminating edge-case regression bugs before release.
Tech Stack: React Native, Native Android, Java, Jest & Enzyme, SQLite, Firebase Auth, REST APIs, Git.`,
    keywords: ['fancom', 'binary geckos', 'native bridge', 'java', 'jest', 'enzyme', 'sqlite', 'bundle size', 'camera', 'gps'],
    source: 'Work Experience — Fancom & Binary Geckos',
    link: '#experience',
    linkLabel: 'View Experience',
  },
  {
    id: 'exp-apgroups',
    category: 'experience',
    title: 'AP Groups — Junior Android Developer',
    content: `Period: January 2020 – July 2020. Location: Ahmedabad, India.
Role: Junior Android Developer.
Highlights:
- Specialized in local data storage optimization using SQLite and Room DB for native Android apps.
- Created Material Design UI layouts and customer feedback modules with offline sync.
- Reduced software bugs by 15% through unit testing and Google Maps API location integration.
Tech Stack: Android SDK, Java, SQLite, Room DB, Google Maps API, XML Layouts, Git, Android Studio.`,
    keywords: ['ap groups', 'junior', 'first job', 'android', 'room db', 'sqlite', 'google maps', 'java'],
    source: 'Work Experience — AP Groups',
    link: '#experience',
    linkLabel: 'View Experience',
  },
  {
    id: 'proj-invitem',
    category: 'project',
    title: 'Invitem — Event Management & RSVP Platform',
    content: `Role: Project Lead. Flagship enterprise event orchestration and social RSVP platform.
Highlights:
- Led mobile app development in React Native while concurrently architecting a comprehensive admin portal in ReactJS.
- Built real-time invitation RSVP engine with customizable tiered guest lists and instant push alerts via Firebase Cloud Messaging (FCM).
- Persistent sub-100ms real-time chat and presence tracking using SignalR websockets.
- Integrated Stripe for event ticketing and transactions, and Google Places API for venue mapping.
- Maintained enterprise code health via SonarQube Grade A static code analysis.
Metrics: 50,000+ Event Invites Processed, Sub-100ms SignalR Chat Latency, SonarQube Grade A Quality.
Tech Stack: React Native, ReactJS, SignalR, Firebase Cloud Messaging, Stripe, Google Places API, SonarQube, TypeScript.`,
    keywords: ['invitem', 'event', 'rsvp', 'signalr', 'chat', 'stripe', 'places api', 'fcm', 'tickets', 'flagship'],
    source: 'Featured Project — Invitem',
    link: '#projects',
    linkLabel: 'View Invitem Details',
  },
  {
    id: 'proj-iot',
    category: 'project',
    title: 'Enterprise IoT Smart Home & Device Automation Platform',
    content: `Role: Lead Mobile Developer. High-performance smart home mobile system communicating with connected IoT hardware appliances.
Highlights:
- Engineered mobile-to-IoT communication layer enabling seamless hardware pairing and real-time state synchronization.
- Integrated SignalR services for low-latency bidirectional device control and live diagnostic broadcasts.
- Developed device health monitoring dashboard with automated hardware fault reporting.
- Deterministic state architecture using Redux Toolkit slices for complex multi-device interaction states.
- Automated end-to-end testing with Detox; configured Azure DevOps CI/CD pipelines accelerating deployments by 40%.
Metrics: 40% Faster CI/CD Deployments, Sub-50ms IoT Command Latency, Full Detox Test Coverage.
Tech Stack: React Native, IoT Device Protocols, SignalR, Redux Toolkit, Detox E2E Testing, Azure DevOps CI/CD, TypeScript, Android Studio.`,
    keywords: ['iot', 'smart home', 'hardware', 'signalr', 'detox', 'azure devops', 'device automation', 'telemetry'],
    source: 'Featured Project — IoT Smart Home',
    link: '#projects',
    linkLabel: 'View IoT Project',
  },
  {
    id: 'proj-ecommerce',
    category: 'project',
    title: 'High-Volume E-Commerce Platform & Recommendation Engine',
    content: `Role: Senior Mobile Developer. High-traffic retail mobile application serving 100,000+ active shoppers.
Highlights:
- Integrated dual payment processing via PayPal and Stripe SDKs with biometric authentication and fraud prevention.
- Optimized checkout and cart flows, cutting cart abandonment rates by 25%.
- Integrated machine learning product recommendation engine, boosting sales conversions by 15%.
- Implemented targeted push campaigns via Firebase Cloud Messaging based on user behavior triggers.
- Slashed app startup and load times by 30% through SQLite query optimization and caching.
Metrics: 100,000+ Active Shoppers, 25% Abandonment Reduction, 15% Sales Conversion Lift.
Tech Stack: React Native, PayPal SDK, Stripe, Redux Slice, ML Recommendation Engine, Firebase Cloud Messaging, SQLite, Material Design.`,
    keywords: ['ecommerce', 'e-commerce', 'shopping', 'paypal', 'stripe', 'recommendation', 'checkout', '100k', 'users'],
    source: 'Featured Project — E-Commerce',
    link: '#projects',
    linkLabel: 'View E-Commerce Project',
  },
  {
    id: 'proj-healthcare',
    category: 'project',
    title: 'Healthcare Staffing & Shift Management Platform',
    content: `Role: Project Lead. Mission-critical healthcare workforce application for nurses and medical providers.
Highlights:
- Real-time shift scheduling calendar with instant vacancy broadcasts and shift acceptance.
- High-precision geofenced attendance verification preventing unauthorized clock-in/out (100% geofence accuracy).
- Embedded PDF document viewer with biometric-ready digital signature capture for legal timesheet validation.
- SignalR real-time messaging for emergency nurse-supervisor communication and crisis alerts.
- Automated Azure DevOps CI/CD zero-downtime continuous builds.
Metrics: 10,000+ Verified Clock-ins, 100% Geofence Accuracy, Automated CI/CD Builds.
Tech Stack: React Native, SignalR, Azure DevOps CI/CD, Firebase, PDF Signing Engine, Geofencing API, Zustand, TypeScript.`,
    keywords: ['healthcare', 'shifts', 'nurse', 'staffing', 'geofencing', 'timesheets', 'digital signature', 'pdf signing'],
    source: 'Featured Project — Healthcare Staffing',
    link: '#projects',
    linkLabel: 'View Healthcare Project',
  },
  {
    id: 'proj-ai-orchestrator',
    category: 'project',
    title: 'Agentic AI Workflow & Multi-Agent Orchestrator',
    content: `Role: AI & Backend Engineer. Autonomous multi-agent framework powered by FastAPI, Model Context Protocol (MCP), and RAG.
Highlights:
- Implemented Model Context Protocol (MCP) tool integration connecting disparate enterprise APIs into LLM reasoning loops.
- Built Retrieval-Augmented Generation (RAG) vector pipelines delivering accurate, grounded context with sub-second retrieval.
- Orchestrated Agent-to-Agent (A2A) autonomous coordination patterns with automated fallback heuristics.
- Connected n8n workflow triggers with high-speed Python FastAPI asynchronous microservice endpoints.
Metrics: 10x Workflow Acceleration, Sub-second Retrieval, Multi-agent Autonomous Loops.
Tech Stack: Python, FastAPI, RAG, MCP, A2A Multi-Agent, n8n, Node.js, Vector Embeddings.`,
    keywords: ['ai', 'agentic', 'multi-agent', 'orchestrator', 'fastapi', 'mcp', 'rag', 'a2a', 'n8n', 'python', 'vector'],
    source: 'Featured Project — AI Multi-Agent Orchestrator',
    link: '#projects',
    linkLabel: 'View AI Orchestrator',
  },
  {
    id: 'proj-npm-packages',
    category: 'project',
    title: 'Published Open-Source Social Auth NPM Packages',
    content: `Role: Author & Lead Maintainer. Suite of 3 published zero-boilerplate social authentication NPM libraries used by mobile and web developers worldwide:
1. google-easy-login: Streamlined Google OAuth authentication with zero boilerplate (https://www.npmjs.com/package/google-easy-login)
2. fb-easy-login: Simplified Facebook Graph API login flow and token lifecycle (https://www.npmjs.com/package/fb-easy-login)
3. twitter-easy-login: Plug-and-play Twitter/X authentication and secure token exchange (https://www.npmjs.com/package/twitter-easy-login)
Highlights: Full TypeScript declarations, custom theme builders, semantic versioning, and automated Azure DevOps releases.
Metrics: 3 Published NPM Packages, Zero-config OAuth, Used across 20+ Repositories.
Tech Stack: TypeScript, NPM Publishing, OAuth 2.0, React Native, Social Auth SDKs, Azure DevOps.`,
    keywords: ['npm', 'open source', 'packages', 'google-easy-login', 'fb-easy-login', 'twitter-easy-login', 'oauth', 'social auth', 'libraries'],
    source: 'Featured Project — Open Source NPM Packages',
    link: '#projects',
    linkLabel: 'View NPM Packages',
  },
  {
    id: 'skills-mobile-web',
    category: 'skill',
    title: 'Mobile & Web Architecture Mastery',
    content: `Mobile & Web Architecture skills:
- React Native (96% proficiency — core expertise, architecture, hooks, performance, reanimated)
- Native Android with Java & Kotlin (88% proficiency — native bridge modules, hardware integrations)
- IoT Mobile Communication (86% proficiency — bluetooth, local wifi, websocket/SignalR telemetry)
- Native iOS Bridges (82% proficiency — Objective-C/Swift integration)
- Flutter Module Integration (80% proficiency)
- ReactJS & Modern Web (90% proficiency — Next.js/Vite, Tailwind CSS, component systems)`,
    keywords: ['react native', 'android', 'ios', 'mobile', 'kotlin', 'java', 'swift', 'flutter', 'react', 'web', 'frontend'],
    source: 'Skills — Mobile & Web',
    link: '#skills',
    linkLabel: 'View Skills',
  },
  {
    id: 'skills-languages-state',
    category: 'skill',
    title: 'Languages & State Management',
    content: `Languages & State Management skills:
- TypeScript (95% proficiency — strict type safety, generics, enterprise codebases)
- JavaScript ES6+ (95% proficiency)
- Python (85% proficiency — FastAPI, scripting, AI/ML pipelines)
- Java & Kotlin (84% proficiency — Android SDK development)
- Dart (78% proficiency — Flutter)
- Redux Toolkit & Slices (94% proficiency — complex global state, normalized caches)
- Zustand & MobX (90% proficiency — lightweight predictable stores)`,
    keywords: ['typescript', 'javascript', 'python', 'state management', 'redux', 'zustand', 'mobx', 'types', 'coding'],
    source: 'Skills — Languages & State',
    link: '#skills',
    linkLabel: 'View Skills',
  },
  {
    id: 'skills-api-backend',
    category: 'skill',
    title: 'APIs, Real-Time & Backend Infrastructure',
    content: `APIs & Backend skills:
- REST & GraphQL APIs (94% proficiency — query optimization, schema stitching)
- SignalR & WebSockets (92% proficiency — bi-directional sub-100ms real-time chat, telemetry, presence)
- Node.js & Express (88% proficiency — microservices, authentication)
- FastAPI Python (86% proficiency — async AI and high-throughput endpoints)
- Firebase & FCM (95% proficiency — notifications, auth, real-time firestore, crashlytics)
- Stripe & PayPal (90% proficiency — dual payment gateways, webhooks, checkout flows)
- Google Maps & Places API (90% proficiency)
- Databases: SQLite, Room DB (88%), MongoDB, PostgreSQL (82%)`,
    keywords: ['api', 'backend', 'graphql', 'signalr', 'websockets', 'node.js', 'fastapi', 'firebase', 'stripe', 'paypal', 'database', 'sqlite', 'postgres'],
    source: 'Skills — APIs & Backend',
    link: '#skills',
    linkLabel: 'View Skills',
  },
  {
    id: 'skills-ai-automation',
    category: 'skill',
    title: 'AI, RAG, Agents & Automation',
    content: `AI & Automation skills:
- Retrieval-Augmented Generation / RAG (90% proficiency — semantic embeddings, vector databases, grounded context pipelines)
- Model Context Protocol / MCP (88% proficiency — tool-calling, agent integrations)
- Agent-to-Agent / A2A Systems (85% proficiency — multi-agent autonomous coordination)
- Multi-Agent Workflows & n8n Automation (90% proficiency)
- LLM Fine-Tuning & Custom Data (88% proficiency — speaker & practitioner)
- Rapid Prototyping with modern AI dev tools (88%)`,
    keywords: ['ai', 'rag', 'mcp', 'a2a', 'agents', 'llm', 'fine-tuning', 'n8n', 'vector', 'embeddings', 'automation'],
    source: 'Skills — AI & Automation',
    link: '#skills',
    linkLabel: 'View AI Skills',
  },
  {
    id: 'award-team-player',
    category: 'award',
    title: 'Best Team Player Award — MobMaxime Quarterly Excellence (Q2 2026)',
    content: `Award: Best Team Player Award.
Issuer: MobMaxime Quarterly Excellence Awards.
Date: Q2 2026 (April – June 2026).
Project: Invitem Platform.
Details: Presented to Varshid Shekhat for exceptional collaboration and ownership in the Invitem Project. Proactively collaborated with clients and backend teams to ensure on-time delivery, brought practical solutions during architecture sessions, and demonstrated dependable technology leadership. Verified on LinkedIn: https://www.linkedin.com/posts/mobmaxime_mobmaxime-quarterlyawards-employeerecognition-activity-7500080027082842112-cfoY`,
    keywords: ['award', 'best team player', 'mobmaxime', 'recognition', 'trophy', 'plaque', 'excellence', 'invitem', 'q2 2026'],
    source: 'Awards — Best Team Player (Q2 2026)',
    link: '#awards',
    linkLabel: 'View Awards Section',
  },
  {
    id: 'award-ai-speaker',
    category: 'award',
    title: 'Keynote Speaker: LLM Fine-Tuning with Custom Data — MobMaxime Innovation Series (2026)',
    content: `Honour: Keynote Speaker & Certificate of Appreciation.
Issuer: MobMaxime Technical Forum & Innovation Series (2026).
Topic: "LLM Fine-Tuning with Custom Data".
Details: Conducted an in-depth technical session alongside Viral Panchal & Manish Prajapati on LLM Fine-Tuning with Custom Data. Explored how foundation models can be adapted and hyper-optimized for specific enterprise use cases, custom domain datasets, and high-accuracy applications. Awarded the official Certificate of Appreciation.`,
    keywords: ['speaker', 'keynote', 'llm', 'fine-tuning', 'custom data', 'certificate', 'ai talk', 'presentation', 'conference'],
    source: 'Awards — Keynote Speaker (2026)',
    link: '#awards',
    linkLabel: 'View Speaking Certificate',
  },
  {
    id: 'edu-rk-university',
    category: 'education',
    title: 'Bachelor of Computer Engineering — RK University (2020)',
    content: `Degree: Bachelor of Computer Engineering (B.E.).
Institution: RK University, Rajkot, Gujarat, India.
Graduation Year: 2020.
Field: Computer Engineering & Software Systems. Strong foundation in data structures, algorithms, operating systems, networking, database management, and mobile engineering.`,
    keywords: ['education', 'degree', 'rk university', 'bachelor', 'engineering', 'college', 'university', 'b.e.', '2020'],
    source: 'Education — RK University',
    link: '#about',
    linkLabel: 'View Education',
  },
];

function retrieveChunks(query: string, topK: number = 4): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (tokens.length === 0) {
    return KNOWLEDGE_BASE.slice(0, topK);
  }

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    if (contentLower.includes(normalizedQuery) || titleLower.includes(normalizedQuery)) {
      score += 15;
    }

    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 8;
      }
      for (const token of tokens) {
        if (kw.toLowerCase() === token) {
          score += 6;
        } else if (kw.toLowerCase().includes(token)) {
          score += 3;
        }
      }
    }

    for (const token of tokens) {
      if (titleLower.includes(token)) score += 5;
      if (contentLower.includes(token)) score += 2;
    }

    // Explicit intent boosts
    if (
      (normalizedQuery.includes('total') ||
        normalizedQuery.includes('how many') ||
        normalizedQuery.includes('number of') ||
        normalizedQuery.includes('count') ||
        normalizedQuery.includes('all')) &&
      (normalizedQuery.includes('project') || normalizedQuery.includes('app')) &&
      chunk.id === 'projects-summary'
    ) {
      score += 25;
    }

    if (
      (normalizedQuery.includes('resume') || normalizedQuery.includes('cv') || normalizedQuery.includes('download')) &&
      chunk.id === 'resume-download'
    ) {
      score += 15;
    }
    if (
      (normalizedQuery.includes('project') || normalizedQuery.includes('build') || normalizedQuery.includes('apps')) &&
      chunk.category === 'project'
    ) {
      score += 4;
    }
    if (
      (normalizedQuery.includes('experience') || normalizedQuery.includes('work') || normalizedQuery.includes('job') || normalizedQuery.includes('company')) &&
      chunk.category === 'experience'
    ) {
      score += 4;
    }
    if (
      (normalizedQuery.includes('award') || normalizedQuery.includes('trophy') || normalizedQuery.includes('speaker')) &&
      chunk.category === 'award'
    ) {
      score += 6;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const relevant = scored.filter((s) => s.score > 0).map((s) => s.chunk);
  return relevant.length > 0 ? relevant.slice(0, topK) : KNOWLEDGE_BASE.slice(0, topK);
}

// Generate suggested contextual follow-up questions
function generateFollowUps(query: string, retrieved: KnowledgeChunk[]): string[] {
  const q = query.toLowerCase();
  if (q.includes('skill') || q.includes('stack') || q.includes('react native')) {
    return [
      'Tell me about his Invitem project',
      'What awards has Varshid won?',
      'How can I get in touch with Varshid?',
    ];
  }
  if (q.includes('project') || q.includes('invitem') || q.includes('ecommerce') || q.includes('iot')) {
    return [
      'What open-source NPM packages has he published?',
      'What is his experience at MobMaxime?',
      'Can I download his resume?',
    ];
  }
  if (q.includes('award') || q.includes('speaker') || q.includes('certificate')) {
    return [
      'What topics did he speak on regarding LLMs?',
      'What are his key projects?',
      'How do I hire or contact him?',
    ];
  }
  return [
    'What are Varshid’s core technical skills?',
    'Tell me about his key projects',
    'How can I hire or contact him?',
  ];
}

// Read body helper for standard Node serverless
async function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: any, res: any) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Send a POST request.' });
    return;
  }

  try {
    const payload = req.body && typeof req.body === 'object' ? req.body : await readBody(req);
    const message = (payload.message || payload.query || '').trim();
    const history = Array.isArray(payload.history) ? payload.history : [];

    if (!message) {
      res.status(400).json({ error: 'Message cannot be empty.' });
      return;
    }

    // 1. RAG Retrieval Step
    const retrievedChunks = retrieveChunks(message, 4);

    const contextText = retrievedChunks
      .map(
        (c, idx) =>
          `[Source ${idx + 1}: ${c.title}]\nCategory: ${c.category}\nLink: ${c.link || 'N/A'}\nContent:\n${c.content}`
      )
      .join('\n\n---\n\n');

    const systemPrompt = `You are the official AI Assistant for Varshid Shekhat's professional portfolio.
Your role is to represent Varshid accurately, concisely, and warmly to recruiters, engineering managers, and clients.

Varshid Shekhat Profile:
- Senior React Native Developer & AI Solutions Engineer with 6+ years experience.
- Based in Ranip, Ahmedabad, Gujarat, India.
- Currently Senior React Native Developer & AI Solutions Engineer at MobMaxime (Eventtan Pvt Ltd).
- Winner of the MobMaxime Best Team Player Award (Q2 2026, Invitem Project) and Keynote Speaker on LLM Fine-Tuning.
- Released 25+ commercial apps to the App Store and Google Play; 6 flagship projects highlighted on portfolio.
- Published 3 NPM libraries: google-easy-login, fb-easy-login, twitter-easy-login.
- Flagship projects: Invitem (real-time RSVP & SignalR chat), Enterprise IoT Smart Home, 100k+ E-Commerce, Healthcare Staffing with geofencing, Agentic Multi-Agent Orchestrator, Published NPM Packages.
- Contact: Email (shekhatvarshid5145@gmail.com), Phone & WhatsApp (+91 80008 49533), Resume at /Varshid_Shekhat_Resume.pdf.

RESPONSE GUIDELINES:
1. Ground your answer strictly in the RETRIEVED CONTEXT below. Never fabricate facts, employers, or metrics.
2. Directly answer the user's specific question (e.g. if asked how many projects, state that he has released 25+ commercial apps and highlights 6 flagship platforms).
3. Keep answers concise, high-impact, and easy to skim (2-3 short paragraphs or bullet points).
4. If asked for his resume, clearly mention he can download it at "/Varshid_Shekhat_Resume.pdf".
5. If asked about contact or hiring, provide his email, WhatsApp link (+91 80008 49533), and confirm he is open for senior/lead roles and contracts.
6. Use markdown for bold emphasis and bullet points.`;

    const userPrompt = `RETRIEVED KNOWLEDGE CONTEXT:
${contextText}

USER QUESTION:
"${message}"

Answer the user's question clearly and accurately using the context above.`;

    // 2. OpenRouter API Key Sanitization & Resolution
    let openRouterApiKey = (process.env.OPENROUTER_API_KEY || '').trim();
    if (openRouterApiKey && !openRouterApiKey.startsWith('sk-or-')) {
      openRouterApiKey = `sk-or-${openRouterApiKey.replace(/^sk-/, '')}`;
    }

    // Models priority list (Fast, reliable free models)
    const modelCandidates = [
      process.env.OPENROUTER_MODEL,
      'nvidia/nemotron-3.5-lightning:free',
      'dots-studio/dots-3-note-preview:free',
      'google/gemma-4-31b-it:free',
    ].filter(Boolean) as string[];

    // Fallback if no key is set yet
    if (!openRouterApiKey) {
      const topChunk = retrievedChunks[0];
      const fallbackAnswer = `**Varshid's Profile Overview:**\n\n${topChunk.content}\n\n*Direct Contact:* shekhatvarshid5145@gmail.com | WhatsApp: +91 80008 49533\n*Resume:* [/Varshid_Shekhat_Resume.pdf](/Varshid_Shekhat_Resume.pdf)`;

      res.status(200).json({
        answer: fallbackAnswer,
        sources: retrievedChunks.map((c) => ({
          title: c.title,
          source: c.source,
          link: c.link,
          linkLabel: c.linkLabel,
        })),
        suggestedQuestions: generateFollowUps(message, retrievedChunks),
        mode: 'rag-grounded-fallback',
      });
      return;
    }

    // Format chat history (limit last 6 messages)
    const formattedHistory = history.slice(-6).map((item: any) => ({
      role: item.role === 'user' ? 'user' : 'assistant',
      content: String(item.content || ''),
    }));

    const messages = [
      { role: 'system', content: systemPrompt },
      ...formattedHistory,
      { role: 'user', content: userPrompt },
    ];

    let generatedAnswer: string | null = null;
    let modelUsed: string | null = null;

    // Try candidate models in order
    for (const currentModel of modelCandidates) {
      try {
        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openRouterApiKey}`,
            'HTTP-Referer': 'https://varshid-portfolio.vercel.app',
            'X-Title': 'Varshid Shekhat AI Portfolio Assistant',
          },
          body: JSON.stringify({
            model: currentModel,
            messages: messages,
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (openRouterResponse.ok) {
          const data = await openRouterResponse.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            generatedAnswer = content;
            modelUsed = data.model || currentModel;
            break;
          }
        } else {
          const errText = await openRouterResponse.text();
          console.warn(`Model ${currentModel} returned ${openRouterResponse.status}:`, errText);
        }
      } catch (e: any) {
        console.warn(`Model ${currentModel} failed:`, e.message);
      }
    }

    if (!generatedAnswer) {
      // Smart grounded answer synthesis when models are unavailable
      const topChunk = retrievedChunks[0];
      const fallbackAnswer = `**Verified Portfolio Answer:**\n\n${topChunk.content}\n\nFor more information or direct project inquiries, connect on WhatsApp (+91 80008 49533) or email shekhatvarshid5145@gmail.com.`;

      res.status(200).json({
        answer: fallbackAnswer,
        sources: retrievedChunks.map((c) => ({
          title: c.title,
          source: c.source,
          link: c.link,
          linkLabel: c.linkLabel,
        })),
        suggestedQuestions: generateFollowUps(message, retrievedChunks),
        mode: 'rag-synthesized-fallback',
      });
      return;
    }

    res.status(200).json({
      answer: generatedAnswer,
      sources: retrievedChunks.map((c) => ({
        title: c.title,
        source: c.source,
        link: c.link,
        linkLabel: c.linkLabel,
      })),
      suggestedQuestions: generateFollowUps(message, retrievedChunks),
      modelUsed: modelUsed || 'openrouter',
    });
  } catch (err: any) {
    console.error('Error in chat handler:', err);
    res.status(500).json({
      error: 'An unexpected error occurred while processing your request.',
      message: err.message,
    });
  }
}
