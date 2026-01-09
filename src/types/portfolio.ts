export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'tools' | 'languages';
  icon: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo: string;
  email: string;
  location: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navigation: NavigationItem[];
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
}