import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="contact" className="relative py-20 text-white overflow-hidden">
      {/* Fond dégradé pour le footer */}
      <div 
        className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/70" 
        aria-hidden="true" 
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre et sous-titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-dunbartall mb-4">
            Restons en contact
          </h2>
          <p className="text-lg text-white/80 font-dunbartext max-w-xl mx-auto">
            J'ai besoin d'un stage en entreprise pour valider ma 2ème année de BUT MMI.
            Par pitié contactez moi !
          </p>
        </motion.div>

        {/* Liens de contact (boutons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8"
        >
          {/* Email */}
          <motion.a 
            href="mailto:mumbata.ryan2@gmail.com" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black drop-shadow-lg font-dunbartext py-3 px-8 rounded text-lg lg:text-xl transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Envoyer un email
          </motion.a>

          {/* LinkedIn */}
          <motion.a 
            href="https://www.linkedin.com/in/ryan-mumbata-224a89359/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/15 hover:bg-white/50 drop-shadow-lg text-white border-2 border-solid font-dunbartext py-3 px-8 rounded text-lg lg:text-xl transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Mon LinkedIn
          </motion.a> 
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-white text-center"
        >
          <p className="text-white font-dunbartext text-sm">
            &copy; {new Date().getFullYear()} Ryan Mumbata. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}