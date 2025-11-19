import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppReadyContext from '../context/AppReadyContext.jsx';

const ProjectSection = ({ title, children, delay = 0 }) => {
  const appReady = useContext(AppReadyContext);
  return (
    <motion.div
      className="bg-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-sm border-3 border-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={appReady ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      whileHover={{ 
          scale: 1.01, 
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.2 }
      }}
    >
      <h2 className="text-3xl font-dunbartall mb-4">{title}</h2>
      <div className="font-dunbartext text-white/80 space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

export default function BikeRepair() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "affiche.png",
      alt: "Affiche du projet",
      caption: "Poster Design"
    },
    {
      src: "flyer.png",
      alt: "Flyer du projet",
      caption: "Flyer"
    },
    {
      src: "mockup.png",
      alt: "Mockup",
      caption: "Mockup"
    }
  ];

  return (
    <div className="min-h-screen text-white pt-28 pb-16 px-4">
      
      {/* Conteneur principal centré avec animation */}
      <motion.div 
        className="container mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={useContext(AppReadyContext) ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* En-tête du projet */}
        <div className="text-center mb-12 mt-20">
          <motion.h1 
            className="text-5xl md:text-6xl font-dunbartall mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={useContext(AppReadyContext) ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            The Bike Repair
          </motion.h1>
          <motion.p 
            className="text-xl font-dunbartext text-white/80 mb-6"
            initial={{ opacity: 0 }}
            animate={useContext(AppReadyContext) ? { opacity: 1 } : undefined}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Projet d'identité visuelle
          </motion.p>
        </div>

        {/* --- Image Principale --- */}
        <motion.div 
          className="bg-white/15 p-4 rounded-2xl shadow-lg backdrop-blur-sm mb-12 border-3 border-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={useContext(AppReadyContext) ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src="./bike-repair.png" 
            alt="Présentation du projet Bike Repair" 
            className="rounded-lg w-full h-auto object-cover"
          />
        </motion.div>
        {/* --- Fin Image Principale --- */}

        {/* Détails du projet (Contexte, Rôle, Outils) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          {/* Colonne Contexte */}
          <ProjectSection title="Contexte" delay={0.1}>
            <p><strong className="text-white">Type:</strong> Devoir scolaire</p>
            <p><strong className="text-white">Année:</strong> 2025</p>
          </ProjectSection>

          {/* Colonne Rôle */}
          <ProjectSection title="Rôle" delay={0.2}>
            <p>Designer l'identité visuelle complète de la marque, du logo aux supports de communication.</p>
          </ProjectSection>

          {/* Colonne Outils */}
          <ProjectSection title="Outils" delay={0.3}>
            <ul className="list-disc list-inside space-y-2">
              <li>Adobe Illustrator</li>
              <li>Adobe Photoshop</li>
            </ul>
          </ProjectSection>
        </div>

        {/* Résumé du projet */}
        <ProjectSection title="Résumé" delay={0.4}>
          <p>
            Créer une identité visuelle complète pour «The Bike Repair», un atelier participatif de réparation de vélos avec une dimension sociale (café + communauté).
          </p>
          <p>
            L’identité doit promouvoir la réparation DIY (Do It Yourself) et la connexion humaine. La marque doit fonctionner à travers le logo, les réseaux sociaux, les affiches, l'impression et les formats web réactifs.
          </p>
        </ProjectSection>

        {/* Sections "à faire" - J'ai mis des placeholders */}
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <ProjectSection title="Logo & Moodboard" delay={0.5}>
            <img src="moodbord.png" alt="Placeholder Logo" className="rounded-lg w-full h-auto object-cover mt-4" />
          </ProjectSection>
          
          <ProjectSection title="Poster & Flyer" delay={0.6}>
            <img src="flyer.png" alt="Placeholder Poster" className="rounded-lg w-full h-auto object-cover mt-4" />
          </ProjectSection>
        </div>

        {/* Galerie d'images (Outcome) */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-dunbartall mb-8">Outcome</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 p-3 rounded-2xl shadow-lg backdrop-blur-sm group cursor-pointer"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  // Légère animation de l'image à l'intérieur de la boîte au survol
                  className="rounded-lg w-full h-auto object-cover transition-transform duration-300 group-hover:scale-100"
                />
                <p className="font-dunbartext text-sm text-white/70 mt-2">{image.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ce que j'ai appris */}
        <ProjectSection title="Ce que j'ai appris" delay={0.7}>
          <ul className="list-disc list-inside space-y-2">
            <li>J'ai appris à concevoir une identité qui incarne des valeurs fortes (DIY, communauté, social) en utilisant des 
              éléments graphiques pour symboliser l'accessibilité et la connexion humaine, tout en répondant à un besoin 
              fonctionnel (atelier de réparation).
            </li>
            <li>
              J'ai renforcé ma compétence sur la suite Adobe, notamment en utilisant Illustrator pour la création vectorielle
               du logo et de la charte graphique, et Photoshop pour la mise en page des affiches.
               </li>
          </ul>
        </ProjectSection>
      </motion.div>
    </div>
  );
}