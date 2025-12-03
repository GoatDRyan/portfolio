import { useEffect, useRef, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import transition from "../context/transition.jsx";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// --- COMPOSANTS HELPERS (Tilt & Shine) ---
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

// --- COMPOSANT 3D (ThreeScene) ---
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, controls, frameId;
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const init = () => {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      currentMount.appendChild(renderer.domElement);
      
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const roomEnvironment = new RoomEnvironment(renderer);
      scene.environment = pmremGenerator.fromScene(roomEnvironment).texture;
      pmremGenerator.dispose();
      roomEnvironment.dispose();

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; 
      controls.enableZoom = true; 
      controls.autoRotate = true; 
      controls.autoRotateSpeed = 2.0; 

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 10, 7.5); 
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load('./casque.glb', (gltf) => {
          const model = gltf.scene;
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
          scene.add(model);
        }, undefined, (error) => {
          console.error('Erreur chargement modèle', error);
          // Fallback en cas d'erreur de chargement
          const geo = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
          const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.1, metalness: 0.8 });
          const mesh = new THREE.Mesh(geo, mat);
          scene.add(mesh);
        }
      );
      animate();
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update(); 
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (currentMount && renderer) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer && currentMount) currentMount.removeChild(renderer.domElement);
      cancelAnimationFrame(frameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

function Casque() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const theme = {
    blue: '#3b82f6', // Blue-500
    cyan: '#06b6d4', // Cyan-500
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white">
      
      {/* --- 1. HERO HEADER --- */}
      <header className="relative h-[85vh] flex items-end pb-12 px-6 overflow-hidden">
        {/* Fond décoratif 3D Wireframe */}
        <div className="absolute inset-0 opacity-20">
            {/* Utiliser une image de wireframe ou un rendu du casque */}
            <img src="./casque.jpg" alt="Wireframe Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div>
            <span className="font-bold tracking-widest uppercase mb-4 block font-dunbartext bg-blue-500/10 backdrop-blur-md w-fit px-3 py-1 rounded border border-blue-500/30 text-blue-300">
              3D Modeling / 2025
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-dunbartall leading-[0.9] text-white">
              CASQUE <br />
              <span className="text-transparent" 
                    style={{ 
                        WebkitTextStroke: `2px ${theme.cyan}`, 
                        textShadow: `0px 0px 20px ${theme.blue}80`
                    }}>
                F1 3D
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
            
            {/* Carte Infos */}
            <TiltCard className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30" style={{ boxShadow: `0 0 15px ${theme.blue}20` }}>
              <h3 className="font-dunbartall text-2xl mb-6 pb-2 border-b border-blue-500/20 text-blue-400">Infos Clés</h3>
              <ul className="space-y-4 text-sm font-dunbartext text-gray-300">
                <li className="flex justify-between pb-2"><span>Type</span> <span className="font-bold text-white">Personnel</span></li>
                <li className="flex justify-between pb-2"><span>Rôle</span> <span className="font-bold text-white">3D Artist</span></li>
                <li className="flex justify-between pb-2"><span>Année</span> <span className="font-bold text-white">2025</span></li>
              </ul>
            </TiltCard>

            {/* Outils */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-dunbartall text-xl mb-4 text-cyan-400">Outils</h3>
              <div className="flex flex-wrap gap-2">
                {['Blender', 'Substance Painter'].map(tool => (
                    <span key={tool} className="px-3 py-1 border border-cyan-500/30 bg-cyan-900/20 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-200">
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
                Du concept à la <span className="px-2 text-white font-bold inline-block transform -rotate-1 rounded-sm bg-gradient-to-r from-blue-600 to-cyan-500">réalité virtuelle</span>
              </h2>
              <p className="font-dunbartext text-gray-300">
                L'objectif de ce projet était de recréer un casque F1 réaliste en 3D. Ce fut un excellent exercice pour maîtriser les techniques de modélisation hard-surface et le texturing PBR.
              </p>
            </motion.div>

            {/* --- 3D VIEWER (L'attraction principale) --- */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h3 className="font-dunbartall text-3xl mb-6 text-blue-400 border-l-4 border-cyan-500 pl-4">Modèle Interactif</h3>
                
                <TiltCard className="rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900 to-black h-[500px]">
                    {/* Intégration de la scène Three.js */}
                    <ThreeScene />
                </TiltCard>
            </motion.div>

            {/* --- SECTION TEXTE + IMAGE (BREAKOUT GAUCHE) --- */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:w-[135%] lg:-ml-[35%] relative z-10">
                
                {/* Image Rendu Fixe */}
                <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <TiltCard>
                        <ShineImage 
                            src="./casque.jpg" 
                            alt="Rendu Final" 
                            className="rounded-2xl shadow-xl border border-blue-500/20"
                        />
                    </TiltCard>
                </motion.div>

                {/* Texte Technique */}
                <motion.div className="w-full md:w-1/2 font-dunbartext text-gray-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="font-dunbartall text-3xl mb-4 text-cyan-400">Le Workflow</h3>
                    <p className="mb-6">
                        La modélisation a été réalisée sous Blender en utilisant des modificateurs non destructifs pour garder de la flexibilité.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong className="text-white">Blender :</strong> Modélisation High-poly & Low-poly.</li>
                        <li><strong className="text-white">Substance :</strong> Texturing PBR réaliste (plastique, cuir, métal).</li>
                        <li><strong className="text-white">Cycles :</strong> Rendu final avec éclairage studio.</li>
                    </ul>
                </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-6 overflow-hidden bg-blue-600 border-y-4 border-white rotate-1 scale-105 relative z-10 shadow-[0_0_40px_#3b82f6]">
        <motion.div className="whitespace-nowrap flex" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
            {[1,2,3,4].map(i => (<span key={i} className="text-3xl font-dunbartall text-white mx-8 drop-shadow-sm">3D MODELING • TEXTURING • RENDERING • HARD SURFACE • </span>))}
        </motion.div>
      </div>

      {/* --- NEXT PROJECT --- */}
      <section className="py-32 text-center relative z-10">
        <p className="text-gray-400 uppercase tracking-widest mb-4 font-dunbartext">Prochain Projet</p>
        <Link to="/marlowe" className="inline-block group relative">
            <h2 className="text-6xl md:text-8xl font-dunbartall text-transparent transition-colors duration-300 relative z-10 group-hover:text-white"
                style={{ WebkitTextStroke: '2px white' }}>
                Marlowe
            </h2>
            <div 
                className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, #ffffff, #9ca3af)` }}
            >
               <h2 className="text-6xl md:text-8xl font-dunbartall" style={{ textShadow: '0 0 20px white' }}>
                Marlowe
               </h2>
            </div>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-2 mx-auto bg-white shadow-[0_0_10px_white]"></div>
        </Link>
      </section>

    </div>
  );
};

export default transition(Casque);