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
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[125%] z-20 pointer-events-none" />
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
};

function BikeRepair() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const theme = { cream: '#f4eae5', blue: '#a9cbd7' };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white">
      
      {/* HEADER (Inchangé) */}
      <header className="relative h-[85vh] flex items-end pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
           <img src="./bike-repair.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto">
          <div>
            <span className="font-bold tracking-widest uppercase mb-4 block font-dunbartext bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded border border-white/20" style={{ color: theme.cream }}>
              Identité Visuelle / 2025
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-dunbartall leading-[0.9]" style={{ color: theme.cream }}>
              THE BIKE <br />
              <span className="text-transparent" style={{ WebkitTextStroke: `2px ${theme.blue}`, textShadow: `0px 0px 20px ${theme.blue}40` }}>REPAIR</span>
            </h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* SIDEBAR (Inchangée) */}
          <div className="w-full lg:w-1/4 h-fit lg:sticky lg:top-32 space-y-10 z-20">
            <TiltCard className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10" style={{ boxShadow: `8px 8px 0px ${theme.blue}` }}>
              <h3 className="font-dunbartall text-2xl mb-6 pb-2 border-b border-white/10" style={{ color: theme.cream }}>Infos Clés</h3>
              <ul className="space-y-4 text-sm font-dunbartext text-gray-300">
                <li className="flex justify-between pb-2"><span>Type</span> <span className="font-bold" style={{ color: theme.cream }}>Scolaire</span></li>
                <li className="flex justify-between pb-2"><span>Rôle</span> <span className="font-bold" style={{ color: theme.cream }}>Designer</span></li>
                <li className="flex justify-between pb-2"><span>Année</span> <span className="font-bold" style={{ color: theme.cream }}>2025</span></li>
              </ul>
            </TiltCard>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-dunbartall text-xl mb-4" style={{ color: theme.cream }}>Outils</h3>
              <div className="flex flex-wrap gap-2">
                {['Illustrator', 'Photoshop'].map(tool => (
                    <span key={tool} className="px-3 py-1 border border-white/20 bg-white/5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/20" style={{ color: theme.blue }}>{tool}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}>
                <a href="/portfolio/public/charte-graphique.pdf" className="block w-full py-4 text-gray-900 text-center font-bold rounded-xl transition-all transform hover:-translate-y-1 font-dunbartext"
                style={{ backgroundColor: theme.blue, boxShadow: `0 10px 30px -10px ${theme.blue}80` }} target='_blank'>Voir la charte graphique</a>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-3/4 space-y-32">
            
            {/* Intro Text (Reste aligné à droite) */}
            <motion.div className="prose prose-xl prose-invert max-w-none" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-dunbartall mb-8 leading-tight text-white">
                Une identité visuelle pour <span className="px-2 text-gray-900 font-bold inline-block transform -rotate-2" style={{ backgroundColor: theme.cream }}>réparer</span> et connecter
              </h2>
              <p className="font-dunbartext text-gray-300">
                The Bike Repair est un concept d'atelier participatif où la réparation de vélo rencontre la dimension sociale d'un café. 
                L'objectif était de créer une identité qui promeut la philosophie du <strong>DIY (Do It Yourself)</strong> tout en étant accueillante.
              </p>
            </motion.div>

            {/* Moodboard (Reste aligné à droite, mais déborde un peu) */}
            <motion.div className="relative w-[110%] -mr-[10%] group" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
               <div className="absolute -top-6 -left-6 text-gray-900 font-dunbartall px-6 py-3 rounded-xl rotate-[-5deg] z-20 shadow-lg text-xl" style={{ backgroundColor: theme.blue }}>Moodboard</div>
               <TiltCard className="rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <ShineImage src="./moodbord.png" alt="Moodboard" className="rounded-3xl shadow-2xl border-4" style={{ borderColor: theme.cream }} />
               </TiltCard>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-12 lg:w-[135%] lg:-ml-[35%] relative z-10">
                
                {/* Image gauche*/}
                <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <TiltCard>
                        <ShineImage src="./affiche.png" alt="Flyer design" className="rounded-2xl shadow-xl border border-white/20 float-anim" />
                    </TiltCard>
                </motion.div>

                {/* Texte */}
                <motion.div className="w-full md:w-1/2 font-dunbartext text-gray-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="font-dunbartall text-3xl mb-4" style={{ color: theme.cream }}>La démarche</h3>
                    <p className="mb-6">
                        L’objectif était de concevoir une identité visuelle cohérente avec ces valeurs : entraide, pratique, et convivialité.  Le défi était d'utiliser des éléments graphiques 
                        pour symboliser l'accessibilité technique (la clé à molette, la roue) sans paraître trop industriel.
                    </p>
                    <p className="font-bold border-l-4 pl-4 italic text-white" style={{ borderColor: theme.blue }}>
                        "Renforcement de mes compétences sur la suite Adobe, notamment Illustrator et Photoshop, à travers la création d'une identité visuelle."
                    </p>
                </motion.div>

            </div>

            {/* Mockup Final */}
            <motion.div className="relative h-[500px] md:h-[700px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden z-0 opacity-40 border-2" style={{ borderColor: theme.blue }}>
                    <img src="./bike-repair.png" className="w-full h-full object-cover grayscale" alt="Background detail" />
                </div>
                <TiltCard className="absolute bottom-0 left-0 w-2/3 h-2/3 p-2 rounded-2xl z-10 bg-black/50 backdrop-blur-sm border border-white/10" >
                    <div className="w-full h-full rounded-xl overflow-hidden"><ShineImage src="./mockup.png" alt="Final Mockup" className="w-full h-full object-cover" /></div>
                </TiltCard>
                <motion.div className="absolute top-1/2 left-1/4 text-gray-900 font-bold px-6 py-3 rounded-full z-20 font-dunbartall text-xl shadow-lg border-2 border-white float-anim" style={{ backgroundColor: theme.cream }}>Print Ready !</motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MARQUEE & NEXT PROJECT (Inchangés) */}
      <div className="py-6 overflow-hidden border-y-4 border-gray-900 rotate-1 scale-105 relative z-10" style={{ backgroundColor: theme.blue }}>
        <motion.div className="whitespace-nowrap flex" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>
            {[1,2,3,4].map(i => (<span key={i} className="text-3xl font-dunbartall text-gray-900 mx-8">IDENTITY • BRANDING • PRINT DESIGN • ADOBE SUITE • CREATIVE •</span>))}
        </motion.div>
      </div>

      <section className="py-32 text-center relative z-10">
        <p className="text-gray-400 uppercase mb-4 font-dunbartext">Prochain Projet</p>
        <Link to="/barbie" className="inline-block group relative">
            <h2 className="text-6xl md:text-8xl font-dunbartall transition-colors duration-300 relative z-10" style={{ color: theme.cream }}>Barbie <span className="text-transparent" style={{ WebkitTextStroke: `2px ${theme.cream}` }}>Fashionista</span></h2>
            <div className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-500 flex items-center justify-center">
               <h2 className="text-6xl md:text-8xl font-dunbartall">Barbie Fashionista</h2>
            </div>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-2 mx-auto bg-pink-500"></div>
        </Link>
      </section>

    </div>
  );
};

export default transition(BikeRepair);