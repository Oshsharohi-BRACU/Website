import Hero from "@/components/ui/animated-shader-hero";

// Demo Component showing how to use the Hero with BRACU OSHSHAROHI branding
const HeroDemo: React.FC = () => {
    const handlePrimaryClick = () => {
        console.log('Start Engine clicked!');
        // Add navigation or action logic here
    };

    const handleSecondaryClick = () => {
        console.log('View Specs clicked!');
        // Add navigation or action logic here
    };

    return (
        <div className="w-full">
            <Hero
                trustBadge={{
                    text: "Formula Student • Engineering Excellence",
                    icons: ["🏎️"]
                }}
                headline={{
                    line1: "BRACU",
                    line2: "OSHSHAROHI"
                }}
                subtitle="Engineering the future of motorsport. Our Formula Student team pushes the boundaries of innovation, precision, and performance — one race at a time."
                buttons={{
                    primary: {
                        text: "Start Engine",
                        onClick: handlePrimaryClick
                    },
                    secondary: {
                        text: "View Specs",
                        onClick: handleSecondaryClick
                    }
                }}
            />

            {/* Additional content below hero */}
            <div className="bg-slate-900 p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        How to Use the Hero Component
                    </h2>
                    <div className="bg-slate-800 p-6 rounded-lg border border-rose-500/20">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`<Hero
  trustBadge={{
    text: "Your trust badge text",
    icons: ["🏎️"] // optional emoji icons
  }}
  headline={{
    line1: "First Line",
    line2: "Second Line"
  }}
  subtitle="Your compelling subtitle text..."
  buttons={{
    primary: {
      text: "Primary CTA",
      onClick: handlePrimaryClick
    },
    secondary: {
      text: "Secondary CTA", 
      onClick: handleSecondaryClick
    }
  }}
  className="custom-classes" // optional
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDemo;
