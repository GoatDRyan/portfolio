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

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTriggers = document.querySelectorAll('.hover-trigger, a, button');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Effet au survol des liens
hoverTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
    });
    trigger.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
    });
});
