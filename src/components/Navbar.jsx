import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAnchorClick = (e, anchorId) => {
    setIsOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    // AJOUT 1: z-50 ici pour que la barre reste au-dessus du contenu de la page
    <nav className="bg-transparent fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 max-w-7xl">
        
        {/* Logo SVG - utilise Link */}
        {/* AJOUT 2: relative et z-50 pour que le logo reste cliquable même menu ouvert */}
        <Link to="/" onClick={() => setIsOpen(false)} className="relative z-50">
          <motion.img
            className="w-14 xl:w-16 2xl:w-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            src="./logo.svg" 
            alt="Logo"
          />
        </Link>

        {/* Liens de navigation desktop */}
        <div className="backdrop-blur-sm border-3 bg-white/35 md:bg-none p-5 rounded-2xl text-xl text-white font-dunbartall hidden md:flex items-center md:gap-5 lg:gap-8 xl:gap-12 2xl:gap-16">
          <Link 
            to="/" 
            onClick={(e) => handleAnchorClick(e, 'root')} 
            className="hover:text-gray-800 transition-colors duration-200 text-lg xl:text-xl 2xl:text-2xl"
          >
            Accueil
          </Link>
          <Link 
            to="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="hover:text-gray-800 transition-colors duration-200 text-lg xl:text-xl 2xl:text-2xl"
          >
            À propos de moi
          </Link>
          <Link 
            to="/#competences" 
            onClick={(e) => handleAnchorClick(e, 'competences')}
            className="hover:text-gray-800 transition-colors duration-200 text-lg xl:text-xl 2xl:text-2xl"
          >
            Compétences
          </Link>
          <Link 
            to="/#projet" 
            onClick={(e) => handleAnchorClick(e, 'projet')}
            className="hover:text-gray-800 transition-colors duration-200 text-lg xl:text-xl 2xl:text-2xl"
          >
            Projets
          </Link>
          <Link 
            to="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="hover:text-gray-800 transition-colors duration-200 text-lg xl:text-xl 2xl:text-2xl"
          >
            Contact
          </Link>
        </div>

        {/* Bouton menu mobile */}
        {/* AJOUT 3: z-50 est CRUCIAL ici. Il force le bouton à être AU-DESSUS du menu plein écran */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-15 h-10 text-white"
          aria-label="Ouvrir le menu"
        >
          <div className="absolute w-8 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span 
              className={`absolute h-0.5 w-8 bg-white transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 delay-200' : '-translate-y-2'}`}
            />
            <span 
              className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${isOpen ? 'w-0 opacity-50' : 'w-8 delay-200 opacity-100'}`}
            />
            <span 
              className={`absolute h-0.5 w-8 bg-white transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 delay-200' : 'translate-y-2'}`}
            />
          </div>
        </button>

        {/* Menu mobile */}
        {/* NOTE: On laisse inset-0, mais grâce au z-50 du bouton, le bouton restera accessible */}
        <motion.div 
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "100%" }
          }}
          transition={{ duration: 0.3 }}
          // AJOUT 4: z-40 pour être sûr qu'il est sous le bouton (z-50) mais au-dessus du reste
          className={`fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-lg touch-none ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-xl text-white font-dunbartall">
            <motion.div
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 }}}
              transition={{ delay: 0.1 }}
            >
              <Link 
                to="/" 
                onClick={(e) => handleAnchorClick(e, 'root')}
                className="text-white active:text-blue-300 transition-colors duration-20"
              >
                Accueil
              </Link>
            </motion.div>
            <motion.div
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 }}}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/#about" 
                onClick={(e) => handleAnchorClick(e, 'about')}
                className="text-white active:text-blue-300 transition-colors duration-20"
              >
                À propos de moi
              </Link>
            </motion.div>
            <motion.div
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 }}}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/#competences" 
                onClick={(e) => handleAnchorClick(e, 'competences')}
                className="text-white active:text-blue-300 transition-colors duration-20"
              >
                Compétences
              </Link>
            </motion.div>
            <motion.div
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 }}}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/#projet" 
                onClick={(e) => handleAnchorClick(e, 'projet')}
                className="text-white active:text-blue-300 transition-colors duration-200"
              >
                Projets
              </Link>
            </motion.div>
            <motion.div
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 }}}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/#contact" 
                onClick={(e) => handleAnchorClick(e, 'contact')}
                className="text-white active:text-blue-300 transition-colors duration-200"
              >
                Contact
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}