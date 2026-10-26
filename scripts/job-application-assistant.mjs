#!/usr/bin/env node
import process from 'node:process';

const profile = {
  name: 'Sharmistha',
  headline: 'UI Developer / Frontend Engineer',
  location: 'Bangalore, India',
  years: '4+ years',
  summary:
    'Experienced in building modern web applications with React, Angular, TypeScript, Tailwind CSS, Spring Boot, and cloud-based deployment workflows.',
  strengths: [
    'React',
    'Angular',
    'TypeScript',
    'Tailwind CSS',
    'Spring Boot',
    'REST APIs',
    'Playwright',
    'CI/CD',
    'Cloud Deployments',
    'Prompt Engineering',
  ],
  achievements: [
    'Built scalable UI components for enterprise-grade tools at eBay scale.',
    'Delivered Fortune 100 client features with rigorous testing and design systems.',
    'Created AI-assisted and full-stack products with strong product thinking.',
  ],
  projects: [
    'WeatherNow: AI-powered weather app with 200k+ city coverage and dynamic theming.',
    'Event Management System: full-stack app with multi-role authentication and relational data.',
    'Wallet Manager: cloud-deployed wallet product using Node.js, MongoDB, and AWS.',
  ],
};

const portalConfig = {
  linkedin: {
    label: 'LinkedIn',
    searchUrl: 'https://www.linkedin.com/jobs/',
    note: 'Use the search bar with role + location + keywords like React, Angular, TypeScript.',
  },
  naukri: {
    label: 'Naukri',
    searchUrl: 'https://www.naukri.com/',
    note: 'Search by the role and add skills such as React, Angular, UI Developer, Frontend Engineer.',
  },
  indeed: {
    label: 'Indeed',
    searchUrl: 'https://in.indeed.com/',
    note: 'Use location filters and relevant keywords such as frontend, UI, React, full-stack.',
  },
  wellfound: {
    label: 'Wellfound',
    searchUrl: 'https://wellfound.com/jobs',
    note: 'Great for startup product and early-stage engineering roles.',
  },
  glassdoor: {
    label: 'Glassdoor',
    searchUrl: 'https://www.glassdoor.co.in/Job/index.htm',
    note: 'Use it to compare compensation, company reviews, and role expectations.',
  },
};

const roleTemplates = {
  'ui developer': {
    titleHints: ['UI Developer', 'Frontend Developer', 'React Developer', 'Angular Developer'],
    keywords: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'UI Development', 'Design Systems'],
    pitch: 'I build polished, accessible, and scalable user interfaces with strong product focus and modern frontend tooling.',
  },
  'frontend developer': {
    titleHints: ['Frontend Developer', 'React Developer', 'Frontend Engineer', 'UI Engineer'],
    keywords: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'JavaScript', 'Component Architecture'],
    pitch: 'I create performant, user-friendly interfaces and bring ideas from design to production with modern frontend practices.',
  },
  'full stack developer': {
    titleHints: ['Full Stack Developer', 'Full Stack Engineer', 'Software Engineer', 'Product Engineer'],
    keywords: ['React', 'Spring Boot', 'REST APIs', 'MongoDB', 'MySQL', 'Node.js'],
    pitch: 'I enjoy building end-to-end features, from responsive interfaces to robust backend services and cloud deployment.',
  },
  'software developer': {
    titleHints: ['Software Developer', 'Software Engineer', 'Application Developer', 'Product Engineer'],
    keywords: ['Java', 'Spring Boot', 'React', 'API Integration', 'Testing', 'CI/CD'],
    pitch: 'I thrive in cross-functional teams and enjoy transforming business requirements into reliable software products.',
  },
  'ai engineer': {
    titleHints: ['AI Engineer', 'ML Engineer', 'Applied AI Engineer', 'AI Product Engineer'],
    keywords: ['Generative AI', 'Prompt Engineering', 'OpenAI API', 'LLM Integration', 'RAG Pipelines'],
    pitch: 'I build AI-powered user experiences and integrate intelligent workflows into practical web products.',
  },
};

function parseArgs(argv) {
  const args = { role: 'frontend developer', portal: 'linkedin' };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--role' && argv[index + 1]) {
      args.role = argv[index + 1].toLowerCase();
      index += 1;
    } else if (value === '--portal' && argv[index + 1]) {
      args.portal = argv[index + 1].toLowerCase();
      index += 1;
    } else if (value === '--help' || value === '-h') {
      args.help = true;
    }
  }

  return args;
}

function getRoleTemplate(role) {
  const normalized = role.toLowerCase();
  return roleTemplates[normalized] || roleTemplates['frontend developer'];
}

function buildApplicationPlan(role, portal) {
  const template = getRoleTemplate(role);
  const portalInfo = portalConfig[portal] || portalConfig.linkedin;
  const query = [template.titleHints[0], profile.location, ...template.keywords].join(' ');
  const subject = `${template.titleHints[0]} application for ${profile.name}`;

  const coverNote = `Hi Hiring Team,\n\nI am ${profile.name}, a ${profile.headline} with ${profile.years} of experience building modern, scalable, and user-focused web products. My background includes ${template.keywords.slice(0, 4).join(', ')} and hands-on delivery across enterprise and product environments. I have recently worked on ${profile.projects[0].split(':')[0]} and ${profile.projects[1].split(':')[0]}, which align well with roles focused on thoughtful UI engineering and end-to-end product delivery.\n\nI would love to contribute my experience in ${template.keywords[0]} and ${template.keywords[1]} to your team while continuing to grow in high-impact engineering environments.\n\nBest regards,\n${profile.name}`;

  return {
    role,
    portal: portalInfo.label,
    subject,
    summary: profile.summary,
    strengths: profile.strengths,
    titleHints: template.titleHints,
    keywords: template.keywords,
    searchQuery: query,
    coverNote,
    portalNote: portalInfo.note,
    profileUrl: 'https://sharmistha-portfolio.netlify.app/',
  };
}

function printHelp() {
  console.log(`Usage: node scripts/job-application-assistant.mjs [options]\n\nOptions:\n  --role <role>        Target role: ui developer, frontend developer, full stack developer, software developer, ai engineer\n  --portal <portal>    Portal: linkedin, naukri, indeed, wellfound, glassdoor\n  --help               Show this help message`);
}

function printPlan(plan) {
  console.log(`Job application plan for ${plan.portal}`);
  console.log('='.repeat(48));
  console.log(`Name: ${profile.name}`);
  console.log(`Headline: ${profile.headline}`);
  console.log(`Location: ${profile.location}`);
  console.log(`Target role: ${plan.role}`);
  console.log(`Suggested titles: ${plan.titleHints.join(', ')}`);
  console.log(`Top keywords: ${plan.keywords.join(', ')}`);
  console.log(`Search query: ${plan.searchQuery}`);
  console.log(`Portal note: ${plan.portalNote}`);
  console.log(`Portfolio: ${plan.profileUrl}`);
  console.log('\nSuggested application note:\n');
  console.log(plan.coverNote);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const plan = buildApplicationPlan(args.role, args.portal);
  printPlan(plan);
}

main();
