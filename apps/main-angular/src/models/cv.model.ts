import { Duration } from './time.model';

export interface CV {
  description: string;
  languages: string[];
  name: string;
  sections: {
    experiences: {
      title: string;
      items: ExperienceItem[];
    };
    skills: {
      title: string;
      items: SkillSection[];
    };
  };
  title: string;
}

export interface SkillSection {
  title: string;
  items: string[] | Array<{ name: string; url: string }>;
}

export interface ExperienceItem {
  company: string;
  current?: boolean;
  dates: {
    end: Date | string;
    start: Date | string;
  };
  description: string;
  duration?: Duration;
  tasks: string[];
  technologies: string[];
  title: string;
}
