export interface StudyTask {
  id: string;
  title: string;
  description: string;
  labels: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  completed: boolean;
  prerequisites?: string[];
  resources?: StudyResource[];
  subtasks?: StudySubtask[];
  createdAt: Date;
}

export interface StudySubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface StudyResource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'documentation' | 'practice';
}

export interface StudyRoadmap {
  id: string;
  title: string;
  description: string;
  category: string;
  totalTasks: number;
  completedTasks: number;
  estimatedWeeks: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tasks: string[]; // Task IDs
  color: string;
}

export interface StudyProgress {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
  labelsProgress: { [label: string]: { completed: number; total: number } };
}