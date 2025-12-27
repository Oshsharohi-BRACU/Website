import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUB_TEAMS } from '../constants';
import * as Icons from 'lucide-react';
import { SubTeam } from '../types';

const SubTeamTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SUB_TEAMS[0].id);

  const activeTeam: SubTeam | undefined = SUB_TEAMS.find(t => t.id === activeTab);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-center text-gray-800 dark:text-white">
        Operational <span className="text-brand-red">Sub-Teams</span>
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {SUB_TEAMS.map((team) => {
          // Dynamic Icon Rendering
          const IconComponent = (Icons as any)[team.icon] || Icons.Circle;
          const isActive = activeTab === team.id;

          return (
            <button
              key={team.id}
              onClick={() => setActiveTab(team.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 border ${
                isActive
                  ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-brand-red hover:text-brand-red'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="font-semibold text-sm">{team.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTeam && (
            <motion.div
              key={activeTeam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-slate-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column: Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-brand-red/10 rounded-lg text-brand-red">
                      {React.createElement((Icons as any)[activeTeam.icon] || Icons.Circle, { size: 32 })}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      {activeTeam.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {activeTeam.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-3">
                        <Icons.Target className="w-5 h-5 text-brand-accent" /> Strategic Goals
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                        {activeTeam.goals.map((goal, idx) => (
                          <li key={idx}>{goal}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-3">
                        <Icons.Trophy className="w-5 h-5 text-yellow-500" /> Key Achievements
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                        {activeTeam.achievements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Column: Members */}
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-2">
                    Key Personnel
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-brand-red"
                        />
                        <div>
                          <p className="font-bold text-sm text-gray-800 dark:text-white">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 border border-dashed border-gray-300 dark:border-slate-600 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Want to join this sub-team?</p>
                    <button className="text-brand-red font-semibold text-sm hover:underline">View Open Positions</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubTeamTabs;