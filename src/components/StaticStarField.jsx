import React, { useState, useEffect } from "react";
import "./StaticStarField.css";

export default function StaticStarField() {
const [stars, setStars] = useState([]);

    useEffect(() => {
        const getRandom = (min, max) => Math.random() * (max - min) + min;
        const numStars = 150; 
        const tempStars = [];

        for (let i = 0; i < numStars; i++) {
            tempStars.push({
                id: i,
                top: `${getRandom(0, 100)}%`,
                left: `${getRandom(0, 100)}%`,
                size: `${getRandom(1, 3)}px`,
                animationDuration: `${getRandom(5, 15)}s`,
                animationDelay: `${getRandom(0, 3)}s`,
            });
        }
    setStars(tempStars);
    }, []); 

    return (
    <div className="stars-background-random">
        {stars.map(star => (
            <div
             key={star.id}
             className="star"
             style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
             }}
            />
        ))}
    </div>
 );
};