import React, { useRef, useEffect, useState, useCallback } from 'react';
const CanvasStarfield = () => {
    const canvasRef = useRef(null);
    const [stars, setStars] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const resizeCanvas = useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });
        
        const numStars = 100;
        const newStars = [];
        for (let i = 0; i < numStars; i++) {
            newStars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.001 + Math.random() * 0.08,
                size: 1 + Math.random() * 2,
            });
        }
        setStars(newStars);
    }, []);

    const handleMouseMove = useCallback((e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        if (canvasRef.current) {
            canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
        }
    }, []);

    useEffect(() => {
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [resizeCanvas, handleMouseMove]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let currentStars = [...stars];

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            currentStars = currentStars.map(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`; 
                ctx.fill();

                s.y += s.speed;
                
                if (s.y > canvas.height) {
                    s.y = -s.size;
                    s.x = Math.random() * canvas.width;
                }
                return s;
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        if (stars.length > 0) {
            animate();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stars, dimensions]);

    return (
        <>
            {/* Style CSS intégré pour le fond d'écran et la gestion du canvas */}
            <style jsx="true">{`
                
                /* Conteneur principal pour le fond dégradé */
                .starfield-container {
                    position: fixed;
                    width: 100vw;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    z-index: -10;
                    /* Le dégradé de votre code de base */
                    background: radial-gradient(ellipse at center, #6366f1, #000000);
                    overflow: hidden;
                }

                /* Le canvas pour le dessin des étoiles */
                #bg-canvas {
                    /* Permet la transformation du parallax */
                    position: absolute; 
                    top: 0; 
                    left: 0;
                    width: 100%; 
                    height: 100%;
                    /* Ajoute une transition douce pour que le mouvement de la souris soit agréable */
                    transition: transform 0.1s ease-out; 
                }
            `}</style>

            <div className="starfield-container">
                <canvas 
                    ref={canvasRef} 
                    id="bg-canvas"
                />
            </div>
        </>
    );
};
export default CanvasStarfield;