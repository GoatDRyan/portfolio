import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectSection = ({ title, children, delay = 0 }) => (
  <motion.div
    className="bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-dunbartall mb-4">{title}</h2>
    <div className="font-dunbartext text-white/80 space-y-4">
      {children}
    </div>
  </motion.div>
);

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
      src: "https://placehold.co/600x400/1a1a1a/ffffff?text=Post+Instagram",
      alt: "Post réseaux sociaux",
      caption: "Réseaux Sociaux"
    }
  ];

  return (
    <div className="min-h-screen text-white pt-28 pb-16 px-4">
      
      {/* Conteneur principal centré avec animation */}
      <motion.div 
        className="container mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* En-tête du projet */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl md:text-6xl font-dunbartall mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Bike Repair
          </motion.h1>
          <motion.p 
            className="text-xl font-dunbartext text-white/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Projet d'identité visuelle
          </motion.p>
        </div>

        {/* --- Image Principale --- */}
        <motion.div 
          className="bg-white/20 p-4 rounded-2xl shadow-lg backdrop-blur-sm mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* J'utilise l'image de votre page d'accueil */}
          <img 
            src="/bike-repair.png" 
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
            <p>Section en cours de construction. J'ajouterai ici le logo final et la planche d'inspiration.</p>
            <img src="moodbord.png" alt="Placeholder Logo" className="rounded-lg w-full h-auto object-cover mt-4" />
          </ProjectSection>
          
          <ProjectSection title="Poster & Flyer" delay={0.6}>
            <p>Section en cours de construction. J'ajouterai ici les designs d'affiches et de flyers.</p>
            <img src="https://placehold.co/600x400/1a1a1a/ffffff?text=Poster+Flyer" alt="Placeholder Poster" className="rounded-lg w-full h-auto object-cover mt-4" />
          </ProjectSection>
        </div>

        {/* Galerie d'images (Outcome) */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-dunbartall mb-8">Outcome</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 p-3 rounded-2xl shadow-lg backdrop-blur-sm"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="rounded-lg w-full h-auto object-cover"
                />
                <p className="font-dunbartext text-sm text-white/70 mt-2">{image.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ce que j'ai appris */}
        <ProjectSection title="Ce que j'ai appris" delay={0.7}>
          <p>
            Ce projet m'a permis de... (votre texte ici)
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>...</li>
            <li>...</li>
          </ul>
        </ProjectSection>

        {/* Lien de retour final */}

      </motion.div>
    </div>
  );
}