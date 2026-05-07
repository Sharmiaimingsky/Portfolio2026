export interface SkillCluster {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#39ff14',
    skills: ['React JS', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Three.js'],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#ff6b00',
    skills: ['Java 8', 'Spring Boot', 'JPA/Hibernate', 'Node.js', 'REST APIs', 'Yang Models'],
  },
  {
    id: 'data',
    label: 'Databases',
    color: '#ffe000',
    skills: ['MySQL', 'PostgreSQL', 'NoSQL', 'MongoDB'],
  },
  {
    id: 'testing',
    label: 'Testing & Quality',
    color: '#00f5d4',
    skills: ['Playwright', 'Jasmine', 'SonarQube', 'Unit Testing', 'E2E Testing', 'Component Testing'],
  },
  {
    id: 'infra',
    label: 'Infrastructure & Tools',
    color: '#ff2d78',
    skills: ['AWS', 'Docker', 'Jenkins', 'Git', 'SVN', 'JIRA', 'GitHub Copilot', 'Python', 'TCP/IP', 'Bash'],
  },
  {
    id: 'ai',
    label: 'AI & Intelligent Systems',
    color: '#ff9f00',
    skills: ['OpenAI API', 'LLM Integration', 'Prompt Engineering', 'AI-Powered UI', 'GitHub Copilot', 'Generative AI', 'RAG Pipelines', 'Supabase AI'],
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Abhishek Fulzele',
    role: 'Software Engineer',
    company: 'Microsoft',
    quote: 'As a self-starter, Sharmistha thrives in fast-paced environments, demonstrating a passion for producing results that contribute to significant outcomes.',
  },
  {
    name: 'Arjun Malu',
    role: 'SDE 2',
    company: 'Juniper Networks',
    quote: 'With her proficiency, dedication, and ability to adapt to new technologies, Sharmistha is a valuable asset to any team or project.',
  },
  {
    name: 'Sushrut Ashtikar',
    role: 'Senior Data Engineer',
    company: 'Travelstride',
    quote: 'Sharmistha was a full stack rockstar on our recent project, seamlessly integrating Three.js, React, Java, Springboot, MySQL, and NoSQL technologies to bring our vision to life.',
  },
  {
    name: 'Akash Deshpande',
    role: 'Project Engineer',
    company: 'CDAC Pune',
    quote: "As a team player, Sharmistha goes beyond expectations, always willing to assist others. Her commitment to impactful work sets her apart, making her an invaluable addition to any team.",
  },
  {
    name: 'Saurabh Mahajan',
    role: 'Software Engineer',
    company: 'NetSPI',
    quote: "Sharmistha's dedication and collaborative nature make her a pleasure to work with, and I'm confident in her ability to excel in any software development role.",
  },
  {
    name: 'Umesh Panigrahi',
    role: 'Software Engineer',
    company: 'Sapiens',
    quote: 'Sharmistha excels in designing scalable web applications, and her commitment to quality is evident in every project. She is not just technically adept but a team player who communicates effectively.',
  },
];
