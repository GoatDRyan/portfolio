import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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

export default function Home() {
  ScrollToAnchor();

  const projects = [
    { 
      title: 'Bike Repair',
      img: '/bike-repair.png',
      to: '/bike-repair',
      gridClass: 'col-span-2 md:col-span-2 lg:col-span-2',
      containerClass: 'h-48 md:h-56',
      imgClass: 'object-cover',
    },
    { 
      title: 'Barbie',
      img: '/barbie.jpg',
      to: '/barbie',
      gridClass: 'col-span-1',
      containerClass: 'h-48 md:h-56',
      imgClass: 'object-contain bg-gradient-to-b from-pink-500/5 to-transparent'
    },
    { 
      title: 'Casque',
      img: '/casque.jpg',
      to: '/casque',
      gridClass: 'col-span-1',
      containerClass: 'h-48 md:h-56',
      imgClass: 'object-cover'
    },
    { 
      title: 'Marlowe',
      img: '/marlowe.png',
      to: '/marlowe',
      gridClass: 'col-span-1 md:col-span-2',
      containerClass: 'h-48 md:h-56',
      imgClass: 'object-cover'
    },
    { 
      title: 'SAE203',
      img: '/sae203.png',
      to: '/sae203',
      gridClass: 'col-span-1 md:col-span-2',
      containerClass: 'h-48 md:h-56',
      imgClass: 'object-cover'
    }
  ];

  return (
    <>
      {/* Contenu principal */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section avec dégradé animé */}
        <section id="root" className="relative min-h-screen flex flex-col items-center justify-center text-center text-white gap-5 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Casque décoratif */}
          <motion.div 
            className="absolute right-45 top-1/4 md:top-1/2 -translate-y-1/2 w-[40vw] md:w-[20vw] max-w-md text-white/10 -rotate-14"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <img src="/casque.svg" alt="" className="w-full h-full" aria-hidden="true" />
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
           className="flex gap-6 md:gap-8 mt-8"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 1 }}
          >
            {/* Ce bouton est maintenant un <Link> pour le scroll */}
            <motion.a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black drop-shadow-lg font-dunbartext py-2 px-6 lg:py-3 lg:px-8 rounded text-base md:text-lg lg:text-xl transition-colors duration-200 cursor-pointer"
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
              className="hover:bg-white hover:text-black drop-shadow-lg text-white border-2 border-solid font-dunbartext py-2 px-6 lg:py-3 lg:px-8 rounded text-base md:text-lg lg:text-xl transition-colors duration-200 cursor-pointer"
            >
              Projets
            </motion.a>
          </motion.div>
        </section>
        {/* Section*/}
        <section id="about" className="relative min-h-dvh flex items-center justify-center py-12 md:py-20 overflow-hidden">
          {/* Fond dégradé pour la section About */}
          <div className="absolute inset-0" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Image et cadre décoratif */}
              <div className="relative max-w-md mx-auto lg:mx-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <img
                    src="/moi.jpg"
                    alt="Ryan Mumbata"
                    className="rounded-2xl w-full aspect-3/4 object-cover shadow-2xl"
                  />
                  {/* Cadre décoratif */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-white rounded-2xl -z-10" />
                  {/* Élément décoratif supplémentaire */}
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-white rounded-2xl -z-10" />
                </motion.div>
              </div>

              {/* Contenu texte */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white p-6 rounded-2xl border-3 shadow-lg"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-dunbartall mb-6">À propos de moi</h2>
                <p className="text-lg font-dunbartext mb-6 text-white">
                  Étudiant en Bachelor Universitaire de Technologie Métiers du Multimédia et de l'Internet (BUT MMI), 
                  je développe mes compétences dans les domaines du web, du design graphique, de la communication digitale 
                  et de la production audiovisuelle.
                </p>
                {/* Bouton CV */}
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
        
        {/* Section Compétences */}
        <section id="competences" className="relative min-h-dvh flex items-center justify-center py-16 overflow-hidden">
          {/* Fond dégradé pour la section Compétences */}
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
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white">Développement Front-end</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">React.js</span>
                    </div>
                    <p className="text-white/60 text-sm">Création d'applications web dynamiques et interactives</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">TailwindCSS</span>
                    </div>
                    <p className="text-white/60 text-sm">Design responsive et composants réutilisables</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">JavaScript</span>
                    </div>
                    <p className="text-white/60 text-sm">Développement front-end et logique applicative</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">CSS</span>
                    </div>
                    <p className="text-white/60 text-sm"> Mise en page et animations avancées</p>
                  </div>
                </div>
              </motion.div>

              {/* Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white">Design</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Figma</span>
                    </div>
                    <p className="text-white/60 text-sm">Design d'interface et prototypage interactif</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Photoshop</span>
                    </div>
                    <p className="text-white/60 text-sm">Retouche photo et création graphique</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Illustrator</span>
                    </div>
                    <p className="text-white/60 text-sm">Création de logos et illustrations vectorielles</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Blender</span>
                    </div>
                    <p className="text-white/60 text-sm">Modélisation et rendu 3D</p>
                  </div>
                </div>
              </motion.div>

              {/* Production Audiovisuelle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300 md:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-dunbartall text-white">Production Audiovisuelle</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Premiere Pro</span>
                    </div>
                    <p className="text-white/60 text-sm">Montage vidéo et post-production</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80">After Effects(!)</span>
                    </div>
                    <p className="text-white/60 text-sm">Animation et effets visuels</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">DaVinci Resolve(!)</span>
                    </div>
                    <p className="text-white/60 text-sm">Étalonnage et correction colorimétrique</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-white/80 font-medium">Audition</span>
                    </div>
                    <p className="text-white/60 text-sm">Édition et mixage audio</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Technologies additionnelles */}
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
                    className="px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm hover:bg-white/30 transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projet" className="relative min-h-dvh flex items-center justify-center py-16 overflow-hidden">
          {/* Fond dégradé pour la section Projets */}
          <div className="absolute inset-0" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-dunbartall text-white mb-4">Mes Projets</h2>
              <p className="text-lg text-white/80 font-dunbartext max-w-2xl mx-auto">
                Une sélection de mes projets récents dans différents domaines du multimédia.
              </p>
            </motion.div>

            {/* ---------- VOICI LA CORRECTION ---------- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {projects.map((p) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`group ${p.gridClass}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Le <Link> est à l'intérieur et gère la navigation */}
                  <Link 
                    to={p.to} 
                    className="block rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className={`relative w-full ${p.containerClass ?? 'h-56 sm:h-64 lg:h-72'} bg-white`}>
                      <img
                        src={p.img}
                        alt={p.title}
                        className={`w-full h-full ${p.imgClass ?? 'object-cover'} transition-transform duration-300 group-hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute left-4 bottom-4 text-left z-10">
                        <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-md">{p.title}</h3>
                        <span className="text-white/70 text-sm">Voir le projet</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* ---------- FIN DE LA CORRECTION ---------- */}

          </div>
        </section>
      </main>
    </>
  );
}