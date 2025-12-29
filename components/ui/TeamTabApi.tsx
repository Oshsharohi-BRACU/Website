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
import { fetchTeamMembersGrouped, GroupedTeamMembers, getImageUrl } from '../../api/teamApi';

interface TeamMember {
    name: string;
    role: string;
    title: string;
    img: string;
    description: string;
    color: string;
    subteam: string;
}

interface TeamTabApiProps {
    className?: string;
}

const TeamTabApi: React.FC<TeamTabApiProps> = ({ className = '' }) => {
    const [members, setMembers] = useState<GroupedTeamMembers | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
                const data = await fetchTeamMembersGrouped();
                setMembers(data);
                setError(null);
            } catch (err) {
                console.error('Failed to load team members:', err);
                setError('Failed to load team members from database');
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

    // Transform API data to component format
    const transformMembers = (apiMembers: any[]): TeamMember[] => {
        return apiMembers.map(m => ({
            name: m.name,
            role: m.role,
            title: m.title,
            img: getImageUrl(m.img || m.image_path || ''),
            description: m.description,
            color: m.color,
            subteam: m.subteam || ''
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-brand-red animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading team members from database...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!members) {
        return null;
    }

    // Get members by subteam
    const leadership = transformMembers(members['Leadership'] || []);
    const electronicsPowertrain = transformMembers(members['Electronics & Powertrain'] || []);
    const businessMarketing = transformMembers(members['Business & Marketing'] || []);
    const chassisSuspension = transformMembers(members['Chassis & Suspension'] || []);
    const aerodynamicsErgonomics = transformMembers(members['Aerodynamics & Ergonomics'] || []);

    // Section renderer helper
    const renderSection = (
        sectionKey: string,
        title: string,
        subtitle: string,
        icon: React.ReactNode,
        iconBgClass: string,
        iconColorClass: string,
        titleHoverClass: string,
        members: TeamMember[],
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
                            {members.map((member, index) => (
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
                                        <p className="text-gray-600 text-xs mt-1">Data loaded from SQLite database</p>
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
