export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  parentCompany?: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  current?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  tagline: string;
  category: 'Mobile' | 'Full-Stack' | 'AI & Automation' | 'DevOps & Tooling';
  description: string;
  highlights: string[];
  techStack: string[];
  metrics?: string[];
  badge?: string;
  demoUrl?: string;
  githubUrl?: string;
  externalLinks?: {
    label: string;
    url: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100
    highlight?: boolean;
  }[];
}

export interface AwardImage {
  url: string;
  caption: string;
  label: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badgeText: string;
  iconName: string;
  project?: string;
  link?: string;
  linkLabel?: string;
  images?: AwardImage[];
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  location: string;
  field: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}
