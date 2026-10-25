import { ExperienceItem, ProjectItem, SkillCategory, AwardItem, EducationItem, StatItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Varshid Shekhat',
  initials: 'VS',
  title: 'Senior React Native Developer & AI Solutions Engineer',
  tagline: 'Architecting high-performance mobile ecosystems, native bridges & intelligent AI workflows.',
  location: 'Ahmedabad, Gujarat, India',
  email: 'shekhatvarshid5145@gmail.com',
  phone: '+91 8000849533',
  linkedin: 'https://linkedin.com/in/varshid-shekhat-1853b2184',
  github: 'https://github.com/varshid-android',
  resumeUrl: '/Varshid_Shekhat_Resume.pdf',
  availability: 'Open for Senior / Lead Roles & High-Impact Contracts',
  summary:
    'Mobile software engineer with 6+ years of specialized experience building high-performance React Native applications for iOS and Android, alongside native Android and Flutter development. Proven expertise leading client projects from proof-of-concept through production app-store launch, encompassing complex API integrations, automated Azure DevOps CI/CD pipelines, and real-time monitoring. Additionally architects robust backend microservices and next-generation AI workflows utilizing Node.js, FastAPI, RAG, and multi-agent systems.',
};

export const STATS: StatItem[] = [
  {
    value: '6+',
    label: 'Years Experience',
    sublabel: 'Mobile & Full-Stack',
  },
  {
    value: '25+',
    label: 'Apps Released',
    sublabel: 'App Store & Google Play',
  },
  {
    value: '99.9%',
    label: 'Crash-Free Rate',
    sublabel: 'Production Telemetry',
  },
  {
    value: '100%',
    label: 'Client Delivery',
    sublabel: 'POC to Global Store',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'mobmaxime',
    role: 'Software Engineer (Mobile) / AI Engineer',
    company: 'MobMaxime',
    parentCompany: 'Eventtan Private Limited',
    period: 'Apr 2023 – Present',
    location: 'Ahmedabad, India',
    current: true,
    description: [
      'Lead client projects from initial architectural proof of concept through rigorous iOS and Android app-store release, primarily engineering with React Native.',
      'Develop scalable cross-platform mobile applications, full-featured ReactJS administrative control panels, and high-throughput Node.js / Python (FastAPI) microservices, including flagship architecture on Invitem.',
      'Build reusable enterprise NPM packages and establish end-to-end Azure DevOps CI/CD release pipelines with automated Firebase Crashlytics and Sentry monitoring.',
      'Design and deploy intelligent AI capabilities leveraging Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Agent-to-Agent (A2A) orchestration, multi-agent systems, n8n workflows, and fine-tuned LLMs.',
    ],
    techStack: [
      'React Native',
      'ReactJS',
      'TypeScript',
      'FastAPI',
      'Node.js',
      'Azure DevOps',
      'RAG / MCP / A2A',
      'Firebase',
      'Sentry',
      'SonarQube',
    ],
  },
  {
    id: 'innvonix',
    role: 'React Native Developer',
    company: 'Innvonix Technologies LLP',
    period: 'Jan 2022 – Apr 2023',
    location: 'Ahmedabad, India',
    current: false,
    description: [
      'Architected and delivered cross-platform iOS and Android mobile solutions utilizing React Native, Redux state management, and optimized RESTful APIs.',
      'Integrated Firebase cloud infrastructure including push messaging, authentication, dynamic deep linking, and real-time database syncing.',
      'Collaborated closely with cross-functional UI/UX designers and backend engineers to maintain 60fps native-feeling animations and responsiveness.',
    ],
    techStack: [
      'React Native',
      'Redux',
      'REST APIs',
      'Firebase',
      'JavaScript',
      'iOS',
      'Android',
    ],
  },
  {
    id: 'fancom',
    role: 'React Native & Android Developer',
    company: 'Fancom and Binary Geckos',
    period: 'Jul 2020 – Dec 2021',
    location: 'Rajkot, India',
    current: false,
    description: [
      'Engineered React Native and native Android applications with resilient REST API integrations and robust local data caching using SQLite.',
      'Built native Android modules in Java to bridge platform-specific hardware capabilities (camera, GPS, background sync) to React Native components.',
      'Enhanced app load performance and reduced bundle sizes across legacy and modern mobile devices.',
    ],
    techStack: [
      'React Native',
      'Native Android',
      'Java',
      'SQLite',
      'REST APIs',
      'Git',
    ],
  },
  {
    id: 'apgroups',
    role: 'Junior Android Developer',
    company: 'AP Groups',
    period: 'Jan 2020 – Jul 2020',
    location: 'Ahmedabad, India',
    current: false,
    description: [
      'Supported native Android mobile application development, bug fixing, feature enhancements, and updates.',
      'Implemented UI components following Google Material Design guidelines and integrated RESTful endpoints.',
      'Conducted local unit testing and contributed to version control workflows in team Git repositories.',
    ],
    techStack: [
      'Android SDK',
      'Java',
      'XML Layouts',
      'Git',
      'Android Studio',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'invitem',
    title: 'Invitem — Event Management & RSVP Platform',
    role: 'Project Lead',
    tagline: 'Enterprise-grade event invitation platform with real-time RSVPs, dynamic guest management, and chat.',
    category: 'Full-Stack',
    badge: 'Flagship Platform',
    description:
      'Engineered an event orchestration and social RSVP platform from concept to launch. Led mobile app development in React Native while concurrently architecting a comprehensive administrative portal in ReactJS and integrating real-time chat, payments, and location services.',
    highlights: [
      'Built real-time invitation RSVP engine with customizable dynamic guest list tiers and instant push alerts.',
      'Integrated Firebase Cloud Messaging (FCM) for low-latency notifications and Stripe for secure event ticketing/transactions.',
      'Implemented persistent real-time chat and presence tracking using SignalR websockets.',
      'Integrated Google Places API for smart venue autocompletion and interactive mapping.',
      'Maintained enterprise code health via SonarQube static code analysis and automated release testing.',
    ],
    techStack: [
      'React Native',
      'ReactJS',
      'SignalR',
      'Firebase Cloud Messaging',
      'Stripe',
      'Google Places API',
      'SonarQube',
      'TypeScript',
    ],
    metrics: ['50k+ Event Invites Processed', 'Sub-100ms SignalR Chat Latency', 'SonarQube Grade A Quality'],
  },
  {
    id: 'healthcare-platform',
    title: 'Healthcare Staffing & Shift Management Platform',
    role: 'Project Lead',
    tagline: 'Mission-critical healthcare workforce application with geofenced attendance, credentialing, and timesheets.',
    category: 'Mobile',
    badge: 'Enterprise Healthcare',
    description:
      'Engineered a compliance-critical healthcare staffing solution empowering nurses and medical providers to pick up shifts, clock in with geofencing validation, manage credentials, and sign binding agreements on-device.',
    highlights: [
      'Developed real-time shift scheduling calendar with instant vacancy broadcasts and shift acceptance.',
      'Implemented high-precision geofenced attendance verification preventing unauthorized clock-in/out.',
      'Built embedded PDF document viewer and biometric-ready digital signature capture for legal timesheet validation.',
      'Integrated SignalR real-time messaging for emergency nurse-supervisor communication and crisis alerts.',
      'Engineered automated Azure DevOps CI/CD pipelines enabling zero-downtime continuous builds and automated testing.',
    ],
    techStack: [
      'React Native',
      'SignalR',
      'Azure DevOps CI/CD',
      'Firebase',
      'PDF Signing Engine',
      'Geofencing API',
      'Zustand',
      'TypeScript',
    ],
    metrics: ['10,000+ Verified Clock-ins', '100% Geofence Accuracy', 'Automated CI/CD Builds'],
  },
  {
    id: 'ai-orchestrator',
    title: 'Agentic AI Workflow & Multi-Agent Orchestrator',
    role: 'AI / Backend Engineer',
    tagline: 'Autonomous multi-agent system powered by FastAPI, Model Context Protocol (MCP), and RAG.',
    category: 'AI & Automation',
    badge: 'AI & Next-Gen',
    description:
      'Designed and engineered an automated multi-agent framework capable of executing complex multi-step technical and operational workflows using n8n toolchains, FastAPI microservices, and localized domain knowledge retrieval.',
    highlights: [
      'Implemented Model Context Protocol (MCP) tool integration connecting disparate enterprise APIs into LLM reasoning loops.',
      'Built Retrieval-Augmented Generation (RAG) vector pipelines delivering accurate, grounded context with low latency.',
      'Orchestrated Agent-to-Agent (A2A) autonomous coordination patterns with automated fallback heuristics.',
      'Connected n8n workflow triggers with high-speed Python FastAPI asynchronous microservice endpoints.',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'RAG',
      'MCP',
      'A2A Multi-Agent',
      'n8n',
      'Node.js',
      'Vector Embeddings',
    ],
    metrics: ['10x Workflow Acceleration', 'Sub-second Retrieval', 'Multi-agent Autonomous Loops'],
  },
  {
    id: 'npm-enterprise-modules',
    title: 'Enterprise Cross-Platform NPM UI Kit & SDKs',
    role: 'Lead Architect',
    tagline: 'Modular TypeScript NPM package ecosystem standardizing design tokens, telemetry, and native bridges.',
    category: 'DevOps & Tooling',
    badge: 'Open Ecosystem',
    description:
      'Authored and maintained internal NPM packages used across dozens of client mobile repositories, enforcing unified design tokens, automated crash reporting hooks, and standardized networking clients.',
    highlights: [
      'Unified Firebase Crashlytics & Sentry distributed telemetry wrappers into a single plug-and-play hook.',
      'Exported strictly-typed TypeScript declarations, custom theme builders, and high-performance list primitives.',
      'Implemented automated version bumping, semantic releases, and unit testing via Azure DevOps pipelines.',
    ],
    techStack: [
      'TypeScript',
      'React Native',
      'NPM Package Architecture',
      'Azure DevOps',
      'Sentry',
      'Firebase Crashlytics',
    ],
    metrics: ['Used across 15+ Apps', 'Zero-config Telemetry', 'Strict Semantic Versioning'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Mobile & Web Architecture',
    description: 'Specialized in cross-platform mobile mastery, native bridge modules, and modern responsive web systems.',
    iconName: 'Smartphone',
    skills: [
      { name: 'React Native', level: 96, highlight: true },
      { name: 'Native Android (Java/Kotlin)', level: 88, highlight: true },
      { name: 'Native iOS Bridges', level: 82 },
      { name: 'Flutter', level: 80 },
      { name: 'ReactJS', level: 90, highlight: true },
    ],
  },
  {
    title: 'Languages & State Mastery',
    description: 'Writing type-safe, maintainable, and predictable state architectures with modern paradigms.',
    iconName: 'Code2',
    skills: [
      { name: 'TypeScript', level: 95, highlight: true },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'Python', level: 85, highlight: true },
      { name: 'Java', level: 82 },
      { name: 'Dart', level: 78 },
      { name: 'Zustand & Redux', level: 92, highlight: true },
    ],
  },
  {
    title: 'APIs, Real-Time & Backend',
    description: 'Engineering resilient microservices, low-latency websockets, and scalable cloud databases.',
    iconName: 'Server',
    skills: [
      { name: 'REST & GraphQL APIs', level: 94, highlight: true },
      { name: 'Node.js', level: 88 },
      { name: 'FastAPI (Python)', level: 86, highlight: true },
      { name: 'SignalR Real-Time Sockets', level: 90, highlight: true },
      { name: 'Firebase & FCM', level: 95, highlight: true },
      { name: 'Stripe Payments', level: 88 },
      { name: 'Google Maps & Places API', level: 90 },
      { name: 'SQLite & Vector DBs', level: 85 },
    ],
  },
  {
    title: 'DevOps, CI/CD & Production Quality',
    description: 'Ensuring zero-downtime releases, automated app-store deployments, and proactive error telemetry.',
    iconName: 'Workflow',
    skills: [
      { name: 'Azure DevOps CI/CD', level: 90, highlight: true },
      { name: 'Git & Trunk-Based Dev', level: 94 },
      { name: 'NPM Package Publishing', level: 88 },
      { name: 'Firebase Crashlytics', level: 92 },
      { name: 'Sentry Telemetry', level: 90, highlight: true },
      { name: 'SonarQube Code Quality', level: 86 },
      { name: 'Jira & Agile Workflows', level: 90 },
    ],
  },
  {
    title: 'AI, Agents & Automation',
    description: 'Leveraging frontier AI, tool-use protocols, and multi-agent coordination systems.',
    iconName: 'Cpu',
    skills: [
      { name: 'Retrieval-Augmented Generation (RAG)', level: 90, highlight: true },
      { name: 'Model Context Protocol (MCP)', level: 88, highlight: true },
      { name: 'Agent-to-Agent (A2A) Systems', level: 85, highlight: true },
      { name: 'Multi-Agent Workflows', level: 88 },
      { name: 'n8n Automation Toolchains', level: 90 },
      { name: 'LLM Fine-Tuning & Prompting', level: 84 },
      { name: 'Lovable & Rapid Prototyping', level: 88 },
    ],
  },
];

export const AWARDS: AwardItem[] = [
  {
    id: 'team-player',
    title: 'Best Team Player Award',
    issuer: 'MobMaxime Quarterly Excellence Awards',
    date: 'Q2 2026 (April – June 2026)',
    description:
      'Recognized for exceptional cross-team technical leadership, mentoring junior mobile engineers, and accelerating delivery velocity on mission-critical client releases.',
    badgeText: 'Quarterly Excellence',
    iconName: 'Award',
  },
  {
    id: 'ai-speaker',
    title: 'AI Session Speaker Certificate',
    issuer: 'MobMaxime Technical Forum',
    date: '2026',
    description:
      'Honored and awarded certification for preparing and presenting an in-depth technical keynote on modern AI-driven architecture, multi-agent pipelines, and practical developer workflows.',
    badgeText: 'Keynote Speaker',
    iconName: 'Sparkles',
  },
];

export const EDUCATION: EducationItem = {
  degree: 'Bachelor of Computer Engineering',
  institution: 'RK University',
  year: '2020',
  location: 'Rajkot, Gujarat, India',
  field: 'Computer Engineering & Software Systems',
};
