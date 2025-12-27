import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onComplete: () => void;
}

// Car/Racing themed WebGL shader
const shaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}

float speedStreaks(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*8.+p.x*.4+.15*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=1.8/(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=speedStreaks(vec2(st.x+T*.8,-st.y*.5));
  uv*=1.-.25*(sin(T*.25)*.5+.5);
  for (float i=1.; i<10.; i++) {
    uv+=.08*cos(i*vec2(.15+.008*i, .6)+i*i+T*.7+.08*uv.x);
    vec2 p=uv;
    float d=length(p);
    vec3 racingRed = vec3(0.88, 0.11, 0.28);
    vec3 darkCrimson = vec3(0.55, 0.05, 0.15);
    col+=.0015/d*(cos(sin(i)*vec3(0.2,0.8,1.2))*racingRed+darkCrimson);
    float b=noise(i+p+bg*1.5);
    col+=.0025*b/length(max(p,vec2(b*p.x*.03,p.y*.8)));
    col=mix(col,vec3(bg*.18,bg*.06,bg*.08),d*.7);
  }
  col += vec3(0.02, 0.005, 0.01);
  vec2 vigUv = FC/R;
  float vignette = 1.0 - length(vigUv - 0.5) * 0.5;
  col *= vignette;
  O=vec4(col,1);
}`;

// WebGL Shader Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, `#version 300 es
      precision highp float;
      in vec4 position;
      void main(){gl_Position=position;}`);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, shaderSource);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    programRef.current = program;

    // Setup geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      if (!programRef.current) return;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(programRef.current);
      gl.uniform2f(gl.getUniformLocation(programRef.current, 'resolution'), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(programRef.current, 'time'), now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return canvasRef;
};

const LandingPage: React.FC<LandingPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Enter, 1: Idle, 2: Exit
  const canvasRef = useShaderBackground();

  useEffect(() => {
    // Initial entrance animation timer
    const timer = setTimeout(() => {
      setStep(1);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setStep(2);
    // Add a slight delay for the exit animation before switching component
    setTimeout(onComplete, 1200);
  };

  return (
    <div className="fixed inset-0 bg-brand-dark overflow-hidden flex flex-col items-center justify-center z-40">
      {/* WebGL Shader Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'black' }}
      />

      {/* Atmospheric Fog Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 0 ? 0.8 : 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(225, 29, 72, 0.15), transparent 60%)'
        }}
      />

      <div className="relative z-20 flex flex-col items-center w-full max-w-7xl px-4">
        {/* Logo Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-4 md:mb-12 relative"
        >
          <h1 className="text-5xl md:text-8xl font-display font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            BRACU <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-600">OSHSHAROHI</span>
          </h1>
          <div className="h-1 w-24 bg-brand-red mx-auto mt-6 mb-4 skew-x-[-20deg]" />
          <p className="text-gray-400 tracking-[0.4em] text-xs md:text-sm font-medium uppercase">
            Formula Student • Engineering • Performance
          </p>
        </motion.div>

        {/* Realistic Car Container */}
        <motion.div
          className="relative w-full max-w-[900px] h-auto aspect-[3.5/1]"
          initial={{ x: '-150%', filter: 'blur(10px)' }}
          animate={
            step === 0
              ? { x: 0, filter: 'blur(0px)' }
              : step === 1
                ? { x: 0, y: [0, 2, 0] } // Idle breathing
                : { x: '150%', opacity: 0, skewX: -5, filter: 'blur(5px)' } // Exit
          }
          transition={
            step === 0
              ? { type: 'spring', stiffness: 40, damping: 20, duration: 1.5 }
              : step === 1
                ? { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                : { duration: 0.8, ease: "anticipate" }
          }
        >
          {/* High Fidelity F1 Vector */}
          <svg viewBox="0 0 1200 350" className="w-full h-full drop-shadow-[0_50px_40px_rgba(0,0,0,1)]">
            <defs>
              {/* Realistic Paint - Red */}
              <linearGradient id="paintRedReal" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ff5f7e" stopOpacity="1" />
                <stop offset="30%" stopColor="#e11d48" stopOpacity="1" />
                <stop offset="50%" stopColor="#9f1239" stopOpacity="1" />
                <stop offset="51%" stopColor="#881337" stopOpacity="1" />
                <stop offset="100%" stopColor="#4c0519" stopOpacity="1" />
              </linearGradient>

              {/* Carbon Fiber Pattern */}
              <pattern id="carbonPattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <rect width="8" height="8" fill="#18181b" />
                <rect width="4" height="4" fill="#27272a" />
                <rect x="4" y="4" width="4" height="4" fill="#27272a" />
              </pattern>

              {/* Tire Rubber Tread */}
              <linearGradient id="tireTread" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f0f0f" />
                <stop offset="20%" stopColor="#222" />
                <stop offset="50%" stopColor="#111" />
                <stop offset="80%" stopColor="#222" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* === REAR === */}
            {/* Rear Wing Endplate Far */}
            <path d="M60,80 L50,190 L160,190 L170,80 Z" fill="url(#carbonPattern)" opacity="0.8" />

            {/* Rear Tire Far */}
            <g transform="translate(180, 220) scale(0.95)">
              <circle cx="0" cy="0" r="85" fill="#000" />
              <path d="M-85,0 a85,85 0 0 1 170,0" fill="url(#tireTread)" opacity="0.6" />
            </g>

            {/* === CHASSIS === */}

            {/* Shadow Ground Contact */}
            <ellipse cx="600" cy="290" rx="550" ry="30" fill="#000" opacity="0.8" filter="blur(10px)" />

            {/* Main Body - Engine Cover & Sidepods */}
            {/* Complex curve for sidepod undercut */}
            <path d="M150,210 
                      C150,210 280,170 400,170 
                      C500,170 550,180 650,200 
                      L900,240 
                      L910,260 
                      L250,260 
                      L160,240 Z"
              fill="url(#paintRedReal)" />

            {/* Floor / Diffuser - Carbon */}
            <path d="M100,260 L920,260 L910,275 L120,275 Z" fill="url(#carbonPattern)" />

            {/* Engine Airbox (Top Intake) */}
            <path d="M450,170 L440,130 C440,130 490,120 510,130 L530,175 Z" fill="#9f1239" />
            <path d="M445,135 C445,135 485,125 505,135" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />

            {/* Cockpit Halo */}
            <path d="M480,170 Q550,155 600,180" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" />
            <path d="M540,170 L540,148" fill="none" stroke="#111" strokeWidth="6" />

            {/* Driver Helmet */}
            <g transform="translate(530, 160)">
              <circle cx="0" cy="0" r="16" fill="#fbbf24" stroke="#000" strokeWidth="1" />
              <path d="M-10,-4 L10,-4 L10,4 L-10,4 Z" fill="#111" /> {/* Visor */}
              <path d="M-5,-4 L5,-4 L5,0 L-5,0 Z" fill="url(#paintRedReal)" opacity="0.5" /> {/* Reflection */}
            </g>

            {/* Nose Cone */}
            <path d="M650,200 C750,210 900,230 980,240 C1000,245 1000,255 960,260 L900,260" fill="url(#paintRedReal)" />

            {/* Highlight Line on Body (Horizon Reflection) */}
            <path d="M250,220 C350,190 500,190 650,210 C750,220 850,235 950,245"
              fill="none" stroke="white" strokeWidth="2" opacity="0.4" filter="blur(2px)" />

            {/* Rear Wing Near */}
            <path d="M60,110 L200,110 L200,130 L60,130 Z" fill="url(#carbonPattern)" /> {/* Main Plane */}
            <path d="M55,140 L195,140 L195,148 L55,148 Z" fill="#27272a" /> {/* DRS Flap */}

            {/* Rear Wing Endplate Near */}
            <path d="M70,90 L60,210 L180,210 L190,90 Z" fill="#18181b" stroke="#333" strokeWidth="1" />
            <path d="M80,100 L180,100" stroke="white" strokeWidth="1" opacity="0.3" /> {/* Sponsor Detail */}

            {/* Front Wing Near */}
            <g transform="translate(950, 250)">
              <path d="M0,0 L80,-10 L90,15 L-10,15 Z" fill="url(#carbonPattern)" />
              <path d="M5,5 L85,-5" stroke="#e11d48" strokeWidth="2" opacity="0.8" />
            </g>

            {/* === WHEELS NEAR === */}

            {/* Rear Tire Near */}
            <g transform="translate(180, 220)">
              <circle cx="0" cy="0" r="88" fill="#111" />
              <circle cx="0" cy="0" r="85" fill="url(#tireTread)" />
              {/* Rim */}
              <circle cx="0" cy="0" r="50" fill="#0f172a" stroke="#333" strokeWidth="2" />
              <circle cx="0" cy="0" r="45" fill="transparent" stroke="#e11d48" strokeWidth="2" opacity="0.9" /> {/* Wheel Rim Stripe */}
              {/* Central Nut */}
              <circle cx="0" cy="0" r="8" fill="#555" />
              <circle cx="0" cy="0" r="4" fill="#e11d48" />

              {/* Motion Blur Effect on Spokes */}
              <g opacity={step === 2 ? 0.2 : 1}>
                <rect x="-5" y="-45" width="10" height="90" fill="#333" rx="2" />
                <rect x="-5" y="-45" width="10" height="90" fill="#333" rx="2" transform="rotate(60)" />
                <rect x="-5" y="-45" width="10" height="90" fill="#333" rx="2" transform="rotate(120)" />
              </g>

              {/* Tire Graphics */}
              <path d="M0,0 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none" stroke="#e11d48" strokeWidth="3" strokeDasharray="20 80" filter="url(#glow)" />
            </g>

            {/* Front Tire Near */}
            <g transform="translate(880, 220)">
              <circle cx="0" cy="0" r="82" fill="#111" />
              <circle cx="0" cy="0" r="79" fill="url(#tireTread)" />
              {/* Rim */}
              <circle cx="0" cy="0" r="46" fill="#0f172a" stroke="#333" strokeWidth="2" />
              <circle cx="0" cy="0" r="42" fill="transparent" stroke="#e11d48" strokeWidth="2" opacity="0.9" />
              <circle cx="0" cy="0" r="8" fill="#555" />

              <g opacity={step === 2 ? 0.2 : 1}>
                <rect x="-5" y="-42" width="10" height="84" fill="#333" rx="2" />
                <rect x="-5" y="-42" width="10" height="84" fill="#333" rx="2" transform="rotate(60)" />
                <rect x="-5" y="-42" width="10" height="84" fill="#333" rx="2" transform="rotate(120)" />
              </g>

              {/* Tire Graphics */}
              <path d="M0,0 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" fill="none" stroke="#e11d48" strokeWidth="3" strokeDasharray="20 80" filter="url(#glow)" />
            </g>

            {/* Rain Light (Pulsing) */}
            <rect x="50" y="160" width="4" height="20" fill="#ef4444" filter="url(#glow)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
            </rect>

            {/* Speed Lines / Aero Flow */}
            {step === 2 && (
              <g stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round">
                <path d="M10,200 L-100,200" />
                <path d="M50,100 L-50,100" />
                <path d="M200,300 L0,300" />
              </g>
            )}
          </svg>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: step === 1 ? 1 : 0, y: step === 1 ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 relative z-30"
        >
          <button
            onClick={handleStart}
            className="group relative px-12 py-5 bg-transparent overflow-hidden rounded-none border border-white/20 hover:border-brand-red transition-all duration-300"
          >
            <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors duration-300" />
            <span className="relative z-10 font-display font-bold text-white tracking-[0.2em] flex items-center gap-4 text-sm md:text-base group-hover:gap-6 transition-all">
              INITIALIZE TELEMETRY <ChevronRight className="w-4 h-4 text-brand-red" />
            </span>
            {/* Tech Decoration Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>

      {/* Dynamic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

export default LandingPage;