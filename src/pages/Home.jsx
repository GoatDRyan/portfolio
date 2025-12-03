import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import transition from "../context/transition.jsx";

// --- COMPOSANT UTILITAIRE : ScrollToAnchor ---
const ScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (location.pathname !== '/') {
         window.scrollTo(0, 0);
      }
    }
  }, [location]);

  return null;
};

// --- NOUVEAU COMPOSANT : Carte Projet (Stack Effect) ---
const Card = ({ i, title, description, tags, img, to, color, progress, range, targetScale }) => {
  const container = useRef(null);
  
  // Animation de l'échelle
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale, 
          backgroundColor: '#fff',
          top: `calc(-5vh + ${i * 25}px)` 
        }}
        className="flex flex-col relative w-[90vw] md:w-[75vw] lg:w-[1000px] h-[65vh] md:h-[70vh] rounded-3xl border-4 border-gray-900 overflow-hidden shadow-2xl origin-top"
      >
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Partie Image */}
          <div className="w-full lg:w-[60%] h-[45%] lg:h-full relative overflow-hidden group border-b-4 lg:border-b-0 lg:border-r-4 border-gray-900">
            <div className="w-full h-full overflow-hidden">
                <motion.img 
                src={img} 
                alt={title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-80 transition-opacity duration-300"
              style={{ backgroundColor: color }}
            ></div>
          </div>

          {/* Partie Texte */}
          <div className="w-full lg:w-[40%] h-[55%] lg:h-full p-6 lg:p-10 flex flex-col justify-center bg-gray-50 text-gray-900">
            <span className="font-bold text-xl mb-2 font-dunbartext" style={{ color: color }}>
              0{i + 1} — Projet
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-dunbartall mb-4 text-gray-900 leading-none">
              {title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-dunbartext mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, idx) => (
                <span key={idx} className="border border-gray-900 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider bg-white">
                  {tag}
                </span>
              ))}
            </div>

            <Link 
              to={to} 
              className="w-fit bg-gray-900 text-white px-6 py-3 rounded-xl font-bold font-dunbartext transition-all hover:-translate-y-1 hover:translate-x-1 border-2 border-transparent"
              style={{ boxShadow: `5px 5px 0px 0px ${color}` }}
              onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${color}`;
                  e.currentTarget.style.backgroundColor = color;
                  e.currentTarget.style.borderColor = "#111827"; 
                  e.currentTarget.style.color = "#111827";
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `5px 5px 0px 0px ${color}`;
                  e.currentTarget.style.backgroundColor = "#111827";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.color = "#ffffff";
              }}
            >
              Voir le projet
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// --- PAGE PRINCIPALE ---
function Home() {

  const projects = [
    { 
      title: 'Bike Repair',
      description: "The Bike Repair est un atelier participatif fictif imaginé autour de deux axes forts : la réparation DIY de vélos et la création de lien social grâce à un espace café. L’objectif était de concevoir une identité visuelle cohérente avec ces valeurs : entraide, pratique, et convivialité.",
      tags: ["Charte Graphique", "Design", "Logo", "Scolaire"],
      img: './bike-repair.png',
      to: '/bike-repair',
      color: '#f4eae5' 
    },
    { 
      title: 'Barbie',
      description: "Dans le cadre d’un cours à l’Université de Rouen, Elbeuf, j’ai réalisé deux affiches mettant en scène la poupée Barbie en m’inspirant de son univers pop, coloré et audacieux avec pour objectif de la valoriser en tant qu’icône de mode tout en respectant l’identité visuelle de la marque.",
      tags: ["Print", "Design", "Scolaire"],
      img: './barbie.jpg',
      to: '/barbie',
      color: '#ec4899'
    },
    { 
      title: 'Casque Formula 1',
      description: "Casque de f1",
      tags: ["3D", "Baking", "Scolaire"],
      img: './casque.jpg',
      to: '/casque',
      color: '#3b82f6'
    },
    { 
      title: 'Marlowe',
      description: "Dans le cadre d'un projet, nous avons réalisé en groupe deux scènes inspirées du film noir des années 1950. La première se déroule dans le bureau de l’inspecteur Marlowe qui reçoit une lettre anonyme l’invitant à un rendez-vous nocturne, la seconde montre le meurtre de l’inspecteur à ce rendez-vous.",
      tags: ["Premier pro", "Film", "Scolaire"],
      img: './marlowe.png',
      to: '/marlowe',
      color: '#f59e0b'
    },
    { 
      title: 'SAE203',
      description: "Dans le cadre de la SAE203 (Situation d'Apprentissage et d'Évaluation) de mon cursus en Bachelor Universitaire de Technologie Métiers du Multimédia et de l'Internet (BUT MMI), j'ai développé une application web de billetterie en ligne pour la gestion des inscriptions à des événements.",
      tags: ["Back-end", "HTML/CSS", "PHP","Billeterie" , "Scolaire"],
      img: './sae203.png',
      to: '/sae203',
      color: '#8b5cf6'
    }
  ];

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <>
      <ScrollToAnchor />
      <main className="flex-1 flex flex-col"> 
        
        {/* --- 1. HERO SECTION --- */}
        <section id="root" className="relative min-h-screen flex flex-col items-center justify-center text-center text-white gap-5 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div 
            className="absolute right-45 top-1/4 md:top-1/2 -translate-y-1/2 w-[40vw] md:w-[20vw] max-w-md text-white/10 -rotate-14"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <img src="./casque.svg" alt="" className="w-full h-full" aria-hidden="true" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-dunbartall mb-4 drop-shadow-lg max-w-[90vw] relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
              Ryan Mumbata
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-xl lg:max-w-2xl font-dunbartext drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
              Je joue à F1 25 et ça m'arrive de coder des trucs...
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <motion.a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black drop-shadow-lg font-dunbartext py-3 px-8 rounded text-lg lg:text-xl transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Qui suis-je ?
            </motion.a>

            <motion.a 
              href="#projet"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projet')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/15 hover:bg-white/50 drop-shadow-lg text-white border-2 border-solid font-dunbartext py-3 px-8 rounded text-lg lg:text-xl transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Projets
            </motion.a>
          </motion.div>
        </section>

        {/* --- 2. ABOUT SECTION --- */}
        <section id="about" className="relative min-h-dvh flex items-center justify-center py-12 md:py-20 overflow-hidden">
          {/* Suppression de bg-black ici aussi, le div inset-0 peut servir d'ombre si besoin */}
          <div className="absolute inset-0" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className="relative max-w-md mx-auto lg:mx-0 float-anim">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <img
                    src="./moi.jpg"
                    alt="Ryan Mumbata"
                    className="rounded-2xl w-full aspect-3/4 object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-white rounded-2xl -z-10" />
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-white rounded-2xl -z-10" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white p-6 rounded-2xl border-3 shadow-lg border-white bg-white/5 backdrop-blur-sm"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-dunbartall mb-6">À propos de moi</h2>
                <p className="text-lg font-dunbartext mb-6 text-white bg">
                  Étudiant en Bachelor Universitaire de Technologie Métiers du Multimédia et de l'Internet (BUT MMI), 
                  je développe mes compétences dans les domaines du web, du design graphique, de la communication digitale 
                  et de la production audiovisuelle.
                </p>
                <div className="flex justify-center w-full">
                  <motion.a
                    href="/cv.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-8 bg-white text-black font-dunbartext py-2 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-200"
                  >
                    Télécharger mon CV
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* --- 3. SKILLS SECTION --- */}
        <section id="competences" className="relative min-h-dvh flex items-center justify-center py-16 overflow-hidden">
          <div className="absolute inset-0" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-dunbartall text-white mb-4">Mes Compétences</h2>
              <p className="text-lg text-white/80 font-dunbartext max-w-2xl mx-auto">
                Au cours de mon parcours, j'ai touché à de nombreuses technologies et outils mais je débute toujours dans ceux-ci.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Développement Front-end */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-3 border-white bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white underline">Développement Front-end</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">React.js</span>
                    </div>
                    <p className="text-white/80 text-sm ">Création d'applications web dynamiques et interactives</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">TailwindCSS</span>
                    </div>
                    <p className="text-white/80 text-sm">Design responsive et composants réutilisables</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">JavaScript</span>
                    </div>
                    <p className="text-white/80 text-sm">Développement front-end et logique applicative</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">CSS</span>
                    </div>
                    <p className="text-white/80 text-sm"> Mise en page et animations avancées</p>
                  </div>
                </div>
              </motion.div>

              {/* Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-3 border-white bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white underline">Design</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Figma</span>
                    </div>
                    <p className="text-white/80 text-sm">Design d'interface et prototypage interactif</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Photoshop</span>
                    </div>
                    <p className="text-white/80 text-sm">Retouche photo et création graphique</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Illustrator</span>
                    </div>
                    <p className="text-white/80 text-sm">Création de logos et illustrations vectorielles</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Blender</span>
                    </div>
                    <p className="text-white/80 text-sm">Modélisation et rendu 3D</p>
                  </div>
                </div>
              </motion.div>

              {/* Production Audiovisuelle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="border-3 border-white bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300 md:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white underline">Production Audiovisuelle</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Premiere Pro</span>
                    </div>
                    <p className="text-white/80 text-sm">Montage vidéo et post-production</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">After Effects</span>
                    </div>
                    <p className="text-white/80 text-sm">Animation et effets visuels</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">DaVinci Resolve</span>
                    </div>
                    <p className="text-white/80 text-sm">Étalonnage et correction colorimétrique</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white font-dunbartall">Audition</span>
                    </div>
                    <p className="text-white/80 text-sm">Édition et mixage audio</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <h3 className="text-xl font-dunbartall text-white mb-6">Technologies additionnelles</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Git', 'Node.js', 'WordPress', 'Prestashop'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-3 border-white px-4 py-2 bg-white/10 rounded-full text-white font-dunbartext hover:border-white/50 hover:bg-white/30 transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 4. NEW PROJECTS SECTION (STACK CARDS) --- */}
        {/* CORRECTION ICI : J'ai retiré bg-gray-900 pour que le fond étoilé apparaisse derrière les cartes */}
        <section id="projet" ref={container} className="relative pb-24 mt-30">
          
          {/* Titre Sticky */}
          <div className="sticky top-0 h-[15vh] flex items-end justify-center z-0 pb-6 mb-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-dunbartall text-white mb-2 drop-shadow-md">Mes Projets</h2>
                <p className="text-white/80 text-xl font-dunbartall animate-bounce drop-shadow-md">Scroll Down &darr;</p>
            </motion.div>
          </div>

          <div className="w-full flex flex-col items-center gap-[5vh]">
            {projects.map((p, i) => {
              const targetScale = 1 - ( (projects.length - i) * 0.05 );
              
              return (
                <Card 
                  key={i} 
                  i={i} 
                  {...p} 
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default transition(Home);