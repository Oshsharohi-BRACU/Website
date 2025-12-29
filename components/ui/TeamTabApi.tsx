"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ChevronDown,
    Zap,
    Star,
    Layers,
    Wind,
    Award,
    Loader2
} from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    title: string;
    img: string;
    description: string;
    color: string;
    subteam: string;
}

interface GroupedTeamMembers {
    [subteam: string]: TeamMember[];
}

interface TeamTabApiProps {
    className?: string;
}

// Fallback data when API is not available (for production deployment)
const FALLBACK_MEMBERS: GroupedTeamMembers = {
    'Leadership': [
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
        }
    ],
    'Electronics & Powertrain': [
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
            description: "Expertise in electronic control systems and powertrain integration. Jarif brings precision engineering to our vehicle's core systems.",
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
        }
    ],
    'Business & Marketing': [
        {
            name: 'Ashfia Rahman',
            role: 'BUSINESS & MARKETING',
            title: 'Business, Marketing & Logistics',
            img: '/assets/ashfia-rahman.jpg',
            description: "Driving brand visibility and sponsorship relations. Ashfia brings strategic marketing expertise to elevate Team OSHSHAROHI's presence in the motorsport community.",
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
        }
    ],
    'Chassis & Suspension': [
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
        }
    ],
    'Aerodynamics & Ergonomics': [
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
    ]
};

const TeamTabApi: React.FC<TeamTabApiProps> = ({ className = '' }) => {
    const [members, setMembers] = useState<GroupedTeamMembers | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);

    // Track which sections are expanded (all collapsed by default)
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        leadership: false,
        electronicsPowertrain: false,
        businessMarketing: false,
        chassisSuspension: false,
        aerodynamicsErgonomics: false
    });

    useEffect(() => {
        async function loadMembers() {
            try {
                setLoading(true);

                // Try to fetch from API
                const API_BASE_URL = 'http://localhost:3001';
                const response = await fetch(`${API_BASE_URL}/api/team-members-grouped`, {
                    signal: AbortSignal.timeout(3000) // 3 second timeout
                });

                if (!response.ok) {
                    throw new Error('API not available');
                }

                const result = await response.json();

                if (result.success && result.data) {
                    // Transform API data
                    const transformedData: GroupedTeamMembers = {};
                    for (const [subteam, apiMembers] of Object.entries(result.data)) {
                        transformedData[subteam] = (apiMembers as any[]).map(m => ({
                            name: m.name,
                            role: m.role,
                            title: m.title,
                            img: m.img || m.image_path || '',
                            description: m.description,
                            color: m.color,
                            subteam: subteam
                        }));
                    }
                    setMembers(transformedData);
                    setUsingFallback(false);
                } else {
                    throw new Error('Invalid API response');
                }
            } catch (err) {
                // Use fallback data when API is not available
                console.log('API not available, using fallback data');
                setMembers(FALLBACK_MEMBERS);
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        }
        loadMembers();
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-brand-red animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading team members...</p>
                </div>
            </div>
        );
    }

    if (!members) {
        return null;
    }

    // Get members by subteam
    const leadership = members['Leadership'] || [];
    const electronicsPowertrain = members['Electronics & Powertrain'] || [];
    const businessMarketing = members['Business & Marketing'] || [];
    const chassisSuspension = members['Chassis & Suspension'] || [];
    const aerodynamicsErgonomics = members['Aerodynamics & Ergonomics'] || [];

    // Section renderer helper
    const renderSection = (
        sectionKey: string,
        title: string,
        subtitle: string,
        icon: React.ReactNode,
        iconBgClass: string,
        iconColorClass: string,
        titleHoverClass: string,
        sectionMembers: TeamMember[],
        delay: number = 0
    ) => (
        <div>
            <button
                onClick={() => toggleSection(sectionKey)}
                className="flex items-center gap-3 mb-6 w-full text-left group cursor-pointer"
            >
                <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <h3 className={`text-2xl font-bold text-white ${titleHoverClass} transition-colors`}>{title}</h3>
                    <p className="text-gray-400 text-sm">{subtitle}</p>
                </div>
                <motion.div
                    animate={{ rotate: expandedSections[sectionKey] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-auto"
                >
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {expandedSections[sectionKey] && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sectionMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: delay + index * 0.1 }}
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
    );

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

            <div className={`space-y-12 ${className}`}>
                {/* Leadership Section */}
                {leadership.length > 0 && renderSection(
                    'leadership',
                    'Leadership',
                    'Guiding the team to victory',
                    <Star className="w-5 h-5 text-brand-red" />,
                    'bg-brand-red/20',
                    'text-brand-red',
                    'group-hover:text-brand-red',
                    leadership,
                    0
                )}

                {/* Electronics & Powertrain Section */}
                {electronicsPowertrain.length > 0 && renderSection(
                    'electronicsPowertrain',
                    'Electronics, Powertrain & Drivetrain',
                    'Optimizing the energy flow',
                    <Zap className="w-5 h-5 text-blue-500" />,
                    'bg-blue-500/20',
                    'text-blue-500',
                    'group-hover:text-blue-500',
                    electronicsPowertrain,
                    0.2
                )}

                {/* Business, Marketing & Logistics Section */}
                {businessMarketing.length > 0 && renderSection(
                    'businessMarketing',
                    'Business, Marketing & Logistics',
                    'Driving partnerships and brand presence',
                    <Award className="w-5 h-5 text-purple-500" />,
                    'bg-purple-500/20',
                    'text-purple-500',
                    'group-hover:text-purple-500',
                    businessMarketing,
                    0.3
                )}

                {/* Chassis & Suspension Section */}
                {chassisSuspension.length > 0 && renderSection(
                    'chassisSuspension',
                    'Chassis & Suspension',
                    'Building the backbone of performance',
                    <Layers className="w-5 h-5 text-green-500" />,
                    'bg-green-500/20',
                    'text-green-500',
                    'group-hover:text-green-500',
                    chassisSuspension,
                    0.4
                )}

                {/* Aerodynamics & Ergonomics Section */}
                {aerodynamicsErgonomics.length > 0 && renderSection(
                    'aerodynamicsErgonomics',
                    'Aerodynamics & Ergonomics',
                    'Optimizing airflow and driver comfort',
                    <Wind className="w-5 h-5 text-cyan-500" />,
                    'bg-cyan-500/20',
                    'text-cyan-500',
                    'group-hover:text-cyan-500',
                    aerodynamicsErgonomics,
                    0.5
                )}

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

export default TeamTabApi;
export { TeamTabApi };
