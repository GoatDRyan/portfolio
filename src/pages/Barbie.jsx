import React, { useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import transition from '../context/transition.jsx';

// --- COMPOSANTS HELPERS (Inchangés) ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 30 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`relative transition-all duration-200 ${className}`}>{children}</motion.div>
  );
};

const ShineImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[125%] z-20 pointer-events-none" />
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
};

function Barbie() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const theme = {
    neonPink: '#fe3178',
    softPink: '#fbcfe8',
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white">
      
      {/* --- 1. HERO HEADER AVEC IMAGE --- */}
      <header className="relative h-[85vh] flex items-end pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="./barbie.png" 
                alt="Barbie Hero Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div>
            <span className="font-bold tracking-widest uppercase mb-4 block font-dunbartext bg-black/60 backdrop-blur-md w-fit px-3 py-1 rounded border border-pink-500 text-pink-400">
              Production Graphique / 2025
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-dunbartall leading-[0.9] text-white">
              BARBIE <br />
              <span className="text-transparent" 
                    style={{ 
                        WebkitTextStroke: `2px ${theme.neonPink}`, 
                        textShadow: `0px 0px 20px ${theme.neonPink}`
                    }}>
                FASHIONISTA
              </span>
            </h1>
          </div>
        </div>
      </header>

      {/* --- 2. MAIN CONTENT GRID --- */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* --- SIDEBAR (STICKY) --- */}
          <div className="w-full lg:w-1/4 h-fit lg:sticky lg:top-32 space-y-10 z-20">
            <TiltCard className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/50" style={{ boxShadow: `0 0 15px ${theme.neonPink}40` }}>
              <h3 className="font-dunbartall text-2xl mb-6 pb-2 border-b border-pink-500/30 text-pink-400">Infos Clés</h3>
              <ul className="space-y-4 text-sm font-dunbartext text-gray-200">
                <li className="flex justify-between pb-2"><span>Type</span> <span className="font-bold text-white">Scolaire</span></li>
                <li className="flex justify-between pb-2"><span>Rôle</span> <span className="font-bold text-white">Graphiste</span></li>
                <li className="flex justify-between pb-2"><span>Année</span> <span className="font-bold text-white">2025</span></li>
              </ul>
            </TiltCard>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-dunbartall text-xl mb-4 text-pink-300">Outils</h3>
              <div className="flex flex-wrap gap-2">
                {['Photoshop', 'Illustrator'].map(tool => (
                    <span key={tool} className="px-3 py-1 border border-pink-500/50 bg-black/40 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                        {tool}
                    </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="w-full lg:w-3/4 space-y-24">
            
            {/* Intro Text */}
            <motion.div className="prose prose-xl prose-invert max-w-none" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-dunbartall mb-8 leading-tight text-white">
                Valoriser une icône <span className="px-2 text-white font-bold inline-block transform rotate-1 rounded-lg" style={{ backgroundColor: theme.neonPink }}>intemporelle</span>
              </h2>
              <p className="font-dunbartext text-gray-300">
                L'objectif était de valoriser la poupée Barbie comme icône de mode, tout en respectant l'identité graphique 
                <strong className="text-pink-400"> pop et audacieuse</strong> de la marque. 
              </p>
            </motion.div>

            {/* --- SECTION COMPARATIVE CÔTE À CÔTE --- */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h3 className="font-dunbartall text-3xl mb-8 text-white border-l-4 border-pink-500 pl-4">Le Duel : Plein vs Contour</h3>
                
                {/* Grille 2 colonnes strictes.
                   items-start : aligne les colonnes en haut.
                */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    
                    {/* Colonne 1 : Plein */}
                    <div className="space-y-4">
                        <TiltCard>
                             <div className="bg-black/40 p-2 rounded-xl border border-white/20 backdrop-blur-sm">
                                {/* aspect-[3/4] force la même hauteur pour les deux images */}
                                <ShineImage src="./barbie.jpg" alt="Affiche Plein" className="rounded-lg w-full h-auto object-cover aspect-[3/4]" />
                             </div>
                        </TiltCard>
                        <div className="bg-black/40 p-4 rounded-xl border-l-2 border-pink-500">
                            <h4 className="font-dunbartall text-pink-400 text-xl">Version Pleine</h4>
                            <p className="text-sm text-gray-400 font-dunbartext mt-1">Impact maximal. Ancre la marque de façon statutaire.</p>
                        </div>
                    </div>

                    {/* Colonne 2 : Contour (Aucune marge top) */}
                    <div className="space-y-4">
                        <TiltCard>
                             <div className="bg-black/40 p-2 rounded-xl border border-white/20 backdrop-blur-sm">
                                <ShineImage src="./barbie-2.jpg" alt="Affiche Contour" className="rounded-lg w-full h-auto object-cover aspect-[3/4]" />
                             </div>
                        </TiltCard>
                         <div className="bg-black/40 p-4 rounded-xl border-l-2 border-white">
                            <h4 className="font-dunbartall text-white text-xl">Version Contour</h4>
                            <p className="text-sm text-gray-400 font-dunbartext mt-1">Légèreté et élégance. Laisse respirer le visuel.</p>
                        </div>
                    </div>

                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-6 overflow-hidden bg-pink-600 border-y-4 border-white rotate-1 scale-105 relative z-10 shadow-[0_0_30px_#fe3178]">
        <motion.div className="whitespace-nowrap flex" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }}>
            {[1,2,3,4].map(i => (<span key={i} className="text-3xl font-dunbartall text-white mx-8 drop-shadow-md">FASHION • ICON • POP CULTURE • PINK • STYLE • </span>))}
        </motion.div>
      </div>

      {/* --- NEXT PROJECT --- */}
      <section className="py-32 text-center relative z-10">
        <p className="text-gray-400 uppercase tracking-widest mb-4 font-dunbartext">Prochain Projet</p>
        <Link to="/casque" className="inline-block group relative">
            <h2 className="text-6xl md:text-8xl font-dunbartall text-transparent transition-colors duration-300 relative z-10 group-hover:text-white"
                style={{ WebkitTextStroke: '2px white' }}>
                Casque F1
            </h2>
            <div 
                className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, #3b82f6, #06b6d4)` }}
            >
               <h2 className="text-6xl md:text-8xl font-dunbartall" style={{ textShadow: '0 0 20px #3b82f6' }}>
                Casque F1
               </h2>
            </div>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-2 mx-auto bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
        </Link>
      </section>

    </div>
  );
};

export default transition(Barbie);