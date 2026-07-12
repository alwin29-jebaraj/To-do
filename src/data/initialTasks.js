export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Implement OAuth authentication',
    description: 'Set up Google and GitHub OAuth flow on the backend proxy server and handle token refresh cycles.',
    status: 'in-progress',
    priority: 'high',
    category: 'Engineering',
    dueDate: '2026-07-15',
    createdAt: '2026-07-10T10:00:00.000Z',
    updatedAt: '2026-07-12T09:30:00.000Z'
  },
  {
    id: 'task-2',
    title: 'Design database schema',
    description: 'Design PostgreSQL relational schema for workspaces, tasks, and comments, and configure Drizzle migrations.',
    status: 'completed',
    priority: 'high',
    category: 'Database',
    dueDate: '2026-07-08',
    createdAt: '2026-07-05T08:00:00.000Z',
    updatedAt: '2026-07-08T17:00:00.000Z'
  },
  {
    id: 'task-3',
    title: 'Optimize image load times',
    description: 'Add image resizing logic and modern webp compression pipeline to reduce hero asset file sizes by 60%.',
    status: 'todo',
    priority: 'medium',
    category: 'Engineering',
    dueDate: '2026-07-20',
    createdAt: '2026-07-11T14:30:00.000Z',
    updatedAt: '2026-07-11T14:30:00.000Z'
  },
  {
    id: 'task-4',
    title: 'Draft Q3 marketing copy',
    description: 'Write promotional newsletter copies, landing page headings, and social media announcements for Q3 product release.',
    status: 'todo',
    priority: 'low',
    category: 'Marketing',
    dueDate: '2026-07-25',
    createdAt: '2026-07-12T06:00:00.000Z',
    updatedAt: '2026-07-12T06:00:00.000Z'
  },
  {
    id: 'task-5',
    title: 'Perform security penetration test',
    description: 'Audit API endpoints for CORS misconfigurations, SQL injection vulnerabilities, and proper authorization headers.',
    status: 'in-progress',
    priority: 'high',
    category: 'Security',
    dueDate: '2026-07-14',
    createdAt: '2026-07-09T11:00:00.000Z',
    updatedAt: '2026-07-12T08:15:00.000Z'
  },
  {
    id: 'task-6',
    title: 'Review customer feedback',
    description: 'Analyze support tickets from the last week and summarize top 3 visual bugs and top 2 feature requests.',
    status: 'completed',
    priority: 'medium',
    category: 'Support',
    dueDate: '2026-07-10',
    createdAt: '2026-07-09T09:00:00.000Z',
    updatedAt: '2026-07-10T16:00:00.000Z'
  },
  {
    id: 'task-7',
    title: 'Update onboarding documentation',
    description: 'Revise developer setup guide in README.md to incorporate the new Docker Compose multi-container setup steps.',
    status: 'todo',
    priority: 'low',
    category: 'Documentation',
    dueDate: '2026-07-30',
    createdAt: '2026-07-12T05:30:00.000Z',
    updatedAt: '2026-07-12T05:30:00.000Z'
  },
  {
    id: 'task-8',
    title: 'Conduct weekly sync meeting',
    description: 'Align with engineering, product, and design leads on milestone targets and address immediate blockages.',
    status: 'completed',
    priority: 'medium',
    category: 'Management',
    dueDate: '2026-07-11',
    createdAt: '2026-07-11T09:00:00.000Z',
    updatedAt: '2026-07-11T10:30:00.000Z'
  },
  {
    id: 'task-9',
    title: 'Optimize database indexes',
    description: 'Analyze query execution plans and add composite indexes on high-frequency where-clause parameters to speed up searches.',
    status: 'todo',
    priority: 'high',
    category: 'Database',
    dueDate: '2026-07-18',
    createdAt: '2026-07-11T16:00:00.000Z',
    updatedAt: '2026-07-11T16:00:00.000Z'
  },
  {
    id: 'task-10',
    title: 'Refactor modal visual transitions',
    description: 'Replace standard CSS transitions with modern Framer Motion orchestrations for spring-based scale-ups and slide-outs.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Design',
    dueDate: '2026-07-16',
    createdAt: '2026-07-12T01:00:00.000Z',
    updatedAt: '2026-07-12T06:10:00.000Z'
  },
  {
    id: 'task-11',
    title: 'Design billing subscription page',
    description: 'Draft pixel-perfect UI with pricing plans, dynamic annual/monthly toggle, and custom tier comparison checkboxes.',
    status: 'todo',
    priority: 'medium',
    category: 'Design',
    dueDate: '2026-07-22',
    createdAt: '2026-07-12T02:00:00.000Z',
    updatedAt: '2026-07-12T02:00:00.000Z'
  },
  {
    id: 'task-12',
    title: 'Create demo explainer video',
    description: 'Record and edit a high-fidelity 2-minute walkthrough detailing real-time board collaboration features.',
    status: 'todo',
    priority: 'low',
    category: 'Marketing',
    dueDate: '2026-07-28',
    createdAt: '2026-07-12T03:00:00.000Z',
    updatedAt: '2026-07-12T03:00:00.000Z'
  }
];

export const CATEGORIES = [
  'Engineering',
  'Database',
  'Design',
  'Marketing',
  'Documentation',
  'Support',
  'Management',
  'Security'
];
