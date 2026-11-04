// Project content. Repository links are only included where the repository
// was verified on github.com/giridharan2006.

export const projects = [
  {
    id: 'cinetrace',
    index: '01',
    kicker: 'DBMS · Explainable AI',
    title: 'CineTrace',
    subtitle: 'Explainable and adaptive movie recommendation system',
    dates: 'Oct 2026 – Nov 2026',
    description:
      'A recommender in which every explanation sentence is a relational record. Its foreign keys point at the immutable rows that justify it, so any explanation can be re-checked later with time-travel SQL.',
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'PL/pgSQL', 'pytest'],
    points: [
      '18-table PostgreSQL schema: explanation claims link to the exact rating version, genre-profile snapshot or item-similarity row behind them.',
      'Append-only temporal rating history maintained by triggers; a SQL verifier labels each claim VALID, SUPERSEDED or INVALID as of the moment it was shown.',
      'Integrity rules SQL CHECKs cannot express: deferred constraint triggers (no claim without evidence), immutable provenance, no recommending already-rated films.',
      'Adaptive taste: genre profiles split older and recent ratings and label genres rising, fading or reversed. Hybrid item-kNN scoring with MMR re-ranking.',
    ],
    stats: [
      { v: '0 / 4,294', l: 'stored claims invalid on time-split test lists' },
      { v: '40', l: 'pytest tests: constraints, triggers, rollback, API' },
      { v: '18', l: 'tables with keys, checks and triggers' },
    ],
    visual: 'cinetrace',
    repo: null,
  },
  {
    id: 'compiler',
    index: '02',
    kicker: 'Compiler Design · Team of 3',
    title: 'Mini Compiler for a Custom Language',
    subtitle: 'A teaching compiler that applies an optimization only when it makes the program cheaper',
    dates: 'Course project · BCSE307P',
    description:
      'Seven classical phases, from characters to cycles, written in pure Python with no dependencies. The optimizer treats every rewrite rule as a proposal and keeps it only if a whole-program cost model says the result is strictly cheaper.',
    stack: ['Python 3.8+', 'Standard library only', 'unittest'],
    points: [
      'Lexer, recursive-descent parser, semantic analysis with a symbol table, three-address code, optimizer, 8-register code generation and a cycle-counting VM.',
      'Cost-gated optimizer with algebraic rewrites and a decision log recording every accept and reject with cost before and after.',
      'Target-aware: the same source compiles differently for a slow (MUL = 3) and a fast (MUL = 1) multiplier.',
      'Self-checking: 24 unittest tests, differential verification on 300 randomly generated programs.',
    ],
    stats: [
      { v: '33.7%', l: 'fewer VM cycles than Normal passes (297 → 197)' },
      { v: '79.5%', l: 'fewer multiplies and divides' },
      { v: '9 / 9', l: 'benchmark programs pass verification' },
    ],
    visual: 'compiler',
    repo: null,
  },
  {
    id: 'travel',
    index: '03',
    kicker: 'AI Agent · Neuro-symbolic',
    title: 'Knowledge-Augmented Neuro-Symbolic Travel Planner',
    subtitle: 'An agent that turns natural-language requests into constrained flight × hotel plans',
    dates: 'Aug 2026 – Present',
    description:
      'A language layer parses the request into a schema-validated trip; a symbolic core does everything that must be trustworthy: constraints, elicitation, ranking, risk and pre-booking validation.',
    stack: ['Python', 'Flask', 'SQLite', 'scikit-learn', 'pytest'],
    points: [
      'Plan-aware elicitation: asks about a preference only when different answers would change the selected plan.',
      'Persistent SQLite memory of typed preference facts, so later trips need far fewer questions.',
      'Explainable ranking, SAFE / MEDIUM / HIGH financial-risk tiers with explicit confirmation, and validated, idempotent bookings against mock flight and hotel sites.',
      'Optional ML mode: pairwise logistic-regression preference model with expected value of information deciding when to ask.',
    ],
    stats: [
      { v: '6 vs 9', l: 'first-trip questions vs ask-all, both 100% oracle match' },
      { v: '158', l: 'automated pytest tests passing' },
    ],
    visual: 'travel',
    repo: 'https://github.com/giridharan2006/Knowledge-Augmented-Neuro-Symbolic-Travel-Planner',
  },
  {
    id: 'greenplace',
    index: '04',
    kicker: 'Networks · Optimization · Group project',
    title: 'GreenPlace: SDN Controller Placement',
    subtitle: 'Energy-aware controller placement under hard delay constraints',
    dates: 'Aug 2026 – Present',
    description:
      'Offline placement models controller power, worst-case switch-to-controller delay and future migration burden. A runtime manager then adapts the active controller set as traffic changes.',
    stack: ['Python', 'ILP', 'NSGA-II', 'Mininet', 'Open vSwitch', 'Ryu'],
    points: [
      'Exact Integer Linear Programming baseline and NSGA-II multi-objective search for static (offline) placement.',
      'Dynamic traffic handling: smoothed measurements, minimum dwell time and delay- and capacity-aware switch reassignment.',
      'Evaluated on 46 real Internet Topology Zoo networks; Mininet/Ryu emulation on Abilene and NSFNET compared break-before-make and make-before-break hand-over.',
    ],
    stats: [
      { v: '46', l: 'Topology Zoo networks in simulation' },
      { v: '212', l: 'switch migrations executed and verified in emulation' },
    ],
    visual: 'network',
    repo: 'https://github.com/giridharan2006/SDN-Controller-Placement',
  },
];

export const robotics = [
  {
    title: 'Lab & maze mapping with ROS 2',
    meta: 'Team Artemis · Jul 2026 – Present',
    text: 'Mapped the Team Artemis lab with a physical LiDAR and a Gazebo maze using Hexapod and TurtleBot, then ran navigation tests to goals on the saved maps.',
    stack: ['ROS 2', 'LiDAR', 'Gazebo', 'Nav2'],
    repo: null,
  },
  {
    title: 'Differential-drive robot in URDF',
    meta: 'Team Artemis training',
    text: 'A two-wheeled differential-drive robot with a caster and a mounted LiDAR, described in URDF and visualised in RViz.',
    stack: ['ROS 2', 'URDF', 'RViz'],
    repo: 'https://github.com/giridharan2006/Bot-Creation-using-URDF',
  },
  {
    title: 'Smart Traffic Management System',
    meta: 'Apr 2026 – Aug 2026',
    text: 'OpenCV-based vehicle detection drives real-time signal decisions; rule-based Python logic sends control signals to hardware via an ESP32.',
    stack: ['Python', 'OpenCV', 'ESP32'],
    repo: 'https://github.com/giridharan2006/Smart-Traffic-Management-System',
  },
];
