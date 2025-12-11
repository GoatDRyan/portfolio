import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import transition from "../context/transition.jsx";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- HELPER UI ---
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

// --- SCÈNE 3D ---
const ThreeScene = ({ containerRef, onLoadComplete }) => {
  const mountRef = useRef(null);

  useLayoutEffect(() => {
    let scene, camera, renderer, model, pmremGenerator;
    let mm = gsap.matchMedia();
    let rafId = null;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    const init = () => {
      // --- SCENE ---
      scene = new THREE.Scene();

      const isMobile = window.innerWidth < 768;

      // --- CAMERA ---
      camera = new THREE.PerspectiveCamera(
        isMobile ? 45 : 35,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 8);

      // --- RENDERER ---
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      currentMount.appendChild(renderer.domElement);

      // --- ENVIRONMENT ---
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment(renderer);
      scene.environment = pmremGenerator.fromScene(room).texture;

      // --- LIGHTS ---
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const mainLight = new THREE.DirectionalLight(0xffffff, 3);
      mainLight.position.set(5, 5, 5);
      scene.add(mainLight);
      const fillLight = new THREE.DirectionalLight(0x3b82f6, 2);
      fillLight.position.set(-5, 0, 2);
      scene.add(fillLight);

      // --- LOADERS ---
      const draco = new DRACOLoader();
      draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);

      // --- LOAD MODEL ---
      loader.load(
        "./casque.glb",
        (gltf) => {
          model = gltf.scene;
          model.matrixAutoUpdate = true;
          
          let bbox = new THREE.Box3().setFromObject(model);
          let size = bbox.getSize(new THREE.Vector3());
          let center = bbox.getCenter(new THREE.Vector3());

          // Centrage brut
          model.position.sub(center);

          // Hauteur désirée (responsive)
          const desiredHeight = isMobile ? 2.0 : 3.0;

          // Scale automatique basé sur la hauteur du modèle
          const scaleFactor = desiredHeight / size.y;
          model.scale.setScalar(scaleFactor);

          // Recentrage après scale
          bbox.setFromObject(model);
          bbox.getCenter(center);
          model.position.sub(center);

          // Correction hauteur finale
          model.position.y = isMobile ? -0.6 : -1.4;

          // -----------------------------------------------------

          scene.add(model);

          // Init scroll animations
          initResponsiveScroll(model);

          onLoadComplete && onLoadComplete();
        },
        undefined,
        (err) => console.error(err)
      );

      animate();
    };

    // --- SCROLL ANIMATIONS ---
    const initResponsiveScroll = (model) => {
      if (!containerRef.current) return;

      const triggerSettings = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      };

      mm.add(
        {
          isDesktop: "(min-width: 800px)",
          isMobile: "(max-width: 799px)",
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;
          let tl = gsap.timeline({ scrollTrigger: triggerSettings });

          const fixedY = -1.4;

          // État initial
          if (isDesktop) {
            model.position.set(1.5, fixedY, 0);
            model.rotation.set(0, Math.PI * 0.25, 0);
          } else {
            model.position.set(0.5, -0.4, 0);
            model.rotation.set(0, Math.PI * 0.25, 0);
          }

          // --- Étapes d’animation (inchangées) ---
          if (isDesktop) {
            tl.to(model.rotation, { y: Math.PI * 0.1, duration: 1.5 }, 0);
            tl.to(model.position, { x: -1.2, duration: 1.5 }, 0);
          } else {
            tl.to(model.rotation, { y: -Math.PI * 0.2, x: 0.2, duration: 1.5 }, 0);
            tl.to(model.position, { y: 0.8, duration: 1.5 }, 0);
          }

          if (isDesktop) {
            tl.to(model.position, { z: 2.5, x: 1.4, duration: 1.5 }, 2);
            tl.to(model.rotation, { y: 0, x: 0.3, duration: 1.5 }, 2);
          } else {
            tl.to(model.position, { z: 2, y: 0, duration: 1.5 }, 2);
            tl.to(model.rotation, { x: 0.5, y: 0.5, duration: 1.5 }, 2);
          }

          if (isDesktop) {
            tl.to(model.position, { z: 0, x: 2, duration: 1.5 }, 4);
            tl.to(model.rotation, { y: -Math.PI * 0.4, x: 0, duration: 1.5 }, 4);
          } else {
            tl.to(model.position, { z: 0, y: 0.5, duration: 1.5 }, 4);
            tl.to(model.rotation, { y: -Math.PI * 0.5, x: 0, duration: 1.5 }, 4);
          }

          // --- Explosion ---
          const spread = isMobile ? 0.5 : 1.2;
          const start = isDesktop ? 6.5 : 6.0;
          const duration = 1.5;

          const visor = model.getObjectByName("helmetViseurPoli");
          if (visor)
            tl.to(visor.position, { z: 120 * spread, duration }, start);

          const spoiler = model.getObjectByName("aileron");
          if (spoiler)
            tl.to(spoiler.position, { z: -0.5 * spread, x: 0.2 * spread, duration }, start);

          const base = model.getObjectByName("joinDeBase");
          if (base)
            tl.to(base.position, { y: 70 * spread, duration }, start);

          const body = model.getObjectByName("BodyHelmet");
          if (body)
            tl.to(body.position, { z: -0.2 * spread, duration }, start);

          const tubeR = model.getObjectByName("TuyeauR");
          if (tubeR)
            tl.to(tubeR.position, { x: 0.4 * spread, duration }, start);

          const tubeL = model.getObjectByName("TuyeauL");
          if (tubeL)
            tl.to(tubeL.position, { x: 0.4 * spread, duration }, start);

          return () => {};
        }
      );
    };

    // --- RENDER LOOP ---
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // --- RESIZE ---
    const handleResize = () => {
      if (!renderer || !camera || !currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      ScrollTrigger.refresh();
    };

    init();
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();

      if (rafId) cancelAnimationFrame(rafId);

      ScrollTrigger.getAll().forEach((s) => s.kill());

      if (pmremGenerator) pmremGenerator.dispose();

      if (scene) {
        scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry?.dispose();
            if (obj.material) {
              if (Array.isArray(obj.material))
                obj.material.forEach((m) => m.dispose());
              else obj.material.dispose();
            }
          }
        });
      }

      if (renderer) {
        renderer.dispose();
        currentMount?.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

function Casque() {
  const mainWrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  // On s'assure de scroller en haut au chargement
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    // La hauteur totale reste à 750vh pour laisser le temps à l'animation GSAP de se jouer
    <div ref={mainWrapperRef} className="relative w-full font-sans text-white" style={{ height: '750vh' }}>
      
      {/* LOADER */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000">
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="font-dunbartext text-purple-400 text-sm tracking-widest uppercase animate-pulse">Chargement Modèle 3D...</span>
             </div>
        </div>
      )}

      {/* SCÈNE 3D (Background Fixe) */}
      <div className="sticky top-0 left-0 w-full h-screen z-0 overflow-hidden">
         <ThreeScene containerRef={mainWrapperRef} onLoadComplete={() => setLoaded(true)} />
      </div>

      {/* CONTENU TEXTE (Scrollable) */}
      <div className={`absolute top-0 left-0 w-full z-10 pointer-events-none transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* --- BLOC 1: Intro (0vh - 100vh) --- */}
        <section className="h-screen flex flex-col justify-end lg:justify-center lg:items-start px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-auto">
            <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-2 lg:mb-4">
                    <span className="h-[1px] w-12 bg-purple-400 inline-block"></span>
                    <span className="font-bold tracking-[0.2em] uppercase font-dunbartext text-purple-400 text-xs lg:text-sm">
                      Projet Scolaire / 2025
                    </span>
                </div>
                <h1 className="text-5xl lg:text-9xl font-dunbartall leading-[0.85] mb-4 lg:mb-6">
                  CASQUE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500" style={{ WebkitTextStroke: `0px` }}>
                    F1
                  </span>
                </h1>
                <p className="text-gray-400 text-lg lg:text-xl font-dunbartext max-w-md leading-relaxed">
                   Ma première exploration approfondie de la modélisation 3D.
                </p>
            </div>
        </section>

        {/* --- BLOC 2: Modélisation (100vh - 200vh) --- */}
        <section className="h-screen flex flex-col justify-end lg:justify-center lg:items-end px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-auto">
            <div className="w-full lg:w-1/3">
                <TiltCard className="bg-black lg:bg-black backdrop-blur-2xl p-6 lg:p-10 rounded-3xl border border-white shadow-2xl">
                    <div className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">Technique</div>
                    <h2 className="text-3xl lg:text-4xl font-dunbartall mb-2 lg:mb-4 text-white">Challenge Hard Surface</h2>
                    <p className="text-gray-400 font-dunbartext mb-6 text-sm lg:text-base leading-relaxed">
                        Le défi majeur : la découverte de Blender et la gestion des surfaces complexes. Un apprentissage exigeant pour maîtriser la topologie d'un objet industriel.
                    </p>
                    <ul className="space-y-3 text-xs lg:text-sm text-gray-300 font-mono border-t border-white/10 pt-4">
                        <li className="flex justify-between"><span>Méthode</span> <span className="text-purple-400">Hard Surface</span></li>
                        <li className="flex justify-between"><span>Stack</span> <span className="text-purple-400">Blender / Substance</span></li>
                    </ul>
                </TiltCard>
            </div>
        </section>

        {/* --- BLOC 3: Lookdev (200vh - 300vh) --- */}
        <section className="h-screen flex flex-col justify-end lg:justify-center lg:items-start px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-auto">
            <div className="w-full lg:w-1/3">
                <TiltCard className="bg-black lg:bg-black backdrop-blur-2xl p-6 lg:p-10 rounded-3xl border border-purple-400/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                      <div className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">Lookdev</div>
                    <h2 className="text-3xl lg:text-4xl font-dunbartall mb-2 lg:mb-4 text-white">Textures & Matières</h2>
                    <p className="text-gray-300 font-dunbartext mb-6 text-sm lg:text-base leading-relaxed">
                        Recherche de réalisme via un texturing PBR précis. Association de <strong>Fibre de Carbone</strong> pour la coque, de <strong>Composite</strong> pour la visière et de <strong>Grip</strong> pour la tuyauterie.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-400/10 border border-purple-400/30 text-purple-400 rounded-full text-[10px] uppercase tracking-widest font-bold">Texturing</span>
                        <span className="px-3 py-1 bg-purple-400/10 border border-purple-400/30 text-purple-400 rounded-full text-[10px] uppercase tracking-widest font-bold">Realism</span>
                    </div>
                </TiltCard>
            </div>
        </section>

        {/* --- BLOC 4: Design (300vh - 400vh) --- */}
        <section className="h-screen flex flex-col justify-end lg:justify-center lg:items-end px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-auto">
            <div className="w-full lg:w-1/3">
                <TiltCard className="bg-black lg:bg-black backdrop-blur-2xl p-6 lg:p-10 rounded-3xl border border-white/10">
                    <div className="text-purple-500 text-xs font-bold tracking-widest uppercase mb-2">Identité</div>
                    <h2 className="text-3xl lg:text-4xl font-dunbartall mb-2 lg:mb-4 text-white">Esthétique & Branding</h2>
                    <p className="text-gray-300 font-dunbartext text-sm lg:text-base leading-relaxed">
                        Une forme moderne simplifiée, habillée d'une teinte violette aux reflets bleutés. Intégration des logos <em>Marc Jacobs</em> et <em>Mercedes</em>.
                    </p>
                </TiltCard>
            </div>
        </section>

        {/* --- ESPACE VIDE (Pour laisser le casque bouger) (400vh - 500vh) --- */}
        <div className="h-[100vh]"></div>

        {/* --- BLOC 5 : Vue Éclatée (500vh - 650vh) --- */}
        {/* On force ce bloc à apparaître vers la fin du scroll, avant le footer */}
        <section className="h-[150vh] flex flex-col justify-start pt-24 lg:justify-center lg:pt-0 lg:items-start px-6 lg:px-12 pointer-events-auto">
            <div className="w-full lg:w-1/2">
                <h2 className="text-5xl lg:text-7xl font-dunbartall mb-6 text-white leading-tight">
                    Vue <br/>
                    <span className="text-purple-400">Éclatée</span>
                </h2>
                <div className="border-l-2 border-purple-400 pl-6">
                  <p className="text-gray-300 text-sm lg:text-lg font-dunbartext max-w-xl">
                      Démonstration technique de la séparation des volumes. Cette vue permet de visualiser l'indépendance de chaque composant modélisé lors de l'exercice.
                  </p>
                </div>
            </div>
        </section>

        {/* --- FOOTER (Tout en bas) --- */}
        <section className="h-[100vh] flex flex-col justify-end pb-32 items-center pointer-events-auto">
             <p className="text-gray-500 uppercase tracking-[0.3em] mb-6 font-dunbartext text-xs">Projet Suivant</p>
             <Link to="/marlowe" className="group relative">
                <div className="absolute -inset-4 bg-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                <h2 className="relative text-5xl lg:text-9xl font-dunbartall text-white/20 group-hover:text-white transition-all duration-500">
                   MARLOWE
                </h2>
             </Link>
        </section>

      </div>
    </div>
  );
}

export default transition(Casque);