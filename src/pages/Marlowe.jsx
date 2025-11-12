import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Marlowe() {
  
  // Fait en sorte que la page s'affiche en haut
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black pt-28 px-4">
      <h1 className="text-4xl font-dunbartall mb-4">Projet Marlowe</h1>
      <p className="font-dunbartext text-lg max-w-xl text-center">
        Voici la page dédiée à mon projet Marlowe.
      </p>
      
      <Link 
        to="/" 
        className="mt-8 text-blue-400 underline hover:text-blue-200 transition-colors duration-200"
      >
        &larr; Retour à l'accueil
      </Link>
    </div>
  );
}