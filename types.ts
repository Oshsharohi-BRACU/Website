export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface SubTeam {
  id: string;
  name: string;
  icon: string;
  description: string;
  goals: string[];
  achievements: string[];
  members: TeamMember[];
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AppState {
  INTRO = 'intro',
  MAIN = 'main',
}