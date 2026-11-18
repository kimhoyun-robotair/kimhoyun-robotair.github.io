// Profile and news are based on info.md. Publication links were checked against
// APRL's publication list and arXiv on 2026-11-17.
export const profile = {
  name: 'Hoyun Kim',
  role: 'Master’s student',
  affiliation: 'Autonomy and Perceptual Robotics Lab',
  labAcronym: 'APRL',
  labUrl: 'https://aprl.dgist.ac.kr/',
  institution: 'DGIST',
  institutionUrl: 'https://www.dgist.ac.kr/eng/',
  location: 'South Korea',
  portrait: '/images/hoyunkim.jpg',
  email: 'hoyunkim@dgist.ac.kr',
  scholar: 'https://scholar.google.com/citations?user=xyJ_O5AAAAAJ&hl=en',
  github: 'https://github.com/kimhoyun-robotair',
  linkedin: 'https://www.linkedin.com/in/hoyun-kim-7384b7306/',
  description: 'Hoyun Kim is a master’s student at APRL, DGIST, working on field robotics, aerospace robotics, sensor fusion, and simulation-to-real transfer.',
  interests: [
    'Field Robotics',
    'Autonomous Systems',
    'Aerospace Engineering',
    'Sim2Real',
    'SLAM',
  ],
};

type NewsItem = {
  date: string;
  emoji: string;
  segments: { text: string; href?: string }[];
};

export const news: NewsItem[] = [
  { date: 'Nov 2026', emoji: '🎤', segments: [{ text: 'Presented our work at the International Conference on Space Robotics (iSpaRo 2026).' }] },
  { date: 'Aug 2026', emoji: '📄', segments: [
    { text: 'Two papers', href: '#research' },
    { text: ' accepted to ' },
    { text: 'iSpaRo 2026', href: 'https://www.isairas-isparo.de/' },
    { text: ': MarsLab and our survey on planetary robotics simulation.' },
  ] },
  { date: 'Jun 2026', emoji: '🎙️', segments: [{ text: 'Presented our survey at the ICRA Workshop on Perceptual Challenges for Planetary Exploration.' }] },
  { date: 'May 2026', emoji: '🎉', segments: [
    { text: 'Our ' },
    { text: 'planetary robotics simulation survey', href: '#research' },
    { text: ' was accepted to an ' },
    { text: 'ICRA 2026 Workshop', href: 'https://icra2026-planetary-robotics.github.io/' },
    { text: '.' },
  ] },
];

export const publications = [
  {
    title: 'MarsLab: A Martian Rover Simulator for Planetary Rover Autonomous Navigation',
    authors: ['Hoyun Kim', 'Beomsu Kim', 'Giseop Kim'],
    venue: 'International Conference on Space Robotics (iSpaRo)',
    year: 2026,
    image: '/images/marslab/marslab.png',
    imageWidth: 1920,
    imageHeight: 1080,
    alt: 'MarsLab showcase featuring Mars rover models and an aerial robot on Martian terrain',
    summary: 'A configurable Isaac Sim platform for planetary rover perception and autonomy, with multi-modal sensing and ROS 2 interfaces.',
    links: [
      { label: 'Project', url: '/projects/marslab/' },
      { label: 'Paper', url: 'https://arxiv.org/abs/2609.34702' },
      { label: 'Code', url: 'https://github.com/kimhoyun-robotair/MarsLab' },
      { label: 'Video1', url: 'https://www.youtube.com/watch?v=gkr9NTTGlTw' },
      { label: 'Video2', url: 'https://www.youtube.com/watch?v=RZ4jktGxNAs' },
    ],
  },
  {
    title: 'Simulation for Planetary Robotic Perception and Autonomy: A Concise Survey of Recent Capabilities and Gaps',
    authors: ['Hoyun Kim', 'Giseop Kim'],
    venue: 'International Conference on Space Robotics (iSpaRo)',
    year: 2026,
    image: '/images/research/surveyisparo.png',
    imageWidth: 1216,
    imageHeight: 624,
    alt: 'Overview of planetary robotics simulation factors around a rover and aerial robot',
    summary: 'A survey of planetary robotics simulation through openness, scenario coverage, sensing support, and environmental and operational realism.',
    links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2609.34743' }],
  },
  {
    title: 'Simulation for Planetary Robotic Perception: A Concise Survey of Capabilities and Gaps',
    authors: ['Hoyun Kim', 'Giseop Kim'],
    venue: 'ICRA Workshop on Perceptual Challenges for Planetary Exploration',
    year: 2026,
    image: '/images/research/workshopsurvey.png',
    imageWidth: 1254,
    imageHeight: 559,
    alt: 'Survey structure from domain requirements and systematic evaluation to gaps and open challenges',
    summary: 'A concise survey of simulation capabilities and gaps for planetary robotic perception.',
    links: [
      { label: 'Paper', url: 'https://openreview.net/pdf?id=pDcxtHEWj3' },
    ],
  },
];
