// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import BikeRepair from './pages/BikeRepair';
import Barbie from './pages/Barbie';
import Casque from './pages/Casque';
import Marlowe from './pages/Marlowe';
import SAE203 from './pages/SAE203';

import './index.css';

// 2. Définir les routes
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bike-repair",
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);