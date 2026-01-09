import type { StudyTask, StudyRoadmap, StudyProgress } from '../types/study';

export const studyTasks: StudyTask[] = [
  // Frontend Development Tasks
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    description: 'Learn the basic structure and elements of HTML',
    labels: ['Frontend', 'Web Development'],
    difficulty: 'beginner',
    estimatedTime: '2 hours',
    completed: true,
    createdAt: new Date('2024-01-01'),
    resources: [
      { title: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'documentation' },
      { title: 'HTML Crash Course', url: '#', type: 'video' }
    ],
    subtasks: [
      { id: 'html-1', title: 'Learn HTML structure', completed: true },
      { id: 'html-2', title: 'Practice with forms', completed: true },
      { id: 'html-3', title: 'Semantic HTML elements', completed: true }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    description: 'Master CSS styling, layouts, and responsive design',
    labels: ['Frontend', 'Styling'],
    difficulty: 'beginner',
    estimatedTime: '4 hours',
    completed: true,
    createdAt: new Date('2024-01-02'),
    prerequisites: ['html-basics'],
    resources: [
      { title: 'CSS Complete Guide', url: '#', type: 'article' },
      { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', type: 'practice' }
    ],
    subtasks: [
      { id: 'css-1', title: 'CSS Selectors and Properties', completed: true },
      { id: 'css-2', title: 'Flexbox Layout', completed: true },
      { id: 'css-3', title: 'CSS Grid', completed: false }
    ]
  },
  {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    description: 'Learn JavaScript syntax, DOM manipulation, and ES6+ features',
    labels: ['Frontend', 'Programming'],
    difficulty: 'intermediate',
    estimatedTime: '8 hours',
    completed: false,
    createdAt: new Date('2024-01-03'),
    prerequisites: ['html-basics', 'css-basics'],
    resources: [
      { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'documentation' },
      { title: 'JS Algorithms Practice', url: '#', type: 'practice' }
    ],
    subtasks: [
      { id: 'js-1', title: 'Variables and Data Types', completed: true },
      { id: 'js-2', title: 'Functions and Scope', completed: true },
      { id: 'js-3', title: 'DOM Manipulation', completed: false },
      { id: 'js-4', title: 'Async JavaScript', completed: false }
    ]
  },
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    description: 'Build interactive UIs with React components and hooks',
    labels: ['Frontend', 'React', 'Framework'],
    difficulty: 'intermediate',
    estimatedTime: '12 hours',
    completed: false,
    createdAt: new Date('2024-01-04'),
    prerequisites: ['js-basics'],
    resources: [
      { title: 'React Official Docs', url: 'https://react.dev/', type: 'documentation' },
      { title: 'React Tutorial', url: '#', type: 'video' }
    ],
    subtasks: [
      { id: 'react-1', title: 'Components and JSX', completed: false },
      { id: 'react-2', title: 'State and Props', completed: false },
      { id: 'react-3', title: 'Hooks (useState, useEffect)', completed: false },
      { id: 'react-4', title: 'Event Handling', completed: false }
    ]
  },
  
  // Backend Development Tasks
  {
    id: 'node-basics',
    title: 'Node.js Fundamentals',
    description: 'Server-side JavaScript with Node.js and npm',
    labels: ['Backend', 'JavaScript', 'Server'],
    difficulty: 'intermediate',
    estimatedTime: '6 hours',
    completed: false,
    createdAt: new Date('2024-01-05'),
    prerequisites: ['js-basics'],
    resources: [
      { title: 'Node.js Guide', url: 'https://nodejs.org/en/docs/', type: 'documentation' }
    ],
    subtasks: [
      { id: 'node-1', title: 'Node.js Runtime', completed: false },
      { id: 'node-2', title: 'File System Operations', completed: false },
      { id: 'node-3', title: 'HTTP Server', completed: false }
    ]
  },
  {
    id: 'express-basics',
    title: 'Express.js Framework',
    description: 'Build REST APIs with Express.js',
    labels: ['Backend', 'API', 'Framework'],
    difficulty: 'intermediate',
    estimatedTime: '8 hours',
    completed: false,
    createdAt: new Date('2024-01-06'),
    prerequisites: ['node-basics'],
    resources: [
      { title: 'Express.js Guide', url: 'https://expressjs.com/', type: 'documentation' }
    ],
    subtasks: [
      { id: 'express-1', title: 'Express Setup', completed: false },
      { id: 'express-2', title: 'Routing', completed: false },
      { id: 'express-3', title: 'Middleware', completed: false },
      { id: 'express-4', title: 'REST API Design', completed: false }
    ]
  },

  // Database Tasks
  {
    id: 'sql-basics',
    title: 'SQL Fundamentals',
    description: 'Learn database queries and relational database concepts',
    labels: ['Database', 'SQL'],
    difficulty: 'beginner',
    estimatedTime: '6 hours',
    completed: false,
    createdAt: new Date('2024-01-07'),
    resources: [
      { title: 'SQL Tutorial', url: '#', type: 'article' },
      { title: 'SQLBolt Practice', url: 'https://sqlbolt.com/', type: 'practice' }
    ],
    subtasks: [
      { id: 'sql-1', title: 'SELECT Queries', completed: false },
      { id: 'sql-2', title: 'JOINs', completed: false },
      { id: 'sql-3', title: 'Database Design', completed: false }
    ]
  },

  // DevOps Tasks
  {
    id: 'git-basics',
    title: 'Git Version Control',
    description: 'Master Git for version control and collaboration',
    labels: ['DevOps', 'Version Control'],
    difficulty: 'beginner',
    estimatedTime: '3 hours',
    completed: true,
    createdAt: new Date('2024-01-08'),
    resources: [
      { title: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/', type: 'documentation' }
    ],
    subtasks: [
      { id: 'git-1', title: 'Basic Git Commands', completed: true },
      { id: 'git-2', title: 'Branching and Merging', completed: true },
      { id: 'git-3', title: 'GitHub Workflow', completed: true }
    ]
  }
];

export const studyRoadmaps: StudyRoadmap[] = [
  {
    id: 'frontend-roadmap',
    title: 'Frontend Developer',
    description: 'Complete roadmap to become a frontend developer',
    category: 'Frontend',
    totalTasks: 4,
    completedTasks: 2,
    estimatedWeeks: 8,
    difficulty: 'beginner',
    tasks: ['html-basics', 'css-basics', 'js-basics', 'react-basics'],
    color: '#3b82f6'
  },
  {
    id: 'backend-roadmap',
    title: 'Backend Developer',
    description: 'Learn server-side development with Node.js',
    category: 'Backend',
    totalTasks: 2,
    completedTasks: 0,
    estimatedWeeks: 6,
    difficulty: 'intermediate',
    tasks: ['node-basics', 'express-basics'],
    color: '#10b981'
  },
  {
    id: 'fullstack-roadmap',
    title: 'Full Stack Developer',
    description: 'Complete frontend and backend development path',
    category: 'Full Stack',
    totalTasks: 7,
    completedTasks: 3,
    estimatedWeeks: 16,
    difficulty: 'advanced',
    tasks: ['html-basics', 'css-basics', 'js-basics', 'react-basics', 'node-basics', 'express-basics', 'sql-basics'],
    color: '#8b5cf6'
  }
];

export const studyProgress: StudyProgress = {
  totalTasks: studyTasks.length,
  completedTasks: studyTasks.filter(task => task.completed).length,
  inProgressTasks: studyTasks.filter(task => !task.completed && task.subtasks?.some(st => st.completed)).length,
  weeklyGoal: 5,
  currentStreak: 3,
  longestStreak: 7,
  labelsProgress: {
    'Frontend': { completed: 2, total: 4 },
    'Backend': { completed: 0, total: 2 },
    'Database': { completed: 0, total: 1 },
    'DevOps': { completed: 1, total: 1 }
  }
};