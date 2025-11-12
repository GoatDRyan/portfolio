// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Importer les composants
import App from './App'; // Le layout (coquille)
import Home from './pages/Home'; // Page d'accueil
import BikeRepair from './pages/BikeRepair'; // Page projet
import Barbie from './pages/Barbie';
import Casque from './pages/Casque';
import Marlowe from './pages/Marlowe';
import SAE203 from './pages/SAE203';

import './index.css';

// 2. Définir les routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Le layout <App /> est l'élément parent
    // children (enfants) s'afficheront dans l' <Outlet /> de App
    children: [
      {
        path: "/", // Page d'accueil
        element: <Home />,
      },
      {
        path: "/bike-repair", // Page projet
        element: <BikeRepair />,
      },
      {
        path: "/barbie",
        element: <Barbie />,
      },
      {
        path: "/casque",
        element: <Casque />,
      },
      {
        path: "/marlowe",
        element: <Marlowe />,
      },
      {
        path: "/sae203",
        element: <SAE203 />,
      },
      // Optionnel : une page 404
      // {
      //   path: "*",
      //   element: <div>Page non trouvée</div>
      // }
    ],
  },
]);

// 3. Fournir le routeur à l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);