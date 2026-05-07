export interface ArchNode {
  id: string;
  label: string;
  type: 'frontend' | 'ai' | 'backend' | 'infra' | 'data';
  x: number;
  y: number;
  description: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  challenges: string[];
  nodes: ArchNode[];
  edges: ArchEdge[];
  image: string;
  github?: string;
  githubBackend?: string;
  githubFrontend?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: 'weathernow',
    title: 'WeatherNow',
    tagline: 'AI-powered weather app with dynamic themes and poem generation',
    description:
      'Web-based platform that allows users to search for climate of 2 lakh cities worldwide. Changes the background dynamically according to the weather and AI generates poems according to location and weather.',
    year: '2024',
    stack: ['React', 'OpenWeatherAPI', 'Tailwind CSS', 'AI Integration'],
    metrics: [
      { label: 'Cities Covered', value: '200k+' },
      { label: 'Dynamic Themes', value: '12+' },
      { label: 'Response Time', value: '<300ms' },
      { label: 'AI Poems', value: 'Live' },
    ],
    challenges: [
      'Dynamic background transitions based on live weather state',
      'Integrating AI poem generation contextual to location and weather',
      'Handling 200k+ city lookups with fast API responses',
    ],
    nodes: [
      { id: 'ui', label: 'React UI', type: 'frontend', x: 50, y: 15, description: 'Dynamic weather interface with live theme switching' },
      { id: 'ai', label: 'AI Engine', type: 'ai', x: 80, y: 45, description: 'Generates contextual poems based on weather + location' },
      { id: 'weather', label: 'OpenWeather API', type: 'data', x: 20, y: 45, description: 'Real-time meteorological data for 200k+ cities' },
      { id: 'cache', label: 'Browser Cache', type: 'infra', x: 20, y: 75, description: 'Local caching of recent city lookups' },
      { id: 'theme', label: 'Theme Engine', type: 'frontend', x: 80, y: 75, description: 'Dynamic background and color system driven by weather state' },
    ],
    edges: [
      { from: 'ui', to: 'weather', label: 'city query' },
      { from: 'ui', to: 'ai', label: 'generate poem' },
      { from: 'weather', to: 'cache' },
      { from: 'weather', to: 'theme', label: 'weather state' },
      { from: 'ai', to: 'theme' },
    ],
    image: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1200',
    github: 'https://github.com/Sharmiaimingsky/WeatherNow',
    live: 'https://weathernowreport.netlify.app/',
  },
  {
    id: 'event-management',
    title: 'Event Management System',
    tagline: 'Full-stack platform with role-based auth for users, admins, and vendors',
    description:
      'Responsive Event Management website where users and admins can login and vendors who provide services can login using phone number. Built with a Java Spring Boot backend, MySQL database, and ReactJS frontend.',
    year: '2023',
    stack: ['Spring Boot', 'MySQL', 'React JS', 'REST API', 'JWT Auth'],
    metrics: [
      { label: 'User Roles', value: '3' },
      { label: 'Auth Methods', value: '2' },
      { label: 'API Endpoints', value: '40+' },
      { label: 'DB Tables', value: '15+' },
    ],
    challenges: [
      'Multi-role auth system (user, admin, vendor) with phone OTP',
      'Complex relational data model for events, vendors, and bookings',
      'Responsive cross-device design with dynamic vendor listings',
    ],
    nodes: [
      { id: 'ui', label: 'React UI', type: 'frontend', x: 50, y: 12, description: 'Responsive event browsing and booking interface' },
      { id: 'api', label: 'Spring Boot API', type: 'backend', x: 50, y: 42, description: 'RESTful backend with JWT auth and business logic' },
      { id: 'auth', label: 'Auth Service', type: 'backend', x: 15, y: 65, description: 'Multi-role authentication: email + phone OTP' },
      { id: 'db', label: 'MySQL', type: 'data', x: 85, y: 65, description: 'Relational data for users, events, vendors, bookings' },
      { id: 'vendor', label: 'Vendor Module', type: 'backend', x: 50, y: 82, description: 'Vendor onboarding, listings, and service management' },
    ],
    edges: [
      { from: 'ui', to: 'api' },
      { from: 'api', to: 'auth', label: 'JWT' },
      { from: 'api', to: 'db', label: 'queries' },
      { from: 'api', to: 'vendor' },
      { from: 'auth', to: 'db' },
    ],
    image: 'https://images.pexels.com/photos/15362123/pexels-photo-15362123.jpeg?auto=compress&cs=tinysrgb&w=1200',
    github: 'https://github.com/Sharmiaimingsky/Event-Management-System',
  },
  {
    id: 'tetrify',
    title: 'Tetrify',
    tagline: 'A responsive, animated Tetris game built with ReactJS',
    description:
      'Tetris game written in HTML5 + CSS3 + jQuery + ReactJS. This WebApp is a Responsive Web Design (RWD) website with smooth animations and intuitive controls.',
    year: '2023',
    stack: ['React JS', 'jQuery', 'HTML5', 'CSS3'],
    metrics: [
      { label: 'FPS', value: '60' },
      { label: 'Responsive', value: 'RWD' },
      { label: 'Game States', value: '5+' },
      { label: 'Score Levels', value: '10+' },
    ],
    challenges: [
      'Smooth 60fps game loop using React state without re-render lag',
      'Responsive layout adapting to mobile and desktop viewports',
      'Collision detection and line-clearing logic in pure JS',
    ],
    nodes: [
      { id: 'ui', label: 'React UI', type: 'frontend', x: 50, y: 15, description: 'Tetris board rendering and game state display' },
      { id: 'loop', label: 'Game Loop', type: 'backend', x: 25, y: 50, description: 'requestAnimationFrame-based game tick at 60fps' },
      { id: 'state', label: 'Game State', type: 'backend', x: 75, y: 50, description: 'Board matrix, active piece, score management' },
      { id: 'input', label: 'Input Handler', type: 'frontend', x: 25, y: 80, description: 'Keyboard and touch controls' },
      { id: 'score', label: 'Score Engine', type: 'data', x: 75, y: 80, description: 'Level progression and high score tracking' },
    ],
    edges: [
      { from: 'ui', to: 'loop' },
      { from: 'loop', to: 'state', label: 'tick' },
      { from: 'input', to: 'state' },
      { from: 'state', to: 'score' },
      { from: 'state', to: 'ui', label: 'render' },
    ],
    image: 'https://images.pexels.com/photos/36484265/pexels-photo-36484265.jpeg?auto=compress&cs=tinysrgb&w=1200',
    github: 'https://github.com/Sharmiaimingsky/tetris',
    live: 'https://tetrify.netlify.app/',
  },
  {
    id: 'snake-mania',
    title: 'Snake Mania',
    tagline: 'Interactive Nokia-style snake game with smooth web animations',
    description:
      'Snake Mania is an interactive Snake Game project incorporating smooth animations and user-friendly features to simulate a Nokia snake game on a web page.',
    year: '2022',
    stack: ['React JS', 'HTML5', 'CSS3', 'Canvas API'],
    metrics: [
      { label: 'Animations', value: 'Smooth' },
      { label: 'Controls', value: 'Keys+Touch' },
      { label: 'Speed Levels', value: '5' },
      { label: 'High Score', value: 'Persistent' },
    ],
    challenges: [
      'Canvas-based rendering with collision and boundary detection',
      'Smooth directional movement without input lag',
      'LocalStorage high score persistence across sessions',
    ],
    nodes: [
      { id: 'canvas', label: 'Canvas', type: 'frontend', x: 50, y: 15, description: 'HTML5 Canvas for game rendering' },
      { id: 'loop', label: 'Game Loop', type: 'backend', x: 25, y: 50, description: 'Interval-based movement and rendering engine' },
      { id: 'physics', label: 'Collision', type: 'backend', x: 75, y: 50, description: 'Wall and self-collision detection logic' },
      { id: 'input', label: 'Controls', type: 'frontend', x: 25, y: 80, description: 'Keyboard arrow + WASD + touch swipe support' },
      { id: 'storage', label: 'LocalStorage', type: 'data', x: 75, y: 80, description: 'High score persistence' },
    ],
    edges: [
      { from: 'canvas', to: 'loop' },
      { from: 'loop', to: 'physics' },
      { from: 'input', to: 'loop' },
      { from: 'physics', to: 'storage', label: 'game over' },
      { from: 'loop', to: 'canvas', label: 'draw' },
    ],
    image: 'https://images.pexels.com/photos/19335258/pexels-photo-19335258.jpeg?auto=compress&cs=tinysrgb&w=1200',
    github: 'https://github.com/Sharmiaimingsky/SnakeMania',
    live: 'https://nokiasnakemania.netlify.app/',
  },
  {
    id: 'global-education',
    title: 'Global Education Portal',
    tagline: 'Guided workflows for international students navigating global universities',
    description:
      'Built a global education platform with guided workflows for international students. The portal helps students explore universities, understand admission requirements, and navigate the complexities of studying abroad.',
    year: '2024',
    stack: ['React JS', 'CSS', 'REST APIs'],
    metrics: [
      { label: 'Workflow Steps', value: 'Guided' },
      { label: 'Target Users', value: 'Intl. Students' },
      { label: 'Platform', value: 'Web' },
      { label: 'Deployment', value: 'Netlify' },
    ],
    challenges: [
      'Designing intuitive multi-step guided workflows for complex visa and admission processes',
      'Presenting structured international university data in a digestible UI',
      'Ensuring accessibility and clarity for non-native English speakers',
    ],
    nodes: [
      { id: 'ui', label: 'React UI', type: 'frontend', x: 50, y: 12, description: 'Guided workflow interface for international students' },
      { id: 'workflows', label: 'Workflow Engine', type: 'frontend', x: 20, y: 42, description: 'Multi-step guided process management' },
      { id: 'api', label: 'REST APIs', type: 'backend', x: 80, y: 42, description: 'University and program data endpoints' },
      { id: 'content', label: 'Content Layer', type: 'data', x: 20, y: 75, description: 'University listings, requirements, and guides' },
      { id: 'deploy', label: 'Netlify', type: 'infra', x: 80, y: 75, description: 'CI/CD deployment and hosting' },
    ],
    edges: [
      { from: 'ui', to: 'workflows' },
      { from: 'ui', to: 'api', label: 'fetch data' },
      { from: 'api', to: 'content' },
      { from: 'workflows', to: 'content' },
      { from: 'ui', to: 'deploy' },
    ],
    image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200',
    live: 'https://69baee3219869e0008b53930--uni-app-dev.netlify.app',
  },
  {
    id: 'wallet-manager',
    title: 'Wallet Manager',
    tagline: 'Full-stack online wallet to track debit and credit transactions',
    description:
      'Online wallet manager to maintain debit and credit transactions. Backend hosted on AWS EC2, frontend on Netlify, and MongoDB Atlas for the database — a fully cloud-deployed full-stack application.',
    year: '2023',
    stack: ['Node.js', 'MongoDB', 'Next.js', 'AWS EC2', 'Netlify', 'Atlas'],
    metrics: [
      { label: 'Deployment', value: 'AWS EC2' },
      { label: 'Database', value: 'Atlas' },
      { label: 'Frontend', value: 'Netlify' },
      { label: 'Stack', value: 'MERN' },
    ],
    challenges: [
      'Deploying a decoupled Node.js backend to AWS EC2 with HTTPS and CORS',
      'Connecting MongoDB Atlas in a secure, production-grade cloud setup',
      'Real-time balance updates and transaction history with Next.js SSR',
    ],
    nodes: [
      { id: 'ui', label: 'Next.js UI', type: 'frontend', x: 50, y: 10, description: 'SSR-powered transaction dashboard on Netlify' },
      { id: 'api', label: 'Node.js API', type: 'backend', x: 50, y: 40, description: 'REST API running on AWS EC2' },
      { id: 'auth', label: 'Auth', type: 'backend', x: 15, y: 62, description: 'User authentication and session management' },
      { id: 'db', label: 'MongoDB Atlas', type: 'data', x: 85, y: 62, description: 'Cloud-hosted NoSQL transaction store' },
      { id: 'ec2', label: 'AWS EC2', type: 'infra', x: 30, y: 85, description: 'Backend compute hosting' },
      { id: 'netlify', label: 'Netlify', type: 'infra', x: 70, y: 85, description: 'Frontend CDN and deployment' },
    ],
    edges: [
      { from: 'ui', to: 'api', label: 'REST' },
      { from: 'api', to: 'auth' },
      { from: 'api', to: 'db', label: 'queries' },
      { from: 'api', to: 'ec2' },
      { from: 'ui', to: 'netlify' },
    ],
    image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1200',
    githubBackend: 'https://github.com/Sharmiaimingsky/wallet-backend',
    githubFrontend: 'https://github.com/Sharmiaimingsky/Wallet_frontend',
    live: 'https://sharmiwallet.netlify.app/',
  },
];
