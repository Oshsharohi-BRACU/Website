"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Users,
    Wrench,
    Trophy,
    FileText,
    Award,
    ChevronRight,
    ChevronDown,
    Zap,
    Target,
    Clock,
    Star,
    Layers,
    Wind
} from 'lucide-react';

// Tab configuration
const tabs = [
    { id: 'department', label: 'Department', icon: Building2, color: '#E11D48' },
    { id: 'team', label: 'Team', icon: Users, color: '#F97316' },
    { id: 'workshop', label: 'Workshop', icon: Wrench, color: '#EAB308' },
    { id: 'competition', label: 'Competition', icon: Trophy, color: '#22C55E' },
    { id: 'research', label: 'Research Paper', icon: FileText, color: '#3B82F6' },
    { id: 'patent', label: 'Patent', icon: Award, color: '#8B5CF6' },
];

interface RacingTabsProps {
    className?: string;
}

const RacingTabs: React.FC<RacingTabsProps> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState('department');

    return (
        <section className={`w-full bg-slate-900 py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/30 rounded-full mb-4"
                    >
                        <Zap className="w-4 h-4 text-brand-red" />
                        <span className="text-sm text-brand-red font-medium">Explore Our Team</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
                    >
                        Racing <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">Divisions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Navigate through our departments like shifting gears — each division plays a crucial role in our racing success.
                    </motion.p>
                </div>

                {/* Tab Navigation - Speedometer Style */}
                <div className="relative mb-8">
                    {/* Racing Track Line Background */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-1 bg-slate-700 rounded-full">
                            <motion.div
                                className="h-full bg-gradient-to-r from-brand-red to-orange-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((tabs.findIndex(t => t.id === activeTab) + 1) / tabs.length) * 100}%` }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            />
                        </div>
                    </div>

                    {/* Tab Buttons */}
                    <div className="relative flex justify-between">
                        {tabs.map((tab, index) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const isPast = tabs.findIndex(t => t.id === activeTab) >= index;

                            return (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    relative flex flex-col items-center gap-2 p-2 md:p-4 rounded-xl transition-all duration-300
                    ${isActive ? 'scale-110' : 'hover:scale-105'}
                  `}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Gear/Node Indicator */}
                                    <div
                                        className={`
                      w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center
                      transition-all duration-300 border-2
                      ${isActive
                                                ? 'bg-gradient-to-br from-brand-red to-orange-500 border-white shadow-lg shadow-brand-red/50'
                                                : isPast
                                                    ? 'bg-slate-700 border-brand-red/50'
                                                    : 'bg-slate-800 border-slate-600'
                                            }
                    `}
                                    >
                                        <Icon
                                            className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-white' : isPast ? 'text-brand-red' : 'text-gray-500'}`}
                                        />
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`
                      text-xs md:text-sm font-medium text-center hidden sm:block
                      ${isActive ? 'text-white' : 'text-gray-500'}
                    `}
                                    >
                                        {tab.label}
                                    </span>

                                    {/* Active Indicator Pulse */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute -inset-1 rounded-xl border-2 border-brand-red/50"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: [0.5, 0], scale: [1, 1.2] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 50, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            className="w-full"
                        >
                            {activeTab === 'department' && <DepartmentTab />}
                            {activeTab === 'team' && <TeamTab />}
                            {activeTab === 'workshop' && <WorkshopTab />}
                            {activeTab === 'competition' && <CompetitionTab />}
                            {activeTab === 'research' && <ResearchTab />}
                            {activeTab === 'patent' && <PatentTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// Department Tab Content
const DepartmentTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Our Departments</h3>
                    <p className="text-gray-400 text-sm">Specialized divisions driving excellence</p>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { name: 'Powertrain', desc: 'Engine, transmission & power delivery', progress: 95 },
                    { name: 'Chassis', desc: 'Frame design & structural integrity', progress: 88 },
                    { name: 'Aerodynamics', desc: 'Downforce & drag optimization', progress: 82 },
                    { name: 'Electronics', desc: 'ECU, sensors & data systems', progress: 90 },
                ].map((dept, i) => (
                    <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">{dept.name}</span>
                            <span className="text-brand-red font-bold">{dept.progress}%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{dept.desc}</p>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-brand-red to-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${dept.progress}%` }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700">
            <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop"
                alt="Sports Car"
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Engineering Excellence</h4>
                <p className="text-gray-400 mb-4">
                    Each department works in perfect sync, like a finely-tuned engine, to deliver peak performance on and off the track.
                </p>
                <button className="flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

// Team Tab Content with Fullscreen Modal
const TeamTab = () => {
    const [selectedMember, setSelectedMember] = useState<{
        name: string;
        role: string;
        title: string;
        img: string;
        description: string;
        color: string;
    } | null>(null);

    // Track which sections are expanded (all expanded by default)
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        leadership: true,
        electronicsPowertrain: true,
        businessMarketing: true,
        chassisSuspension: true,
        aerodynamicsErgonomics: true
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const leaders = [
        {
            name: 'Tajbir Ahmed',
            role: 'TEAM LEAD',
            title: 'Project Director',
            img: '/assets/tajbir-ahmed.jpg',
            description: 'Leading Team OSHSHAROHI towards engineering excellence and racing glory. Tajbir brings vision, leadership, and unwavering dedication to push the boundaries of what our team can achieve.',
            color: 'brand-red',
            subteam: 'Leadership'
        },
        {
            name: 'Mahir Dyan',
            role: 'CO-TEAM LEAD',
            title: 'Deputy Project Director',
            img: '/assets/mahir-dyan.jpg',
            description: 'Driving innovation and coordination across all team divisions. Mahir ensures seamless collaboration and operational excellence throughout the organization.',
            color: 'orange-500',
            subteam: 'Leadership'
        },
        {
            name: 'Md. Shafinuzzaman',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/shafinuzzaman.jpg',
            description: 'Optimizing the energy flow and power delivery systems. Shafinuzzaman brings technical expertise in mechatronics and mechanical engineering to ensure peak performance.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Abrar Bin Zakir',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/abrar-bin-zakir.jpg',
            description: 'From data acquisition and wiring to engine performance and transmission, Abrar controls the lifeblood of our vehicle with expertise in electronics and powertrain systems.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Moobta Sim Tajwar',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/moobta-sim-tajwar.jpg',
            description: 'Bringing innovation to our powertrain systems. Moobta ensures seamless integration of electronics with mechanical components for optimal performance.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Nowroz Ahmad',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/nowroz-ahmad.jpg',
            description: 'Engineering excellence in drivetrain systems. Nowroz focuses on power transmission and vehicle dynamics to maximize track performance.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Md. Jarif Alam',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/jarif-alam.jpg',
            description: 'Expertise in electronic control systems and powertrain integration. Jarif brings precision engineering to our vehicle\'s core systems.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'S.M. Rafiur Rahman Swapnil',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/rafiur-rahman-swapnil.jpg',
            description: 'Dedicated to optimizing power delivery and electronic systems. Swapnil brings expertise in mechatronics to enhance our vehicle performance.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Anan Intesar Bin Faiz',
            role: 'ELECTRONICS & POWERTRAIN',
            title: 'Electronics, Powertrain & Drivetrain',
            img: '/assets/anan-intesar.jpg',
            description: 'From data acquisition and wiring to engine performance and transmission, Anan controls the lifeblood of our vehicle with expertise in electronics and powertrain systems.',
            color: 'blue-500',
            subteam: 'Electronics & Powertrain'
        },
        {
            name: 'Ashfia Rahman',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            img: '/assets/ashfia-rahman.jpg',
            description: 'Driving brand visibility and sponsorship relations. Ashfia brings strategic marketing expertise to elevate Team OSHSHAROHI\'s presence in the motorsport community.',
            color: 'purple-500',
            subteam: 'Business & Marketing'
        },
        {
            name: 'Nuzhat Tasnim',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            img: '/assets/nuzhat-tasnim.jpg',
            description: 'Managing logistics and event coordination. Nuzhat ensures smooth operations and seamless execution of all team activities and competitions.',
            color: 'purple-500',
            subteam: 'Business & Marketing'
        },
        {
            name: 'Asad Ullah Akib',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            img: '/assets/asad-ullah-akib.jpg',
            description: 'Building partnerships and securing sponsorships. Akib brings business development expertise to fuel our racing ambitions.',
            color: 'purple-500',
            subteam: 'Business & Marketing'
        },
        {
            name: 'Proggha Parmita Sakura',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            img: '/assets/proggha-parmita-sakura.jpg',
            description: 'Leading content creation and social media strategy. Sakura connects our team with fans and supporters through engaging storytelling.',
            color: 'purple-500',
            subteam: 'Business & Marketing'
        },
        {
            name: 'Kazi Ahnaf Muttaquif Ahmed',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis and Suspension',
            img: '/assets/kazi-ahnaf-muttaquif.jpg',
            description: 'Engineering the structural backbone of our race car. Kazi ensures the chassis provides optimal rigidity and safety while minimizing weight.',
            color: 'green-500',
            subteam: 'Chassis & Suspension'
        },
        {
            name: 'Suhail Ashraf',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            img: '/assets/suhail-ashraf.jpg',
            description: 'Designing suspension geometry for maximum grip and handling. Suhail optimizes vehicle dynamics for peak cornering performance.',
            color: 'green-500',
            subteam: 'Chassis & Suspension'
        },
        {
            name: 'Muhtasim Saad Shameem',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            img: '/assets/muhtasim-saad-shameem.jpg',
            description: 'Focused on suspension tuning and ride quality. Muhtasim brings expertise in vehicle dynamics to enhance driver confidence.',
            color: 'green-500',
            subteam: 'Chassis & Suspension'
        },
        {
            name: 'Khandkar Sajiduzzaman',
            role: 'CHASSIS & SUSPENSION',
            title: 'Chassis & Suspension',
            img: '/assets/khandkar-sajiduzzaman.jpg',
            description: 'Structural analysis and chassis optimization specialist. Sajiduzzaman ensures our frame meets the highest safety and performance standards.',
            color: 'green-500',
            subteam: 'Chassis & Suspension'
        },
        {
            name: 'Ishmam Mohammed Chowdhury',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            img: '/assets/ishmam-mohammed-chowdhury.jpg',
            description: 'Specializing in aerodynamic design and driver comfort. Ishmam optimizes airflow and cockpit ergonomics for peak performance and driver experience.',
            color: 'cyan-500',
            subteam: 'Aerodynamics & Ergonomics'
        },
        {
            name: 'Nafiz Shahriar Sami',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            img: '/assets/nafiz-shahriar-sami.jpg',
            description: 'Engineering excellence in downforce and drag optimization. Nafiz brings innovative solutions to maximize vehicle aerodynamic efficiency.',
            color: 'cyan-500',
            subteam: 'Aerodynamics & Ergonomics'
        },
        {
            name: 'Sahil Sajjad',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            img: '/assets/sahil-sajjad.jpg',
            description: 'Focused on CFD analysis and wind tunnel testing. Sahil ensures our aerodynamic package delivers optimal performance on the track.',
            color: 'cyan-500',
            subteam: 'Aerodynamics & Ergonomics'
        },
        {
            name: 'Nishat Jahan Nabila',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            img: '/assets/nishat-jahan-nabila.jpg',
            description: 'Expertise in ergonomic design and human factors engineering. Nabila creates driver interfaces that enhance control and reduce fatigue.',
            color: 'cyan-500',
            subteam: 'Aerodynamics & Ergonomics'
        },
        {
            name: 'Maruf Mahmud',
            role: 'AERODYNAMICS & ERGONOMICS',
            title: 'Aerodynamics & Ergonomics',
            img: '/assets/maruf-mahmud.jpg',
            description: 'Dedicated to aerodynamic component design and testing. Maruf brings precision engineering to wings, diffusers, and body panels.',
            color: 'cyan-500',
            subteam: 'Aerodynamics & Ergonomics'
        }
    ];

    // Group members by subteam
    const leadership = leaders.filter(m => m.subteam === 'Leadership');
    const electronicsPowertrain = leaders.filter(m => m.subteam === 'Electronics & Powertrain');
    const businessMarketing = leaders.filter(m => m.subteam === 'Business & Marketing');
    const chassisSuspension = leaders.filter(m => m.subteam === 'Chassis & Suspension');
    const aerodynamicsErgonomics = leaders.filter(m => m.subteam === 'Aerodynamics & Ergonomics');

    return (
        <>
            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="md:w-1/2 relative">
                                    <img
                                        src={selectedMember.img}
                                        alt={selectedMember.name}
                                        className="w-full h-64 md:h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
                                </div>

                                {/* Details */}
                                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                    <span className={`inline-block px-4 py-2 bg-${selectedMember.color}/20 text-${selectedMember.color} text-sm font-bold rounded-full mb-4 w-fit`}>
                                        {selectedMember.role}
                                    </span>
                                    <h2 className="text-4xl font-bold text-white mb-2">{selectedMember.name}</h2>
                                    <p className={`text-${selectedMember.color} font-medium text-xl mb-6`}>{selectedMember.title}</p>
                                    <p className="text-gray-300 leading-relaxed text-lg">{selectedMember.description}</p>

                                    <div className="mt-8 pt-6 border-t border-slate-700">
                                        <p className="text-gray-500 text-sm">Team OSHSHAROHI • BRAC University</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-12">
                {/* Leadership Section */}
                <div>
                    <button
                        onClick={() => toggleSection('leadership')}
                        className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-brand-red/20 rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-brand-red" />
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-brand-red transition-colors">Leadership</h3>
                        <motion.div
                            animate={{ rotate: expandedSections.leadership ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {expandedSections.leadership && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {leadership.map((leader, index) => (
                                        <motion.div
                                            key={leader.name}
                                            initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-${leader.color}/30 hover:border-${leader.color} transition-all group cursor-pointer`}
                                            onClick={() => setSelectedMember(leader)}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={leader.img}
                                                    alt={`${leader.name} - ${leader.role}`}
                                                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 bg-${leader.color} text-white text-sm font-bold rounded-full`}>
                                                        {leader.role}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                        Click to view
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">{leader.name}</h3>
                                                <p className={`text-${leader.color} font-medium mb-3`}>{leader.title}</p>
                                                <p className="text-gray-400 text-sm line-clamp-2">{leader.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Electronics & Powertrain Section */}
                <div>
                    <button
                        onClick={() => toggleSection('electronicsPowertrain')}
                        className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors">Electronics, Powertrain & Drivetrain</h3>
                            <p className="text-gray-400 text-sm">Optimizing the energy flow</p>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedSections.electronicsPowertrain ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {expandedSections.electronicsPowertrain && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {electronicsPowertrain.map((member, index) => (
                                        <motion.div
                                            key={member.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                            className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-${member.color}/30 hover:border-${member.color} transition-all group cursor-pointer`}
                                            onClick={() => setSelectedMember(member)}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={member.img}
                                                    alt={`${member.name} - ${member.role}`}
                                                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 bg-${member.color} text-white text-sm font-bold rounded-full`}>
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                        Click to view
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                                <p className={`text-${member.color} font-medium mb-3`}>{member.title}</p>
                                                <p className="text-gray-400 text-sm line-clamp-2">{member.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Business, Marketing & Logistics Section */}
                <div>
                    <button
                        onClick={() => toggleSection('businessMarketing')}
                        className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-purple-500 transition-colors">Business, Marketing & Logistics</h3>
                            <p className="text-gray-400 text-sm">Driving partnerships and brand presence</p>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedSections.businessMarketing ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {expandedSections.businessMarketing && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {businessMarketing.map((member, index) => (
                                        <motion.div
                                            key={member.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                            className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-${member.color}/30 hover:border-${member.color} transition-all group cursor-pointer`}
                                            onClick={() => setSelectedMember(member)}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={member.img}
                                                    alt={`${member.name} - ${member.role}`}
                                                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 bg-${member.color} text-white text-sm font-bold rounded-full`}>
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                        Click to view
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                                <p className={`text-${member.color} font-medium mb-3`}>{member.title}</p>
                                                <p className="text-gray-400 text-sm line-clamp-2">{member.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Chassis & Suspension Section */}
                <div>
                    <button
                        onClick={() => toggleSection('chassisSuspension')}
                        className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Layers className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors">Chassis & Suspension</h3>
                            <p className="text-gray-400 text-sm">Building the backbone of performance</p>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedSections.chassisSuspension ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {expandedSections.chassisSuspension && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {chassisSuspension.map((member, index) => (
                                        <motion.div
                                            key={member.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                            className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-${member.color}/30 hover:border-${member.color} transition-all group cursor-pointer`}
                                            onClick={() => setSelectedMember(member)}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={member.img}
                                                    alt={`${member.name} - ${member.role}`}
                                                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 bg-${member.color} text-white text-sm font-bold rounded-full`}>
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                        Click to view
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                                <p className={`text-${member.color} font-medium mb-3`}>{member.title}</p>
                                                <p className="text-gray-400 text-sm line-clamp-2">{member.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Aerodynamics & Ergonomics Section */}
                <div>
                    <button
                        onClick={() => toggleSection('aerodynamicsErgonomics')}
                        className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                            <Wind className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-500 transition-colors">Aerodynamics & Ergonomics</h3>
                            <p className="text-gray-400 text-sm">Optimizing airflow and driver comfort</p>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedSections.aerodynamicsErgonomics ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-auto"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {expandedSections.aerodynamicsErgonomics && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {aerodynamicsErgonomics.map((member, index) => (
                                        <motion.div
                                            key={member.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                            className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-${member.color}/30 hover:border-${member.color} transition-all group cursor-pointer`}
                                            onClick={() => setSelectedMember(member)}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={member.img}
                                                    alt={`${member.name} - ${member.role}`}
                                                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 bg-${member.color} text-white text-sm font-bold rounded-full`}>
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                                        Click to view
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                                <p className={`text-${member.color} font-medium mb-3`}>{member.title}</p>
                                                <p className="text-gray-400 text-sm line-clamp-2">{member.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Other Team Members Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Chief Engineer', role: 'Technical Head' },
                        { name: 'Design Lead', role: 'Aerodynamics' },
                        { name: 'Electronics Head', role: 'Systems Integration' },
                        { name: 'Manufacturing Lead', role: 'Production' },
                    ].map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center hover:border-slate-500 transition-all"
                        >
                            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <Users className="w-8 h-8 text-gray-500" />
                            </div>
                            <h4 className="font-semibold text-white text-sm">{member.name}</h4>
                            <p className="text-gray-500 text-xs">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

// Workshop Tab Content
const WorkshopTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Wrench className="w-6 h-6 text-yellow-500" />
                    Workshop Facilities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'CNC Machines', value: '5' },
                        { label: '3D Printers', value: '8' },
                        { label: 'Work Stations', value: '20' },
                        { label: 'Test Rigs', value: '3' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700"
                        >
                            <div className="text-3xl font-bold text-yellow-500">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-lg font-bold text-white mb-4">Current Projects</h4>
                <div className="space-y-3">
                    {['Chassis Assembly', 'Suspension Testing', 'Aero Package Build'].map((project, i) => (
                        <div key={project} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            {project}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700">
            <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop"
                alt="Workshop"
                className="w-full h-80 object-cover"
            />
            <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">State-of-the-Art Facility</h4>
                <p className="text-gray-400">
                    Our workshop is equipped with cutting-edge machinery and tools to manufacture competition-grade components.
                </p>
            </div>
        </div>
    </div>
);

// Competition Tab Content
const CompetitionTab = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { year: '2024', event: 'Formula Student UK', result: '15th Overall', icon: Trophy },
                { year: '2023', event: 'Formula Bharat', result: '8th Overall', icon: Award },
                { year: '2023', event: 'FS Austria', result: 'Design Award', icon: Star },
            ].map((comp, i) => (
                <motion.div
                    key={comp.event}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 text-center hover:border-green-500/50 transition-all"
                >
                    <comp.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <div className="text-sm text-green-500 font-medium mb-1">{comp.year}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{comp.event}</h4>
                    <p className="text-gray-400">{comp.result}</p>
                </motion.div>
            ))}
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-500" />
                Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { event: 'Formula Student Germany', date: 'Aug 2025', status: 'Registered' },
                    { event: 'Formula Bharat 2025', date: 'Jan 2025', status: 'Preparing' },
                ].map((event, i) => (
                    <div key={event.event} className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div>
                            <h5 className="font-semibold text-white">{event.event}</h5>
                            <p className="text-gray-400 text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {event.date}
                            </p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                            {event.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Research Paper Tab Content
const ResearchTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
            {
                title: 'Aerodynamic Optimization of Formula Student Vehicles',
                authors: 'Team OSHSHAROHI',
                journal: 'SAE International',
                year: '2024',
                citations: 12
            },
            {
                title: 'Battery Management Systems for Electric Race Cars',
                authors: 'Electronics Division',
                journal: 'IEEE Conference',
                year: '2023',
                citations: 8
            },
            {
                title: 'Lightweight Composite Chassis Design',
                authors: 'Chassis Team',
                journal: 'Formula Student Research',
                year: '2023',
                citations: 15
            },
            {
                title: 'Data-Driven Suspension Tuning Methods',
                authors: 'Vehicle Dynamics Team',
                journal: 'Motorsport Engineering',
                year: '2024',
                citations: 6
            },
        ].map((paper, i) => (
            <motion.div
                key={paper.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{paper.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{paper.authors}</p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-400">{paper.journal} • {paper.year}</span>
                            <span className="text-gray-500">{paper.citations} citations</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);

// Patent Tab Content
const PatentTab = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                {
                    title: 'Novel Cooling System for High-Performance Motors',
                    number: 'BD-2024-001234',
                    status: 'Granted',
                    date: 'March 2024'
                },
                {
                    title: 'Adaptive Aerodynamic Wing System',
                    number: 'BD-2023-005678',
                    status: 'Pending',
                    date: 'October 2023'
                },
            ].map((patent, i) => (
                <motion.div
                    key={patent.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Award className="w-7 h-7 text-purple-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${patent.status === 'Granted'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {patent.status}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{patent.title}</h4>
                            <p className="text-gray-400 text-sm">Patent No: {patent.number}</p>
                            <p className="text-gray-500 text-sm">{patent.date}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 rounded-2xl p-8 border border-purple-500/30 text-center">
            <Award className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Innovation Hub</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Our team is committed to pushing the boundaries of automotive engineering. We actively pursue intellectual property protection for our innovative solutions.
            </p>
        </div>
    </div>
);

export { RacingTabs };
export default RacingTabs;
