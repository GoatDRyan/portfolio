import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// --- AJOUTS POUR LA 3D ---
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// --- NOUVEL AJOUT : ENVIRONNEMENT DE STUDIO ---
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// --- FIN DES AJOUTS 3D ---

// --- Composant pour la scène 3D ---
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // --- Variables de la scène ---
    let scene, camera, renderer, controls;
    let frameId;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Fonction d'initialisation ---
    const init = () => {
      // 1. Scène
      scene = new THREE.Scene();
      
      // 2. Caméra
      camera = new THREE.PerspectiveCamera(
        75, // fov
        currentMount.clientWidth / currentMount.clientHeight, // aspect
        0.1, // near
        1000 // far
      );
      camera.position.z = 4; // Position par défaut, sera ajustée

      // 3. Renderer (amélioré pour les modèles GLTF)
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true pour fond transparent
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      currentMount.appendChild(renderer.domElement);
      
      // --- NOUVEL ENVIRONNEMENT DE STUDIO ---
      // Cela va créer un éclairage de studio réaliste pour les reflets
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const roomEnvironment = new RoomEnvironment(renderer); // Crée l'environnement
      const envMap = pmremGenerator.fromScene(roomEnvironment).texture;
      
      scene.environment = envMap; // Applique l'environnement pour les reflets PBR
      // scene.background = envMap; // Décommentez si vous voulez voir le studio en fond
      
      // Nettoyage des générateurs
      pmremGenerator.dispose();
      roomEnvironment.dispose();
      // --- FIN DE L'AJOUT DE L'ENVIRONNEMENT ---


      // 4. Contrôles (Zoom activé)
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; 
      controls.enableZoom = true; 
      controls.autoRotate = true; 
      controls.autoRotateSpeed = 2.0; 

      // 5. Lumières (Ajustées pour compléter l'environnement)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Moins fort, l'env s'en occupe
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Moins fort
      directionalLight.position.set(5, 10, 7.5); 
      scene.add(directionalLight);

      // 6. Modèle 3D (CHARGEMENT DE VOTRE CASQUE)
      const loader = new GLTFLoader();
      
      // Assurez-vous que votre fichier /casque.glb est dans le dossier /public
      loader.load(
        './casque.glb', // <<< VOTRE FICHIER .glb ICI
        (gltf) => {
          // Succès ! Le modèle est chargé
          const model = gltf.scene;
          
          // --- Ajustement automatique de la caméra ---
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          model.position.sub(center); 
          
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          
          cameraZ *= 1.5; 
          
          camera.position.z = cameraZ;
          
          controls.target.copy(model.position);
          controls.update();
          // --- Fin de l'ajustement ---
          
          scene.add(model);
        },
        undefined, // On ignore la progression
        (error) => {
          console.error('Une erreur est survenue lors du chargement du modèle 3D', error);
          const fallbackGeo = new THREE.BoxGeometry(1, 1, 1);
          const fallbackMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          const fallback = new THREE.Mesh(fallbackGeo, fallbackMat);
          scene.add(fallback);
        }
      );

      // 7. Lancer l'animation
      animate();
    };

    // --- Boucle d'animation ---
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update(); 
      renderer.render(scene, camera);
    };

    // --- Gestion du redimensionnement ---
    const handleResize = () => {
      if (currentMount && renderer) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };

    // --- Initialisation et Nettoyage ---
    init();
    window.addEventListener('resize', handleResize);

    // Fonction de nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer && currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
      
      if (scene) {
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      }
      if (renderer) {
        renderer.dispose();
      }
    };

  }, []); // Le tableau vide assure que l'effet ne se lance qu'une fois

  return (
    <div 
      ref={mountRef} 
      className="w-full h-80 md:h-96 rounded-lg" // Hauteur fixe pour le conteneur 3D
      style={{ cursor: 'grab' }}
    />
  );
};
// --- Fin du composant Scène 3D ---


export default function Casque() {
  
  // Fait en sorte que la page s'affiche en haut
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // J'ai ajouté votre image principale à la galerie
  const galleryImages = [
    {
      src: "./casque.jpg", // Votre image principale
      alt: "Rendu principal du casque",
      caption: "Rendu Principal (Cycles)"
    },
    {
      src: "https://placehold.co/600x400/1a1a1a/ffffff?text=Vue+Fil+de+Fer+(Wireframe)",
      alt: "Rendu fil de fer du casque",
      caption: "Vue Fil de Fer (Wireframe)"
    },
    {
      src: "https://placehold.co/600x400/1a1a1a/ffffff?text=Rendu+Matériau+(Clay)",
      alt: "Rendu clay du casque",
      caption: "Rendu Matériau (Clay)"
    }
  ];

  return (
    // On retire "bg-black" pour voir le fond animé de App.jsx
    // On ajoute du padding (pt-28) pour passer sous la navbar
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
            Modélisation de Casque 3D
          </motion.h1>
          <motion.p 
            className="text-xl font-dunbartext text-white/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Projet personnel de modélisation, texturing et rendu réalisé avec Blender.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link 
              to="/" 
              className="text-lg font-dunbartext text-white/70 hover:text-white transition-colors duration-200"
            >
              &larr; Retour aux projets
            </Link>
          </motion.div>
        </div>

        {/* --- SECTION 3D INTERACTIVE --- */}
        <motion.div 
          className="bg-white/5 p-4 rounded-2xl shadow-lg backdrop-blur-sm mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Appel du composant 3D */}
          <ThreeScene />
          <p className="font-dunbartext text-sm text-white/70 mt-3 text-center">
            Faites glisser pour faire pivoter le modèle. Zoomez avec la molette.
          </p>
        </motion.div>
        {/* --- FIN SECTION 3D --- */}

        {/* Détails du projet (description et outils) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Colonne de description */}
          <motion.div 
            className="md:col-span-2 bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-dunbartall mb-4">Le Défi</h2>
            <p className="font-dunbartext text-white/80 space-y-4">
              <span>
                L'objectif de ce projet était de recréer un casque audio réaliste en 3D, en portant une attention particulière aux détails de modélisation (hard-surface) et à la création de textures photoréalistes.
              </span>
              <span>
                Ce fut un excellent exercice pour maîtriser les techniques de modélisation complexes et le pipeline de rendu PBR (Physically Based Rendering).
              </span>
            </p>
          </motion.div>

          {/* Colonne des outils */}
          <motion.div 
            className="md:col-span-1 bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-dunbartall mb-4">Outils</h2>
            <ul className="font-dunbartext text-white/80 space-y-3 list-disc list-inside">
              <li>Blender (Modélisation)</li>
              <li>Cycles (Rendu)</li>
              <li>Substance Painter (Texturing)</li>
              <li>Photoshop (Post-production)</li>
            </ul>
          </motion.div>
        </div>

        {/* Galerie d'images */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-dunbartall mb-8">Galerie de Rendu</h2>
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
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/600x400?text=Image'; }}
                />
                <p className="font-dunbartext text-sm text-white/70 mt-2">{image.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lien de retour final */}
        <div className="text-center mt-16">
          <Link 
            to="/" 
            className="text-lg font-dunbartext text-white/70 hover:text-white transition-colors duration-200"
          >
            &larr; Retour à l'accueil
          </Link>
        </div>

      </motion.div>
    </div>
  );
}