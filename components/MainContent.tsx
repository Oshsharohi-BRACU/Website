import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Eye, User, Layers, ArrowRight } from 'lucide-react';
import SubTeamTabs from './SubTeamTabs';
import Sponsors from './Sponsors';
import { RacingScrollSection } from './ui/svg-follow-scroll';
import { RacingTabs } from './ui/racing-tabs';
import { SOCIAL_LINKS } from '../constants';
import * as Icons from 'lucide-react';

interface MainContentProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ toggleTheme, isDark }) => {
  // Animation variants for the "exploded view" effect from center
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-br-lg rounded-tl-lg" />
            <span className="font-display font-bold text-xl dark:text-white">OSHSHAROHI</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
              <a href="#about" className="hover:text-brand-red transition-colors">About</a>
              <a href="#team" className="hover:text-brand-red transition-colors">Team</a>

              <a href="#sponsors" className="hover:text-brand-red transition-colors">Sponsors</a>
              <a href="#projects" className="hover:text-brand-red transition-colors">Projects</a>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content - "Exploding" from car position concept */}
      <motion.div
        className="pt-32 pb-4 px-4 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-6">
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-4"
          >
            DRIVE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">FUTURE</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A premier student initiative at BRAC University dedicated to pushing the boundaries of automotive engineering and sustainable mobility.
          </motion.p>
        </div>
      </motion.div>

      {/* Racing Track Scroll Animation Section */}
      <RacingScrollSection
        headline={{
          line1: "Engineering",
          line2: "Excellence On",
          line3: "Every Curve"
        }}
        subtitle="Scroll to trace our racing journey"
        stats={[
          { label: "Top Speed", value: "120+ km/h" },
          { label: "0-100 km/h", value: "4.5s" },
          { label: "Power", value: "80+ HP" },
          { label: "Weight", value: "~250 kg" }
        ]}
      />

      {/* Continue with main content */}
      <motion.div
        className="pb-12 px-4 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* The Core Pillars (Vision, Mission, Advisor) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div variants={itemVariants} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-l-4 border-brand-red overflow-hidden hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Eye size={100} className="text-brand-red" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4 text-brand-red">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become a global leader in student-led automotive innovation, fostering a culture of excellence where engineering meets sustainability.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-l-4 border-brand-accent overflow-hidden hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Flag size={100} className="text-brand-accent" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4 text-brand-accent">
                <Flag size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To design, build, and race high-performance vehicles while empowering students with hands-on technical skills and leadership experience.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-l-4 border-purple-500 overflow-hidden hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={100} className="text-purple-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-500">
                <User size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Faculty Advisor</h3>
              <div className="flex items-center gap-4 mt-4">
                <img src="https://picsum.photos/100/100?random=10" alt="Advisor" className="w-16 h-16 rounded-full border-2 border-purple-500" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">Dr. Arshad Rahman</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Professor, EEE Dept.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Racing Divisions Tabs - Car-Themed Tab System */}
        <motion.section variants={itemVariants} id="team" className="mb-20">
          <RacingTabs />
        </motion.section>

        {/* Projects / Gallery Preview */}
        <motion.section variants={itemVariants} id="our-project" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left - Text / Stats */}
            <div>
              <p className="text-sm uppercase text-brand-accent font-medium mb-2">Our Machine</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">The Beast</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our latest Formula Student car represents years of research, innovation, and engineering excellence. Every component is meticulously designed and crafted to deliver peak performance on the track.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 text-white dark:bg-slate-800 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-400">Top Speed</span>
                  <span className="text-2xl font-bold">120+ km/h</span>
                </div>
                <div className="bg-gray-900 text-white dark:bg-slate-800 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-400">Power Output</span>
                  <span className="text-2xl font-bold">80+ HP</span>
                </div>
                <div className="bg-gray-900 text-white dark:bg-slate-800 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-400">Weight</span>
                  <span className="text-2xl font-bold">~250 kg</span>
                </div>
                <div className="bg-gray-900 text-white dark:bg-slate-800 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-400">0-100 km/h</span>
                  <span className="text-2xl font-bold">4.5s</span>
                </div>
              </div>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3"><span className="mt-1 text-brand-red">•</span><span>Custom-designed carbon fiber monocoque chassis</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-brand-red">•</span><span>Advanced aerodynamics package with active elements</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-brand-red">•</span><span>Lightweight suspension with adjustable damping</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 text-brand-red">•</span><span>High-efficiency powertrain with optimized cooling</span></li>
              </ul>

              <div className="mt-6">
                <a href="#projects" className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition-all">
                  View Project Portfolio <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right - Image / Build card */}
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
                <img src="/assets/tiger.jpg" alt="Tiger — project vehicle" className="w-full h-64 md:h-96 object-cover" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center p-4 bg-black/50 rounded-md border border-gray-700">
                  <div>
                    <div className="text-xs uppercase text-gray-300">Current Build</div>
                    <div className="text-lg font-bold text-white">OS-24</div>
                  </div>
                  <div className="p-2 bg-brand-red rounded-full text-white">
                    {/** use lucide icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section variants={itemVariants} id="projects" className="mb-20">
          <div className="bg-brand-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Built for Speed. <br />Engineered for Efficiency.</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Explore our latest prototype, the OSH-V3, featuring a custom carbon fiber chassis and proprietary battery management system.
              </p>
              <button className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 mx-auto">
                View Project Portfolio <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sponsors Section */}
        <Sponsors />

      </motion.div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-lg" />
            <div>
              <h4 className="font-display font-bold text-lg dark:text-white">BRACU OSHSHAROHI</h4>
              <p className="text-xs text-gray-500">© 2024 BRAC University. All rights reserved.</p>
            </div>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = (Icons as any)[link.icon] || Icons.Link;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-brand-red hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainContent;