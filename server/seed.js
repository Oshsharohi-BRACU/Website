const {
    initializeDatabase,
    insertTeamMember,
    insertSubTeam,
    clearTables
} = require('./database');

async function seedDatabase() {
    // Initialize database first
    await initializeDatabase();

    // Clear existing data
    clearTables();

    // Team members data (from racing-tabs.tsx)
    const teamMembers = [
        // Leadership
        {
            name: 'Tajbir Ahmed',
            role: 'TEAM LEAD',
            title: 'Project Director',
            description: 'Leading Team OSHSHAROHI towards engineering excellence and racing glory. Tajbir brings vision, leadership, and unwavering dedication to push the boundaries of what our team can achieve.',
            subteam: 'Leadership',
            color: 'brand-red',
            image_path: '/assets/tajbir-ahmed.jpg',
            display_order: 1
        },
        {
            name: 'Mahir Dyan',
            role: 'CO-TEAM LEAD',
            title: 'Deputy Project Director',
            description: 'Driving innovation and coordination across all team divisions. Mahir ensures seamless collaboration and operational excellence throughout the organization.',
            subteam: 'Leadership',
            color: 'orange-500',
            image_path: '/assets/mahir-dyan.jpg',
            display_order: 2
        },

        // Electronics & Powertrain
        {
            name: 'Md. Shafinuzzaman',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'Optimizing the energy flow and power delivery systems. Shafinuzzaman brings technical expertise in mechatronics and mechanical engineering to ensure peak performance.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/shafinuzzaman.jpg',
            display_order: 1
        },
        {
            name: 'Abrar Bin Zakir',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'From data acquisition and wiring to engine performance and transmission, Abrar controls the lifeblood of our vehicle with expertise in electronics and powertrain systems.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/abrar-bin-zakir.jpg',
            display_order: 2
        },
        {
            name: 'Moobta Sim Tajwar',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'Bringing innovation to our powertrain systems. Moobta ensures seamless integration of electronics with mechanical components for optimal performance.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/moobta-sim-tajwar.jpg',
            display_order: 3
        },
        {
            name: 'Nowroz Ahmad',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'Engineering excellence in drivetrain systems. Nowroz focuses on power transmission and vehicle dynamics to maximize track performance.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/nowroz-ahmad.jpg',
            display_order: 4
        },
        {
            name: 'Md. Jarif Alam',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: "Expertise in electronic control systems and powertrain integration. Jarif brings precision engineering to our vehicle's core systems.",
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/jarif-alam.jpg',
            display_order: 5
        },
        {
            name: 'S.M. Rafiur Rahman Swapnil',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'Dedicated to optimizing power delivery and electronic systems. Swapnil brings expertise in mechatronics to enhance our vehicle performance.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/rafiur-rahman-swapnil.jpg',
            display_order: 6
        },
        {
            name: 'Anan Intesar Bin Faiz',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            description: 'From data acquisition and wiring to engine performance and transmission, Anan controls the lifeblood of our vehicle with expertise in electronics and powertrain systems.',
            subteam: 'Electronics & Powertrain',
            color: 'blue-500',
            image_path: '/assets/anan-intesar.jpg',
            display_order: 7
        },

        // Business & Marketing
        {
            name: 'Ashfia Rahman',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            description: "Driving brand visibility and sponsorship relations. Ashfia brings strategic marketing expertise to elevate Team OSHSHAROHI's presence in the motorsport community.",
            subteam: 'Business & Marketing',
            color: 'purple-500',
            image_path: '/assets/ashfia-rahman.jpg',
            display_order: 1
        },
        {
            name: 'Nuzhat Tasnim',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            description: 'Managing logistics and event coordination. Nuzhat ensures smooth operations and seamless execution of all team activities and competitions.',
            subteam: 'Business & Marketing',
            color: 'purple-500',
            image_path: '/assets/nuzhat-tasnim.jpg',
            display_order: 2
        },
        {
            name: 'Asad Ullah Akib',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            description: 'Building partnerships and securing sponsorships. Akib brings business development expertise to fuel our racing ambitions.',
            subteam: 'Business & Marketing',
            color: 'purple-500',
            image_path: '/assets/asad-ullah-akib.jpg',
            display_order: 3
        },
        {
            name: 'Proggha Parmita Sakura',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            description: 'Leading content creation and social media strategy. Sakura connects our team with fans and supporters through engaging storytelling.',
            subteam: 'Business & Marketing',
            color: 'purple-500',
            image_path: '/assets/proggha-parmita-sakura.jpg',
            display_order: 4
        },

        // Chassis & Suspension
        {
            name: 'Kazi Ahnaf Muttaquif Ahmed',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis and Suspension',
            description: 'Engineering the structural backbone of our race car. Kazi ensures the chassis provides optimal rigidity and safety while minimizing weight.',
            subteam: 'Chassis & Suspension',
            color: 'green-500',
            image_path: '/assets/kazi-ahnaf-muttaquif.jpg',
            display_order: 1
        },
        {
            name: 'Suhail Ashraf',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            description: 'Designing suspension geometry for maximum grip and handling. Suhail optimizes vehicle dynamics for peak cornering performance.',
            subteam: 'Chassis & Suspension',
            color: 'green-500',
            image_path: '/assets/suhail-ashraf.jpg',
            display_order: 2
        },
        {
            name: 'Muhtasim Saad Shameem',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            description: 'Focused on suspension tuning and ride quality. Muhtasim brings expertise in vehicle dynamics to enhance driver confidence.',
            subteam: 'Chassis & Suspension',
            color: 'green-500',
            image_path: '/assets/muhtasim-saad-shameem.jpg',
            display_order: 3
        },
        {
            name: 'Khandkar Sajiduzzaman',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            description: 'Structural analysis and chassis optimization specialist. Sajiduzzaman ensures our frame meets the highest safety and performance standards.',
            subteam: 'Chassis & Suspension',
            color: 'green-500',
            image_path: '/assets/khandkar-sajiduzzaman.jpg',
            display_order: 4
        },

        // Aerodynamics & Ergonomics
        {
            name: 'Ishmam Mohammed Chowdhury',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            description: 'Specializing in aerodynamic design and driver comfort. Ishmam optimizes airflow and cockpit ergonomics for peak performance and driver experience.',
            subteam: 'Aerodynamics & Ergonomics',
            color: 'cyan-500',
            image_path: '/assets/ishmam-mohammed-chowdhury.jpg',
            display_order: 1
        },
        {
            name: 'Nafiz Shahriar Sami',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            description: 'Engineering excellence in downforce and drag optimization. Nafiz brings innovative solutions to maximize vehicle aerodynamic efficiency.',
            subteam: 'Aerodynamics & Ergonomics',
            color: 'cyan-500',
            image_path: '/assets/nafiz-shahriar-sami.jpg',
            display_order: 2
        },
        {
            name: 'Sahil Sajjad',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            description: 'Focused on CFD analysis and wind tunnel testing. Sahil ensures our aerodynamic package delivers optimal performance on the track.',
            subteam: 'Aerodynamics & Ergonomics',
            color: 'cyan-500',
            image_path: '/assets/sahil-sajjad.jpg',
            display_order: 3
        },
        {
            name: 'Nishat Jahan Nabila',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            description: 'Expertise in ergonomic design and human factors engineering. Nabila creates driver interfaces that enhance control and reduce fatigue.',
            subteam: 'Aerodynamics & Ergonomics',
            color: 'cyan-500',
            image_path: '/assets/nishat-jahan-nabila.jpg',
            display_order: 4
        },
        {
            name: 'Maruf Mahmud',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            description: 'Dedicated to aerodynamic component design and testing. Maruf brings precision engineering to wings, diffusers, and body panels.',
            subteam: 'Aerodynamics & Ergonomics',
            color: 'cyan-500',
            image_path: '/assets/maruf-mahmud.jpg',
            display_order: 5
        }
    ];

    // Sub-teams data (from constants.ts)
    const subTeams = [
        {
            id: 'chassis',
            name: 'Chassis & Aero',
            icon: 'Wind',
            description: 'Designing the aerodynamic shell and structural integrity of our vehicles for maximum efficiency and speed.',
            goals: JSON.stringify(['Reduce drag coefficient by 15%', 'Optimize chassis weight using carbon fiber composites']),
            achievements: JSON.stringify(['Best Aerodynamic Design Award 2023', 'Built ultra-lightweight monocoque frame'])
        },
        {
            id: 'powertrain',
            name: 'Powertrain',
            icon: 'Zap',
            description: 'Developing high-performance electric drive systems and battery management solutions.',
            goals: JSON.stringify(['Increase battery efficiency by 20%', 'Develop custom motor controller']),
            achievements: JSON.stringify(['Fastest Acceleration Record (Student Category)', 'Implemented regenerative braking system'])
        },
        {
            id: 'dynamics',
            name: 'Vehicle Dynamics',
            icon: 'Activity',
            description: 'Fine-tuning suspension, steering, and braking systems for superior handling and control.',
            goals: JSON.stringify(['Implement active suspension system', 'Optimize tire wear patterns']),
            achievements: JSON.stringify(['Best Handling Vehicle 2022', 'Zero failure rate in endurance testing'])
        },
        {
            id: 'autonomous',
            name: 'Autonomous Sys',
            icon: 'Cpu',
            description: 'Integrating AI and sensor fusion for self-driving capabilities and driver assistance.',
            goals: JSON.stringify(['Level 3 Autonomous navigation', 'Real-time obstacle avoidance integration']),
            achievements: JSON.stringify(['Successful track mapping using LIDAR', 'Automated parking system demo'])
        },
        {
            id: 'management',
            name: 'Management',
            icon: 'Briefcase',
            description: 'Handling logistics, sponsorship, marketing, and team operations.',
            goals: JSON.stringify(['Secure 3 major sponsorships', 'Expand outreach to 5 universities']),
            achievements: JSON.stringify(['Raised 100k BDT in funding', 'Featured in national daily newspaper'])
        },
        {
            id: 'rnd',
            name: 'R&D',
            icon: 'FlaskConical',
            description: 'Researching sustainable materials and future automotive technologies.',
            goals: JSON.stringify(['Prototype hydrogen fuel cell', 'Recycled material implementation']),
            achievements: JSON.stringify(['Published paper on sustainable composites', 'Patent pending for new alloy'])
        }
    ];

    // Insert team members
    console.log('Seeding team members...');
    for (const member of teamMembers) {
        insertTeamMember(member);
    }
    console.log(`Inserted ${teamMembers.length} team members`);

    // Insert sub-teams
    console.log('Seeding sub-teams...');
    for (const team of subTeams) {
        insertSubTeam(team);
    }
    console.log(`Inserted ${subTeams.length} sub-teams`);

    console.log('\n✅ Database seeded successfully!');
}

// Run seeding
seedDatabase().catch(console.error);
