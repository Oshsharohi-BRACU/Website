import { SubTeam } from './types';

export const SUB_TEAMS: SubTeam[] = [
  {
    id: 'chassis',
    name: 'Chassis & Aero',
    icon: 'Wind',
    description: 'Designing the aerodynamic shell and structural integrity of our vehicles for maximum efficiency and speed.',
    goals: ['Reduce drag coefficient by 15%', 'Optimize chassis weight using carbon fiber composites'],
    achievements: ['Best Aerodynamic Design Award 2023', 'Built ultra-lightweight monocoque frame'],
    members: [
      { id: '1', name: 'Aarif Rahman', role: 'Lead Engineer', image: 'https://picsum.photos/100/100?random=1' },
      { id: '2', name: 'Sarah Ahmed', role: 'Aerodynamics Specialist', image: 'https://picsum.photos/100/100?random=2' },
    ]
  },
  {
    id: 'powertrain',
    name: 'Powertrain',
    icon: 'Zap',
    description: 'Developing high-performance electric drive systems and battery management solutions.',
    goals: ['Increase battery efficiency by 20%', 'Develop custom motor controller'],
    achievements: ['Fastest Acceleration Record (Student Category)', 'Implemented regenerative braking system'],
    members: [
      { id: '3', name: 'Rahim Uddin', role: 'Powertrain Lead', image: 'https://picsum.photos/100/100?random=3' },
      { id: '4', name: 'Nadia Islam', role: 'Battery Engineer', image: 'https://picsum.photos/100/100?random=4' },
    ]
  },
  {
    id: 'dynamics',
    name: 'Vehicle Dynamics',
    icon: 'Activity',
    description: 'Fine-tuning suspension, steering, and braking systems for superior handling and control.',
    goals: ['Implement active suspension system', 'Optimize tire wear patterns'],
    achievements: ['Best Handling Vehicle 2022', 'Zero failure rate in endurance testing'],
    members: [
      { id: '5', name: 'Tanvir Hasan', role: 'Dynamics Lead', image: 'https://picsum.photos/100/100?random=5' },
    ]
  },
  {
    id: 'autonomous',
    name: 'Autonomous Sys',
    icon: 'Cpu',
    description: 'Integrating AI and sensor fusion for self-driving capabilities and driver assistance.',
    goals: ['Level 3 Autonomous navigation', 'Real-time obstacle avoidance integration'],
    achievements: ['Successful track mapping using LIDAR', 'Automated parking system demo'],
    members: [
      { id: '6', name: 'Farhan Kabir', role: 'AI Lead', image: 'https://picsum.photos/100/100?random=6' },
    ]
  },
  {
    id: 'management',
    name: 'Management',
    icon: 'Briefcase',
    description: 'Handling logistics, sponsorship, marketing, and team operations.',
    goals: ['Secure 3 major sponsorships', 'Expand outreach to 5 universities'],
    achievements: ['Raised 100k BDT in funding', 'Featured in national daily newspaper'],
    members: [
      { id: '7', name: 'Nusrat Jahan', role: 'Team Manager', image: 'https://picsum.photos/100/100?random=7' },
    ]
  },
  {
    id: 'rnd',
    name: 'R&D',
    icon: 'FlaskConical',
    description: 'Researching sustainable materials and future automotive technologies.',
    goals: ['Prototype hydrogen fuel cell', 'Recycled material implementation'],
    achievements: ['Published paper on sustainable composites', 'Patent pending for new alloy'],
    members: [
      { id: '8', name: 'Dr. Kamal Hossain', role: 'R&D Head', image: 'https://picsum.photos/100/100?random=8' },
    ]
  },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
  { name: 'University', url: 'https://bracu.ac.bd', icon: 'GraduationCap' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
];
