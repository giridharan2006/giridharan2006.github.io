// Single source of truth for portfolio content.
// Every claim here is taken from the resume, the project source code, or the
// project's own README/report. Do not add metrics that are not in those sources.

export const profile = {
  name: 'Giridharan S',
  title: 'Computer Science Undergraduate',
  focus: ['AI', 'Robotics', 'Software Engineering'],
  tagline:
    'Building intelligent systems at the intersection of Artificial Intelligence, Robotics and Software Engineering.',
  intro:
    'I am a B.Tech Computer Science student at VIT Vellore. I like systems that have to sense, reason and decide: robots that map and navigate, agents that explain their choices, and software whose correctness can be checked rather than assumed.',
  university: 'VIT, Vellore',
  degree: 'B.Tech Computer Science',
  cgpa: '9.19',
  years: '2024 – 2028',
  email: 'giridharan.s2024a@vitstudent.ac.in',
  phone: '+91 9606043152',
  links: {
    linkedin: 'https://www.linkedin.com/in/giridharan-s-1bb012333/',
    github: 'https://github.com/giridharan2006',
    email: 'mailto:giridharan.s2024a@vitstudent.ac.in',
  },
  resume: 'resume/Giridharan_S_Resume.pdf',
};

export const about = {
  paragraphs: [
    'I enjoy building software that has to make decisions under constraints. At Team Artemis I work with ROS 2 on Hexapod and TurtleBot platforms, mapping real and simulated environments and testing navigation to goals on saved maps.',
    'On the AI side, I have evaluated Hindi speech-to-text models at IITM Pravartak and built a neuro-symbolic travel agent whose decisions stay explainable. My course projects lean the same way: a recommender whose every explanation can be re-verified in SQL, and a compiler that applies an optimization only when a cost model proves it helps.',
  ],
  focus: [
    { t: 'Autonomous robotics', d: 'ROS 2 mapping with LiDAR, Gazebo simulation, navigation with Nav2.' },
    { t: 'AI / ML', d: 'Model evaluation, preference learning, neuro-symbolic agents.' },
    { t: 'Computer vision', d: 'OpenCV vehicle detection driving real-time decisions.' },
    { t: 'Intelligent systems', d: 'Explainable ranking, cost models, multi-objective optimization.' },
    { t: 'Software engineering', d: 'Tested, verifiable systems: constraints, triggers, differential tests.' },
  ],
};

export const skills = [
  { key: 'languages', label: 'Programming Languages', items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'] },
  { key: 'robotics', label: 'Robotics', items: ['ROS 2', 'RViz', 'Gazebo', 'LiDAR', 'URDF', 'Nav2 (learning)'] },
  { key: 'ai', label: 'AI / ML & Vision', items: ['scikit-learn', 'OpenCV', 'Model evaluation', 'Neuro-symbolic AI'] },
  { key: 'backend', label: 'Backend', items: ['Python', 'FastAPI', 'Flask'] },
  { key: 'frontend', label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite'] },
  { key: 'db', label: 'Databases', items: ['PostgreSQL', 'SQLite', 'SQL', 'Triggers & PL/pgSQL'] },
  { key: 'tools', label: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'pytest', 'ESP32', 'Mininet'] },
  { key: 'concepts', label: 'Concepts', items: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'AI/ML', 'Computer Vision', 'Compiler Design'] },
];

export const experience = [
  {
    role: 'Junior Software Engineer',
    org: 'Team Artemis',
    place: 'Vellore Institute of Technology, Vellore',
    dates: 'Jul 2026 – Present',
    tags: ['ROS 2', 'LiDAR', 'Gazebo', 'Nav2', 'Hexapod', 'TurtleBot'],
    points: [
      'Mapped the Team Artemis lab with a physical LiDAR, and a maze in Gazebo, in ROS 2 using Hexapod and TurtleBot platforms.',
      'Ran 2 navigation tests to predefined goals on saved maps; learning Nav2 and exploring a modified navigation approach.',
      'Supporting preparation for the EYIC and Technocian finals, and assisting juniors with RoboReach at Techfest, IIT Bombay.',
    ],
  },
  {
    role: 'AI/ML Intern',
    org: 'IITM Pravartak (IIT Madras)',
    place: 'Chennai · Hybrid',
    dates: 'May 2025 – Jun 2025',
    tags: ['Speech-to-text', 'Hindi', 'Model evaluation'],
    points: [
      'Validated ~800 Hindi speech-to-text test cases from Sansad TV broadcasts against ground-truth transcripts.',
      'Evaluated model outputs for accuracy, consistency and edge-case handling, and logged findings for model iteration.',
    ],
  },
];

export const education = {
  school: 'Vellore Institute of Technology',
  place: 'Vellore',
  degree: 'B.Tech, Computer Science',
  years: '2024 – 2028',
  cgpa: '9.19',
  earlier: [
    { name: 'Higher Secondary · Samsidh International School', years: '2022 – 2024', score: '85%' },
    { name: 'Secondary · Chinmaya Vidyalaya', years: '2015 – 2022', score: '88%' },
  ],
};

export const certifications = [
  {
    title: 'Robotic Fundamentals and Introduction to ROS',
    org: 'Value Added Course · VIT',
    dates: 'Jan 2026 – Apr 2026',
    note: 'ROS nodes, topics and services, RViz, Gazebo and SLAM-based mapping.',
  },
  {
    title: 'Machine Learning & AI Fundamentals',
    org: 'TEACHNOOK (Teachspace Online Learning Services)',
    dates: 'Oct 2024 – Dec 2024',
    note: 'Training program, remote.',
  },
  {
    title: '55+ problems solved on LeetCode',
    org: 'Problem solving',
    dates: 'Ongoing',
    note: 'Arrays, strings, dynamic programming and graphs.',
    href: 'https://github.com/giridharan2006/LeetCode',
  },
];
