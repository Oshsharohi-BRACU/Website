import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import bracuLogo from '../assets/bracu-logo.png';

const Sponsors: React.FC = () => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    interface Partner {
        id: number;
        name: string;
        tier: string;
        icon: React.ElementType;
        image?: string;
        tierColor: string;
        borderColor: string;
    }

    const partners: Partner[] = [
        {
            id: 1,
            name: 'BRAC University',
            tier: 'TITLE SPONSOR',
            icon: Building2,
            image: bracuLogo,
            tierColor: 'text-brand-red',
            borderColor: 'border-brand-red/50'
        }
    ];

    return (
        <section id="sponsors" className="py-20 bg-gray-950 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="mb-16"
                >
                    <h3 className="text-brand-red font-bold uppercase tracking-widest mb-2">Our Partners</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
                        Powered by <span className="text-brand-red">Excellence</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We're grateful to our sponsors who believe in our vision and support our journey towards engineering excellence.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -5 }}
                            variants={itemVariants}
                            className={`bg-gray-900/50 backdrop-blur-sm border ${partner.borderColor} rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-900 transition-all duration-300 group w-full md:w-1/3`}
                        >
                            <div className="w-48 h-48 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {partner.image ? (
                                    <img src={partner.image} alt={partner.name} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                                        <partner.icon size={32} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-2">{partner.name}</h3>
                            <p className={`text-xs font-bold uppercase tracking-wider ${partner.tierColor}`}>{partner.tier}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-500 mb-6">Interested in becoming a sponsor?</p>
                    <a href="#contact" className="inline-block bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded uppercase tracking-wide transition-colors">
                        Partner With Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
