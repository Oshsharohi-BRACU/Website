"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

// Simple scroll-following racing track SVG - no duplicate content
const RacingScrollSection: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    return (
        <section
            ref={ref}
            className="relative w-full h-[200vh] overflow-hidden pointer-events-none"
        >
            {/* Racing Track SVG that follows scroll */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <RacingTrackPath scrollYProgress={scrollYProgress} />
            </div>
        </section>
    );
};

// Racing Track SVG Path - purely decorative animation
const RacingTrackPath = ({
    scrollYProgress,
}: {
    scrollYProgress: any;
}) => {
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const pathOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.2]);

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
            {/* Background track outline */}
            <motion.path
                d="M100,400 
           C200,200 400,100 600,150 
           C800,200 900,350 950,400 
           C1000,450 1050,500 1100,450 
           C1150,400 1100,300 1000,280 
           C900,260 850,320 900,380 
           C950,440 1050,460 1100,500 
           C1150,540 1100,620 950,650 
           C800,680 600,660 450,620 
           C300,580 200,500 150,450 
           C100,400 100,350 150,300 
           C200,250 350,220 500,250 
           C650,280 750,350 800,400"
                stroke="#1e293b"
                strokeWidth="40"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
            />

            {/* Animated racing line */}
            <motion.path
                d="M100,400 
           C200,200 400,100 600,150 
           C800,200 900,350 950,400 
           C1000,450 1050,500 1100,450 
           C1150,400 1100,300 1000,280 
           C900,260 850,320 900,380 
           C950,440 1050,460 1100,500 
           C1150,540 1100,620 950,650 
           C800,680 600,660 450,620 
           C300,580 200,500 150,450 
           C100,400 100,350 150,300 
           C200,250 350,220 500,250 
           C650,280 750,350 800,400"
                stroke="url(#racingGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                style={{
                    pathLength,
                    opacity: pathOpacity,
                }}
            />

            {/* Gradient definition */}
            <defs>
                <linearGradient id="racingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E11D48" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
            </defs>

            {/* Animated dot at path end */}
            <motion.circle
                cx="800"
                cy="400"
                r="10"
                fill="#E11D48"
                style={{
                    opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
                }}
            />
        </svg>
    );
};

export { RacingScrollSection };
export default RacingScrollSection;
