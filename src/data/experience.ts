export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    id: 'ebay',
    company: 'eBay Inc.',
    role: 'UI Developer',
    period: 'Dec 2025 — Present',
    location: 'Bangalore, India',
    description:
      'Developing scalable React-based UI components for the Genie SEO Tool, improving enterprise search optimization workflows at eBay scale.',
    achievements: [
      'Developed scalable React-based UI components for the Genie SEO Tool, improving enterprise search optimization workflow',
      'Engineered intuitive and responsive UI/UX, enhancing user engagement and operational efficiency',
      'Implemented and maintained CI/CD pipelines with cloud deployments, ensuring reliable and faster releases',
      'Collaborated with cross-functional teams in an Agile environment to deliver high-impact features at scale',
    ],
    stack: ['React JS', 'CI/CD', 'Cloud Deployments', 'Agile'],
  },
  {
    id: 'precisely',
    company: 'Precisely S&D',
    role: 'UI Developer',
    period: 'Mar 2024 — Nov 2025',
    location: 'Remote',
    description:
      'Contributing to front-end development for the Data Integrity Suite, building features for Fortune 100 clients with a focus on quality, testing, and AI-assisted development.',
    achievements: [
      'Received Precisely\'s February 2025 Round of Applause Award for leading a successful high-stakes reverse sync data replication deployment for Carrefour under tight deadlines',
      'Contributed to front-end development using Angular, Tailwind CSS, and Next.js alongside Playwright, Jasmine, Git, JIRA, and SonarQube',
      'Accountable for feature development for Fortune 100 clients — unit testing, component testing, E2E testing, and adhering to a rigorous design system',
      'Utilized advanced prompt engineering techniques with GitHub Copilot to accelerate development and streamline bug resolution',
      'Demonstrated sprint-wise progress in company-wide bi-weekly presentations showcasing development milestones',
    ],
    stack: ['Angular', 'Next.js', 'Tailwind CSS', 'Playwright', 'Jasmine', 'SonarQube', 'GitHub Copilot'],
  },
  {
    id: 'juniper',
    company: 'Juniper Networks',
    role: 'Software Developer 1',
    period: 'May 2022 — Dec 2023',
    location: 'Bengaluru, India',
    description:
      'Responsible for architecture, design, and solution implementation for Device Management and Workflow Automation software on Junos across SRX, NFX, and MX series hardware.',
    achievements: [
      'Architected and implemented front-end and back-end for the GNATS internal website — including a white-list feature for SRX1500, SRX4100, SRX4200, SRX5400, SRX5600, SRX5800, and vSRX devices',
      'Built with Java 8, Spring Boot, JPA/Hibernate, ReactJS, TailwindCSS, and PostgreSQL',
      'Defined solutions for the entire Junos product range across multiple market segments using Yang Models',
      'Provided extensive software support for SRX, NFX, and MX series with deep TCP/IP protocol knowledge',
      'Proficient in Python, bash scripting, SVN, Git, and command-line interfaces for ensuring functionality, stability, and security of Junos software',
    ],
    stack: ['Java 8', 'Spring Boot', 'JPA/Hibernate', 'React JS', 'Tailwind CSS', 'PostgreSQL', 'Python', 'TCP/IP', 'Yang Models'],
  },
  {
    id: 'aecom',
    company: 'Aecom',
    role: 'Engineer',
    period: 'Sept 2020 — July 2021',
    location: 'India',
    description:
      'Developed and maintained web applications, collaborating with cross-functional teams to deliver high-quality, responsive products.',
    achievements: [
      'Developed and maintained web applications using Spring Boot and React.js',
      'Collaborated with cross-functional teams including designers, product managers, and developers to create high-quality products',
      'Implemented responsive design and ensured cross-browser compatibility',
      'Participated in code reviews and provided constructive feedback to team members',
    ],
    stack: ['Spring Boot', 'React JS', 'HTML', 'CSS', 'JavaScript'],
  },
];

export const education: Education[] = [
  {
    id: 'cdac',
    institution: 'CDAC-Sunbeam Pune',
    degree: 'PGDAC',
    period: 'Aug 2021 — Apr 2022',
    points: ['Hands-on experience with Java 8, Spring Boot, ReactJS, HTML, CSS, JPA, MySQL, and AWS'],
  },
  {
    id: 'ghrce',
    institution: 'GHRCE',
    degree: 'MBA-IT',
    period: 'Aug 2017 — Jun 2019',
    points: ['Gold Medal — University Topper with 10 SGPA'],
  },
  {
    id: 'rgpv',
    institution: 'RGPV',
    degree: 'BTech — Computer Science Engineering',
    period: 'Aug 2013 — Jun 2017',
    points: ["Bachelor's Degree in Engineering with Distinction — 8.88 SGPA"],
  },
];
