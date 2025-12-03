import React, { useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import transition from "../context/transition.jsx";

// --- COMPOSANTS HELPERS ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 30 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
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
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
      className={`relative transition-all duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ShineImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative overflow-hidden group w-full h-full ${className}`}>
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[125%] z-20 pointer-events-none" />
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
};

function SAE203() {

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const theme = {
    violet: '#8b5cf6',
    softPurple: '#ddd6fe',
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white relative">
      
      {/* --- 1. HERO HEADER --- */}
      <header className="relative h-[85vh] flex items-end pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
            <img 
                src="./event.png" 
                alt="SAE 203 Hero Background" 
                className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div>
            <span className="font-bold tracking-widest uppercase mb-4 block font-dunbartext bg-violet-500/10 backdrop-blur-md w-fit px-3 py-1 rounded border border-violet-500/50 text-violet-300">
              Développement Web / 2025
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-dunbartall leading-[0.9] text-white">
              SAE
              <span className="text-transparent" 
                    style={{ 
                        WebkitTextStroke: `2px ${theme.violet}`, 
                        textShadow: `0px 0px 20px ${theme.violet}80`
                    }}>
                203
              </span>
            </h1>
          </div>
        </div>
      </header>

      {/* --- 2. MAIN CONTENT GRID --- */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* --- SIDEBAR (STICKY) --- */}
          <div className="w-full lg:w-1/4 h-fit lg:sticky lg:top-32 space-y-10 z-30">
            
            {/* Carte Infos */}
            <TiltCard className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-violet-500/30 shadow-2xl">
              <h3 className="font-dunbartall text-2xl mb-6 pb-2 border-b border-violet-500/30 text-violet-400">Infos Clés</h3>
              <ul className="space-y-4 text-sm font-dunbartext text-gray-300">
                <li className="flex justify-between pb-2"><span>Type</span> <span className="font-bold text-white">Scolaire</span></li>
                <li className="flex justify-between pb-2"><span>Rôle</span> <span className="font-bold text-white">Back-end</span></li>
                <li className="flex justify-between pb-2"><span>Année</span> <span className="font-bold text-white">2025</span></li>
              </ul>
            </TiltCard>

            {/* Tech Stack - Bien visible maintenant car rien ne passe dessous */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-dunbartall text-xl mb-4 text-violet-300">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['PHP', 'MySQL', 'HTML', 'CSS'].map(tool => (
                    <span key={tool} className="px-3 py-1 border border-violet-500/40 bg-violet-900/20 rounded-full text-xs font-bold uppercase tracking-wider text-violet-200">
                        {tool}
                    </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="w-full lg:w-3/4 space-y-24 z-10 relative">
            
            {/* Intro Text */}
            <motion.div className="prose prose-xl prose-invert max-w-none" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-dunbartall mb-8 leading-tight text-white">
                Gestion dynamique et <span className="px-2 text-white font-bold inline-block transform -rotate-1 rounded-sm bg-violet-600">Back-office</span>.
              </h2>
              <p className="font-dunbartext text-gray-300">
                Ce projet consistait à réaliser un site web dynamique complet intégrant une partie publique (Front-office) et une interface d'administration (Back-office) pour la gestion de contenu en temps réel.
              </p>
            </motion.div>

            {/* --- SECTION BACK-OFFICE (ALIGNÉE STRICTEMENT) --- */}
            {/* CORRECTION : J'ai supprimé 'lg:w-[140%] lg:-ml-[40%]' pour que l'image reste dans sa colonne et ne touche pas la sidebar */}
            <div className="flex flex-col gap-8">
                
                {/* Image Large (Prend toute la largeur de la colonne de droite) */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <TiltCard>
                        <div className="rounded-2xl shadow-2xl border border-violet-500/20 overflow-hidden bg-gray-900 w-full float-anim">
                            {/* Barre de fenêtre style mac */}
                            <div className="h-8 bg-gray-800 flex items-center px-4 space-x-2 border-b border-gray-700">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <ShineImage 
                                src="./mod-sup.png" 
                                alt="Interface de Gestion" 
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Texte Descriptif */}
                <motion.div className="font-dunbartext text-gray-300 bg-white/5 p-6 rounded-2xl border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="font-dunbartall text-3xl mb-4 text-violet-400">Le Back-Office</h3>
                    <p className="mb-6">
                        L'administration permet une gestion CRUD (Create, Read, Update, Delete) complète. L'interface a été pensée pour être intuitive, permettant la modification et la suppression d'éléments en quelques clics.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div> Base de données MySQL
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div> Gestion Sessions
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div> Upload d'images
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- GRILLE COMPARATIVE (Formulaires) --- */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h3 className="font-dunbartall text-3xl mb-8 text-white border-l-4 border-violet-500 pl-4">Interactions Utilisateur</h3>
                
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    
                    {/* Colonne 1 : Inscription */}
                    <div className="space-y-4">
                        <TiltCard>
                             <div className="bg-black/40 p-2 rounded-xl border border-white/10 backdrop-blur-sm aspect-[4/3] overflow-hidden">
                                <ShineImage src="./inscription.png" alt="Page d'inscription" className="rounded-lg w-full h-full object-cover object-top" />
                             </div>
                        </TiltCard>
                        <div className="bg-black/40 p-4 rounded-xl border-l-2 border-violet-400">
                            <h4 className="font-dunbartall text-violet-300 text-xl">Espace Membre</h4>
                            <p className="text-sm text-gray-400 font-dunbartext mt-1">Formulaire d'inscription avec validation dynamique.</p>
                        </div>
                    </div>

                    {/* Colonne 2 : Ajout de contenu */}
                    <div className="space-y-4">
                        <TiltCard>
                             <div className="bg-black/40 p-2 rounded-xl border border-white/10 backdrop-blur-sm aspect-[4/3] overflow-hidden">
                                <ShineImage src="./ajout.png" alt="Formulaire d'ajout" className="rounded-lg w-full h-full object-cover object-top" />
                             </div>
                        </TiltCard>
                         <div className="bg-black/40 p-4 rounded-xl border-l-2 border-white">
                            <h4 className="font-dunbartall text-white text-xl">Gestion de Contenu</h4>
                            <p className="text-sm text-gray-400 font-dunbartext mt-1">Interface d'ajout d'événements avec upload.</p>
                        </div>
                    </div>

                </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-6 overflow-hidden bg-violet-600 border-y-4 border-white rotate-1 scale-105 relative z-10 shadow-[0_0_40px_#8b5cf6]">
        <motion.div className="whitespace-nowrap flex" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
            {[1,2,3,4].map(i => (<span key={i} className="text-3xl font-dunbartall text-white mx-8 drop-shadow-sm">PHP • MYSQL • DATABASE • SECURITY • FULL STACK • </span>))}
        </motion.div>
      </div>

      {/* --- NEXT PROJECT (Retour au début) --- */}
      <section className="py-32 text-center relative z-10">
        <p className="text-gray-400 uppercase tracking-widest mb-4 font-dunbartext">Retour au début</p>
        <Link to="/bike-repair" className="inline-block group relative">
            <h2 className="text-6xl md:text-8xl font-dunbartall text-transparent transition-colors duration-300 relative z-10 group-hover:text-white"
                style={{ WebkitTextStroke: '2px white' }}>
                Bike Repair
            </h2>
            <div 
                className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, #a9cbd7, #f4eae5)` }}
            >
               <h2 className="text-6xl md:text-8xl font-dunbartall" style={{ textShadow: '0 0 20px #a9cbd7' }}>
                Bike Repair
               </h2>
            </div>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-2 mx-auto bg-[#a9cbd7]"></div>
        </Link>
      </section>

    </div>
  );
}

export default transition(SAE203);