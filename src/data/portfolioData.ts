import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Alex Johnson',
    title: 'Frontend Developer',
    tagline: 'Crafting beautiful, responsive web experiences with modern technologies',
    bio: 'I\'m a passionate frontend developer with 3+ years of experience building modern web applications. I specialize in React, TypeScript, and creating intuitive user interfaces that deliver exceptional user experiences. When I\'m not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying a good cup of coffee.',
    photo: '/images/profile.jpg',
    email: 'alex.johnson@email.com',
    location: 'San Francisco, CA'
  },
  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ],
  skills: [
    // Frontend Technologies
    { name: 'React', category: 'frontend', icon: 'FaReact', proficiency: 'advanced' },
    { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript', proficiency: 'advanced' },
    { name: 'JavaScript', category: 'frontend', icon: 'FaJs', proficiency: 'advanced' },
    { name: 'HTML5', category: 'frontend', icon: 'FaHtml5', proficiency: 'advanced' },
    { name: 'CSS3', category: 'frontend', icon: 'FaCss3Alt', proficiency: 'advanced' },
    { name: 'Sass', category: 'frontend', icon: 'FaSass', proficiency: 'intermediate' },
    { name: 'Tailwind CSS', category: 'frontend', icon: 'SiTailwindcss', proficiency: 'advanced' },
    { name: 'Next.js', category: 'frontend', icon: 'SiNextdotjs', proficiency: 'intermediate' },
    { name: 'Vue.js', category: 'frontend', icon: 'FaVuejs', proficiency: 'intermediate' },
    
    // Tools & Technologies
    { name: 'Git', category: 'tools', icon: 'FaGitAlt', proficiency: 'advanced' },
    { name: 'Webpack', category: 'tools', icon: 'SiWebpack', proficiency: 'intermediate' },
    { name: 'Vite', category: 'tools', icon: 'SiVite', proficiency: 'advanced' },
    { name: 'ESLint', category: 'tools', icon: 'SiEslint', proficiency: 'intermediate' },
    { name: 'Prettier', category: 'tools', icon: 'SiPrettier', proficiency: 'intermediate' },
    { name: 'Jest', category: 'tools', icon: 'SiJest', proficiency: 'intermediate' },
    { name: 'Cypress', category: 'tools', icon: 'SiCypress', proficiency: 'intermediate' },
    { name: 'Figma', category: 'tools', icon: 'FaFigma', proficiency: 'intermediate' },
    
    // Languages & Backend
    { name: 'Node.js', category: 'languages', icon: 'FaNodeJs', proficiency: 'intermediate' },
    { name: 'Python', category: 'languages', icon: 'FaPython', proficiency: 'beginner' },
    { name: 'GraphQL', category: 'languages', icon: 'SiGraphql', proficiency: 'intermediate' },
    { name: 'REST APIs', category: 'languages', icon: 'FaServer', proficiency: 'advanced' }
  ],
  projects: [
    {
      id: '1',
      title: 'Study Roadmap Tracker',
      description: 'Comprehensive study tracking application with roadmaps, progress visualization, and task management for structured learning.',
      image: '/images/projects/study-tracker.jpg',
      technologies: ['React', 'TypeScript', 'CSS3', 'Local Storage'],
      liveUrl: '/study',
      githubUrl: 'https://github.com/alexjohnson/study-tracker',
      featured: true
    },
    {
      id: '2',
      title: 'Sudoku Game',
      description: 'Interactive Sudoku puzzle game with multiple difficulty levels, hint system, timer, and grid validation for an engaging puzzle experience.',
      image: '/images/projects/sudoku.jpg',
      technologies: ['React', 'TypeScript', 'CSS3', 'Game Logic'],
      liveUrl: '/sudoku',
      githubUrl: 'https://github.com/alexjohnson/sudoku-game',
      featured: true
    },
    {
      id: '3',
      title: 'Crossword Puzzle',
      description: 'Classic crossword puzzle game with interactive grid, clue system, keyboard navigation, and completion tracking for word puzzle enthusiasts.',
      image: '/images/projects/crossword.jpg',
      technologies: ['React', 'TypeScript', 'CSS3', 'Game Logic'],
      liveUrl: '/crossword',
      githubUrl: 'https://github.com/alexjohnson/crossword-puzzle',
      featured: true
    },
    {
      id: '4',
      title: 'Tic-Tac-Toe Game',
      description: 'Interactive Tic-Tac-Toe game built with React and TypeScript featuring score tracking, winning animations, and responsive design.',
      image: '/images/projects/tic-tac-toe.jpg',
      technologies: ['React', 'TypeScript', 'CSS3', 'Game Logic'],
      liveUrl: '/tic-tac-toe',
      githubUrl: 'https://github.com/alexjohnson/tic-tac-toe',
      featured: true
    },
    {
      id: '5',
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive admin dashboard for managing e-commerce operations with real-time analytics, inventory management, and order processing.',
      image: '/images/projects/ecommerce-dashboard.jpg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'REST API'],
      liveUrl: 'https://ecommerce-dashboard-demo.com',
      githubUrl: 'https://github.com/alexjohnson/ecommerce-dashboard',
      featured: true
    },
    {
      id: '6',
      title: 'Task Management App',
      description: 'A collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
      image: '/images/projects/task-manager.jpg',
      technologies: ['React', 'Redux', 'Node.js', 'Socket.io', 'MongoDB'],
      liveUrl: 'https://taskmanager-app-demo.com',
      githubUrl: 'https://github.com/alexjohnson/task-manager',
      featured: true
    },
    {
      id: '7',
      title: 'Weather Forecast App',
      description: 'A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: '/images/projects/weather-app.jpg',
      technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Weather API', 'Mapbox'],
      liveUrl: 'https://weather-forecast-demo.com',
      githubUrl: 'https://github.com/alexjohnson/weather-app',
      featured: false
    },
    {
      id: '8',
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and optimized performance.',
      image: '/images/projects/portfolio.jpg',
      technologies: ['React', 'TypeScript', 'CSS Modules', 'Vite'],
      liveUrl: 'https://alexjohnson-portfolio.com',
      githubUrl: 'https://github.com/alexjohnson/portfolio',
      featured: false
    },
    {
      id: '9',
      title: 'Recipe Finder',
      description: 'A recipe discovery application with advanced search filters, meal planning features, and nutritional information.',
      image: '/images/projects/recipe-finder.jpg',
      technologies: ['Next.js', 'TypeScript', 'Styled Components', 'Recipe API'],
      liveUrl: 'https://recipe-finder-demo.com',
      githubUrl: 'https://github.com/alexjohnson/recipe-finder',
      featured: false
    },
    {
      id: '10',
      title: 'Expense Tracker',
      description: 'A personal finance management app with budget tracking, expense categorization, and financial insights visualization.',
      image: '/images/projects/expense-tracker.jpg',
      technologies: ['React', 'JavaScript', 'Chart.js', 'Local Storage'],
      liveUrl: 'https://expense-tracker-demo.com',
      githubUrl: 'https://github.com/alexjohnson/expense-tracker',
      featured: false
    }
  ],
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/alexjohnson',
      icon: 'FaGithub'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/alexjohnson-dev',
      icon: 'FaLinkedin'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/alexjohnson_dev',
      icon: 'FaTwitter'
    },
    {
      platform: 'Email',
      url: 'mailto:alex.johnson@email.com',
      icon: 'FaEnvelope'
    }
  ]
};