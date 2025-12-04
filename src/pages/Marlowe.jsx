import React, { useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import transition from "../context/transition.jsx";

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
      {/* Ajout de 'grayscale' pour le thème N&B */}
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale" />
    </div>
  );
};

function Marlowe() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  // --- PALETTE NOIR & BLANC (Monochrome) ---
  const theme = {
    white: '#ffffff',
    gray: '#d1d5db', // gray-300
    black: '#000000'
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white">
      
      {/* --- 1. HERO HEADER --- */}
      <header className="relative h-[85vh] flex items-end pb-12 px-6 overflow-hidden">
        {/* Image de fond en N&B */}
        <div className="absolute inset-0 z-0 opacity-50">
            <img 
                src="./marlowe.png" 
                alt="Marlowe Background" 
                className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div>
            <span className="font-bold tracking-widest uppercase mb-4 block font-dunbartext bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded border border-white/50 text-white">
              Vidéo / 2024
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-dunbartall leading-[0.9] text-white">
              PROJET <br />
              {/* Titre en Outline Blanc avec Glow Blanc */}
              <span className="text-transparent" 
                    style={{ 
                        WebkitTextStroke: `2px ${theme.white}`, 
                        textShadow: `0px 0px 30px ${theme.white}40`
                    }}>
                MARLOWE
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
            
            {/* Carte Infos N&B */}
            <TiltCard className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/30" style={{ boxShadow: `0 0 15px ${theme.white}20` }}>
              <h3 className="font-dunbartall text-2xl mb-6 pb-2 border-b border-white/20 text-white">Infos Clés</h3>
              <ul className="space-y-4 text-sm font-dunbartext text-gray-300">
                <li className="flex justify-between pb-2"><span>Type</span> <span className="font-bold text-white">Scolaire</span></li>
                <li className="flex justify-between pb-2"><span>Rôle</span> <span className="font-bold text-white">Monteur Vidéo</span></li>
                <li className="flex justify-between pb-2"><span>Année</span> <span className="font-bold text-white">2025</span></li>
              </ul>
            </TiltCard>

            {/* Stack N&B */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-dunbartall text-xl mb-4 text-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Premiere Pro'].map(tool => (
                    <span key={tool} className="px-3 py-1 border border-white/40 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                        {tool}
                    </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="w-full lg:w-3/4 space-y-24">
            {/* Intro Text (Lorem Ipsum) */}
            <motion.div className="prose prose-xl prose-invert max-w-none" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-dunbartall mb-8 leading-tight text-white">
                Une expérience numérique <span className="px-2 text-black font-bold inline-block transform -rotate-1 rounded-sm" style={{ backgroundColor: theme.white }}>immersive</span>
              </h2>
              <p className="font-dunbartext text-gray-300">
                Avec mes camarades nous avons créé "Marlowe", un court-métrage inspiré du film noir des années 50. Nous avons pensé les plans, le montage, et l'ambiance visuelle pour capturer l'essence de cette époque cinématographique.
              </p>
            </motion.div>

            {/* --- VIDEO YOUTUBE (En N&B via filtre) --- */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h3 className="font-dunbartall text-3xl mb-6 text-white border-l-4 border-white pl-4">Vidéo</h3>
                <TiltCard className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    {/* Ajout de 'grayscale' sur le conteneur de la vidéo */}
                    <div className="aspect-video w-full bg-black grayscale">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/Lf8es5z-wmc?si=hg2RnscY0Mpuo9Sh" 
                            title="Projet Marlowe Video" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </TiltCard>
                <p className="text-sm text-gray-400 mt-2 font-dunbartext italic text-center">
                    Regardez la vidéo
                </p>
            </motion.div>

            {/* --- SECTION TEXTE + IMAGE (BREAKOUT GAUCHE) --- */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:w-[135%] lg:-ml-[35%] relative z-10">
                
                {/* Image à gauche (Grayscale) */}
                <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <TiltCard>
                        <ShineImage 
                            src="./marlowe.png" 
                            alt="Marlowe Detail" 
                            className="rounded-2xl shadow-xl border border-white/10 float-anim"
                        />
                    </TiltCard>
                </motion.div>

                {/* Texte à droite */}
                <motion.div className="w-full md:w-1/2 font-dunbartext text-gray-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="font-dunbartall text-3xl mb-4 text-white">Ma participation</h3>
                    <p className="mb-6">
                        Je me suis occupé du montage vidéo en utilisant Adobe Premiere Pro pour assembler les séquences filmées, ajouter des effets visuels.
                    </p>
                </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MARQUEE N&B --- */}
      {/* Fond blanc, texte noir pour un fort contraste */}
      <div className="py-6 overflow-hidden bg-white border-y-4 border-black -rotate-1 scale-105 relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        <motion.div className="whitespace-nowrap flex" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
            {[1,2,3,4].map(i => (<span key={i} className="text-3xl font-dunbartall text-black mx-8 drop-shadow-sm">Film Noir • Montage • Année 50</span>))}
        </motion.div>
      </div>

      {/* --- NEXT PROJECT --- */}
      <section className="py-32 text-center relative z-10">
        <p className="text-gray-400 uppercase tracking-widest mb-4 font-dunbartext">Prochain Projet</p>
        <Link to="/sae203" className="inline-block group relative">
            <h2 className="text-6xl md:text-8xl font-dunbartall text-transparent transition-colors duration-300 relative z-10 group-hover:text-white"
                style={{ WebkitTextStroke: '2px white' }}>
                SAE 203
            </h2>
            {/* On garde la couleur du prochain projet (violet) pour le teaser */}
            <div 
                className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, #8b5cf6, #d8b4fe)` }}
            >
               <h2 className="text-6xl md:text-8xl font-dunbartall" style={{ textShadow: '0 0 20px #8b5cf6' }}>
                SAE 203
               </h2>
            </div>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-2 mx-auto bg-purple-500 shadow-[0_0_10px_#8b5cf6]"></div>
        </Link>
      </section>

    </div>
  );
};

export default transition(Marlowe);